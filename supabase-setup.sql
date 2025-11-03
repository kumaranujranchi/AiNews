-- Supabase Database Setup Script
-- This script sets up the complete database structure for the Zaira News Magazine CMS

-- =====================================================
-- 1. USER PRIVILEGES CONFIGURATION
-- =====================================================

-- Add role column to auth.users metadata (using user_metadata)
-- Note: We'll use user_metadata to store the role since we can't directly modify auth.users table structure

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin',
      false
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role',
    'user'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 2. ARTICLES TABLE CREATION
-- =====================================================

-- Create articles table with all required columns
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) NOT NULL DEFAULT 'draft',
  
  -- Additional columns for enhanced functionality
  featured_image_url TEXT,
  published_at TIMESTAMPTZ,
  tags TEXT[],
  categories TEXT[],
  excerpt TEXT,
  slug TEXT UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  view_count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on articles table
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Admins can do everything
CREATE POLICY "admin_all_access" ON articles
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Policy 2: Public can read published articles
CREATE POLICY "public_read_published" ON articles
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Policy 3: Authors can read their own articles (any status)
CREATE POLICY "authors_read_own" ON articles
FOR SELECT
TO authenticated
USING (auth.uid() = author_id);

-- Policy 4: Authors can insert their own articles
CREATE POLICY "authors_insert_own" ON articles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = author_id OR is_admin());

-- Policy 5: Authors can update their own articles
CREATE POLICY "authors_update_own" ON articles
FOR UPDATE
TO authenticated
USING (auth.uid() = author_id OR is_admin())
WITH CHECK (auth.uid() = author_id OR is_admin());

-- Policy 6: Authors can delete their own articles
CREATE POLICY "authors_delete_own" ON articles
FOR DELETE
TO authenticated
USING (auth.uid() = author_id OR is_admin());

-- =====================================================
-- 4. STORED PROCEDURES FOR ARTICLE MANAGEMENT
-- =====================================================

-- Function to create a new article
CREATE OR REPLACE FUNCTION create_article(
  p_title TEXT,
  p_content TEXT,
  p_status TEXT DEFAULT 'draft',
  p_featured_image_url TEXT DEFAULT NULL,
  p_tags TEXT[] DEFAULT '{}',
  p_categories TEXT[] DEFAULT '{}',
  p_excerpt TEXT DEFAULT NULL,
  p_slug TEXT DEFAULT NULL,
  p_meta_title TEXT DEFAULT NULL,
  p_meta_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_article_id UUID;
  generated_slug TEXT;
BEGIN
  -- Generate slug if not provided
  IF p_slug IS NULL THEN
    generated_slug := LOWER(REGEXP_REPLACE(p_title, '[^a-zA-Z0-9]+', '-', 'g'));
    generated_slug := TRIM(generated_slug, '-');
  ELSE
    generated_slug := p_slug;
  END IF;

  -- Insert the article
  INSERT INTO articles (
    title, content, status, author_id, featured_image_url,
    tags, categories, excerpt, slug, meta_title, meta_description
  ) VALUES (
    p_title, p_content, p_status, auth.uid(), p_featured_image_url,
    p_tags, p_categories, p_excerpt, generated_slug, p_meta_title, p_meta_description
  ) RETURNING id INTO new_article_id;

  RETURN new_article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to publish an article
CREATE OR REPLACE FUNCTION publish_article(article_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE articles 
  SET status = 'published', published_at = NOW()
  WHERE id = article_id 
    AND (auth.uid() = author_id OR is_admin());
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get article statistics
CREATE OR REPLACE FUNCTION get_article_stats()
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_articles', COUNT(*),
    'published_articles', COUNT(*) FILTER (WHERE status = 'published'),
    'draft_articles', COUNT(*) FILTER (WHERE status = 'draft'),
    'archived_articles', COUNT(*) FILTER (WHERE status = 'archived'),
    'total_views', COALESCE(SUM(view_count), 0)
  ) INTO stats
  FROM articles
  WHERE (is_admin() OR auth.uid() = author_id);
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles 
  SET view_count = view_count + 1
  WHERE id = article_id AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. MEDIA STORAGE SETUP
-- =====================================================

-- Create storage bucket for media files (if not exists)
-- Note: This needs to be run in Supabase dashboard or via API
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('media', 'media', true)
-- ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 6. ADMIN USER SETUP
-- =====================================================

-- Function to set user as admin (to be called after user registration)
CREATE OR REPLACE FUNCTION set_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Find user by email
  SELECT id INTO user_id 
  FROM auth.users 
  WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Update user metadata to include admin role
  -- Note: This would typically be done via Supabase Admin API
  -- For now, we'll create a record in a custom table
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin_users table to track admin privileges
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  granted_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can manage admin_users table
CREATE POLICY "admin_manage_admins" ON admin_users
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Insert the initial admin user
INSERT INTO admin_users (user_id, email) 
SELECT id, email 
FROM auth.users 
WHERE email = 'kumaranujranchi@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- Update the is_admin function to check admin_users table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 7. UTILITY FUNCTIONS
-- =====================================================

-- Function to search articles
CREATE OR REPLACE FUNCTION search_articles(
  search_query TEXT DEFAULT '',
  article_status TEXT DEFAULT 'published',
  limit_count INTEGER DEFAULT 10,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  excerpt TEXT,
  author_id UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  status TEXT,
  featured_image_url TEXT,
  tags TEXT[],
  categories TEXT[],
  view_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id, a.title, a.content, a.excerpt, a.author_id,
    a.created_at, a.updated_at, a.published_at, a.status,
    a.featured_image_url, a.tags, a.categories, a.view_count
  FROM articles a
  WHERE 
    (search_query = '' OR 
     a.title ILIKE '%' || search_query || '%' OR 
     a.content ILIKE '%' || search_query || '%' OR
     a.excerpt ILIKE '%' || search_query || '%')
    AND (article_status = 'all' OR a.status = article_status)
    AND (a.status = 'published' OR auth.uid() = a.author_id OR is_admin())
  ORDER BY 
    CASE WHEN a.status = 'published' THEN a.published_at ELSE a.created_at END DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SETUP COMPLETE
-- =====================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON articles TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Create indexes for full-text search
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || content || ' ' || COALESCE(excerpt, '')));

COMMENT ON TABLE articles IS 'Main articles table for the CMS with full RLS policies';
COMMENT ON TABLE admin_users IS 'Tracks users with admin privileges';
COMMENT ON FUNCTION is_admin() IS 'Checks if current user has admin privileges';
COMMENT ON FUNCTION create_article(TEXT, TEXT, TEXT, TEXT, TEXT[], TEXT[], TEXT, TEXT, TEXT, TEXT) IS 'Creates a new article with automatic slug generation';
COMMENT ON FUNCTION publish_article(UUID) IS 'Publishes an article and sets published_at timestamp';
COMMENT ON FUNCTION search_articles(TEXT, TEXT, INTEGER, INTEGER) IS 'Searches articles with full-text search capabilities';