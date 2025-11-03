This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
## CMS Setup (Supabase)

This project integrates a lightweight CMS powered by Supabase.

### Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Supabase Schema

Run the following SQL in Supabase:

```sql
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  featured_image_url text,
  published_at timestamptz,
  tags text[],
  categories text[],
  status text check (status in ('draft','published','archived')) not null default 'draft',
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table articles enable row level security;

create policy "read published or own" on articles
for select
using (
  status = 'published' or auth.uid() = author_id
);

create policy "insert own" on articles
for insert
with check (auth.uid() = author_id or author_id is null);

create policy "update own" on articles
for update
using (auth.uid() = author_id);

create policy "delete own" on articles
for delete
using (auth.uid() = author_id);
```

Create a storage bucket `media` with public access (or configure signed URLs).

### Development

- Login at `/login` using Supabase email/password.
- Manage articles at `/admin/articles`.
- API endpoints:
  - `GET /api/articles?q=&status=`
  - `POST /api/articles`
  - `GET /api/articles/:id`
  - `PATCH /api/articles/:id`
  - `DELETE /api/articles/:id`

### Testing

Unit tests exist for validation in `src/__tests__/articleValidation.test.ts` using Vitest.
