-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  tags TEXT[],
  categories TEXT[],
  page_section TEXT, -- To map to frontend 'page' field (e.g., 'blog_1', 'today_post')
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  reading_time TEXT -- e.g., '20 MINS'
);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to published articles
CREATE POLICY "Public articles are viewable by everyone" 
ON articles FOR SELECT 
USING (status = 'published');

-- Allow authenticated users to create articles
CREATE POLICY "Users can create articles" 
ON articles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = author_id);

-- Allow users to update their own articles
CREATE POLICY "Users can update own articles" 
ON articles FOR UPDATE 
TO authenticated 
USING (auth.uid() = author_id);

-- Allow users to delete their own articles
CREATE POLICY "Users can delete own articles" 
ON articles FOR DELETE 
TO authenticated 
USING (auth.uid() = author_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
