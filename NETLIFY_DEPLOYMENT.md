# Netlify Deployment Configuration

This project has been configured for static deployment on Netlify.

## Changes Made for Netlify Compatibility

### 1. Static Export Configuration
- Updated `next.config.js` to enable static export (`output: 'export'`)
- Configured `distDir: 'out'` for build output
- Disabled image optimization for static hosting
- Added trailing slash support

### 2. Netlify Configuration Files
- **`netlify.toml`**: Main configuration with build settings, redirects, and security headers
- **`public/_redirects`**: Client-side routing rules for SPA behavior
- **`.env.example`**: Template for required environment variables

### 3. Package.json Updates
- Added `export` script: `next build && next export`
- Added `netlify-build` script: `next build`

### 4. Removed Features (Temporarily)
For static deployment compatibility, the following server-side features were removed:
- **API Routes** (`/api/articles`, `/api/articles/[id]`)
- **Admin Panel** (`/admin/*`)
- **Login System** (`/login`)

These features require server-side functionality and would need to be implemented using:
- Netlify Functions for API endpoints
- External authentication service (Auth0, Supabase Auth, etc.)
- Headless CMS for content management

### 5. Environment Variables Required
Set these in Netlify dashboard under Site Settings > Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment Steps
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run netlify-build`
3. Set publish directory: `out`
4. Configure environment variables
5. Deploy!

## Static Pages Generated
The build successfully generates 25 static pages including:
- Home page and variants
- About, Contact, Author pages
- Blog listing and detail pages
- Dynamic blog detail routes with static generation

## Notes
- All pages are pre-rendered as static HTML
- Client-side routing works via `_redirects` file
- Images are unoptimized for static hosting compatibility
- Build output is optimized and ready for CDN deployment