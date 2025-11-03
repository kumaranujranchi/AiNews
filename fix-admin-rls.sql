-- Fix RLS policy for admin_users table
-- This script ensures the admin_users table is properly secured

-- Enable RLS on admin_users table (if not already enabled)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users table is only accessible to service role" ON admin_users;
DROP POLICY IF EXISTS "Only service role can access admin_users" ON admin_users;

-- Create a restrictive policy that only allows service role access
CREATE POLICY "admin_users_service_role_only" ON admin_users
    FOR ALL
    USING (false);  -- This denies all access through normal client connections

-- Grant necessary permissions to authenticated users for the articles table
-- (This ensures the articles table RLS works correctly)
GRANT SELECT ON articles TO authenticated;
GRANT INSERT ON articles TO authenticated;
GRANT UPDATE ON articles TO authenticated;
GRANT DELETE ON articles TO authenticated;

-- Ensure proper RLS policies for articles table
DROP POLICY IF EXISTS "Anyone can read published articles" ON articles;
DROP POLICY IF EXISTS "Admins can do everything with articles" ON articles;
DROP POLICY IF EXISTS "Authors can manage their own articles" ON articles;

-- Recreate articles policies
CREATE POLICY "public_read_published" ON articles
    FOR SELECT
    USING (status = 'published');

CREATE POLICY "admin_full_access" ON articles
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "author_manage_own" ON articles
    FOR ALL
    TO authenticated
    USING (author_id = auth.uid())
    WITH CHECK (author_id = auth.uid());

-- Create media storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for media bucket
DROP POLICY IF EXISTS "Public read access for media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own media" ON storage.objects;

CREATE POLICY "media_public_read" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'media');

CREATE POLICY "media_authenticated_upload" ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'media');

CREATE POLICY "media_owner_update" ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'media' AND auth.uid()::text = owner)
    WITH CHECK (bucket_id = 'media' AND auth.uid()::text = owner);

CREATE POLICY "media_owner_delete" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'media' AND auth.uid()::text = owner);