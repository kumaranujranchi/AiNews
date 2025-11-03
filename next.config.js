/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export for admin functionality
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Skip building admin and login pages for static export
  async generateBuildId() {
    return 'netlify-static-build'
  },
  trailingSlash: true,
}

module.exports = nextConfig
