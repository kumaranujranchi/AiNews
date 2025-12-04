/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'http://supabasekong-m8s8s44s0w8s0kockwwgckg4.72.60.202.93.sslip.io',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NDc4NTM0MCwiZXhwIjo0OTIwNDU4OTQwLCJyb2xlIjoiYW5vbiJ9.rtwITimbW3H1pAlGHaosRMYSVB0vDeNB2irOTCyDBRU',
  },
  trailingSlash: true,
}

module.exports = nextConfig
