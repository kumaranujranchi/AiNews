# Supabase Setup Instructions for Zaira News Magazine

This document provides step-by-step instructions to set up Supabase for the Zaira News Magazine CMS.

## Prerequisites

- Supabase project created
- Environment variables configured in `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://jhotzhauvgvywqoxetim.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

## Step 1: Database Setup

### 1.1 Execute SQL Schema

Go to your Supabase Dashboard → SQL Editor and execute the following SQL:

```sql
-- =====================================================
-- 1. ADMIN USERS TABLE
-- =====================================================

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

-- =====================================================
-- 2. UTILITY FUNCTIONS
-- =====================================================

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
  RETURN CASE 
    WHEN is_admin() THEN 'admin'
    ELSE 'user'
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 3. ARTICLES TABLE
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
-- 4. ROW LEVEL SECURITY POLICIES
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

-- Policy for admin_users table
CREATE POLICY "admin_manage_admins" ON admin_users
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- =====================================================
-- 5. STORED PROCEDURES
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

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON articles TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
```

## Step 2: Create Admin User

### 2.1 Create User Account

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter:
   - Email: `kumaranujranchi@gmail.com`
   - Password: `TempPassword123!` (change on first login)
   - Email Confirm: ✅ Checked
4. Click "Create User"

### 2.2 Grant Admin Privileges

After creating the user, execute this SQL in the SQL Editor:

```sql
-- Insert admin user record
INSERT INTO admin_users (user_id, email) 
SELECT id, email 
FROM auth.users 
WHERE email = 'kumaranujranchi@gmail.com'
ON CONFLICT (user_id) DO NOTHING;
```

## Step 3: Storage Setup

### 3.1 Create Media Bucket

1. Go to Supabase Dashboard → Storage
2. Click "New Bucket"
3. Enter:
   - Name: `media`
   - Public: ✅ Checked
4. Click "Create Bucket"

### 3.2 Configure Bucket Policies

Go to Storage → media bucket → Policies and create these policies:

**Policy 1: Public Read Access**
```sql
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'media');
```

**Policy 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'media');
```

**Policy 3: Admin Full Access**
```sql
CREATE POLICY "Admin full access" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'media' AND is_admin())
WITH CHECK (bucket_id = 'media' AND is_admin());
```

## Step 4: Testing

### 4.1 Test Database Connection

Run this test script:

```bash
node -e "
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from('articles').select('*').limit(1);
  console.log('Articles test:', error ? 'FAILED - ' + error.message : 'PASSED');
  
  const { data: admins, error: adminError } = await supabase.from('admin_users').select('*').limit(1);
  console.log('Admin users test:', adminError ? 'FAILED - ' + adminError.message : 'PASSED');
}

test();
"
```

### 4.2 Test Admin Login

1. Start the development server: `npm run dev`
2. Go to: `http://localhost:3000/login`
3. Login with:
   - Email: `kumaranujranchi@gmail.com`
   - Password: `TempPassword123!`
4. Should redirect to: `http://localhost:3000/admin/articles`

## Step 5: Verification Checklist

- [ ] Database tables created (articles, admin_users)
- [ ] RLS policies configured
- [ ] Admin user created and granted privileges
- [ ] Media storage bucket created with proper policies
- [ ] Login functionality working
- [ ] CMS access working for admin user
- [ ] Article creation/editing working

## Security Features Implemented

1. **Row Level Security (RLS)**: All tables have RLS enabled
2. **Admin Privileges**: Separate admin_users table tracks admin access
3. **Content Isolation**: Users can only access their own content unless admin
4. **Public Access**: Only published articles are visible to anonymous users
5. **Secure Functions**: All functions use SECURITY DEFINER for controlled access
6. **Storage Policies**: Media bucket has proper read/write policies

## API Endpoints Available

The following functions can be called via Supabase RPC:

- `is_admin()` - Check if current user is admin
- `get_user_role()` - Get current user's role
- `create_article(...)` - Create new article with auto-slug generation
- `publish_article(uuid)` - Publish an article
- `get_article_stats()` - Get article statistics
- `search_articles(...)` - Search articles with filters

## Troubleshooting

### Common Issues:

1. **"Could not find table" errors**: Ensure SQL was executed in correct order
2. **Permission denied**: Check RLS policies are correctly configured
3. **Admin access not working**: Verify user is in admin_users table
4. **Storage upload fails**: Check bucket policies and authentication

### Debug Commands:

```sql
-- Check if user is admin
SELECT is_admin();

-- List all admin users
SELECT * FROM admin_users;

-- Check article permissions
SELECT * FROM articles WHERE auth.uid() = author_id OR is_admin();
```