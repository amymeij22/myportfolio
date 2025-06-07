This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Integrasi dengan Supabase

Aplikasi ini terintegrasi dengan Supabase sebagai backend dan database. Berikut adalah langkah-langkah untuk mengatur dan menggunakan Supabase:

### Setup Database Supabase

1. **Buat tabel di Supabase** dengan menjalankan SQL berikut:

```sql
-- Tabel untuk Projects
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Publications
CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  authors TEXT[] NOT NULL,
  journal VARCHAR(255) NOT NULL,
  publication_date DATE NOT NULL,
  doi VARCHAR(255),
  abstract TEXT,
  link TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Kategori Blog
CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Blog / Articles
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  category_id INTEGER REFERENCES blog_categories(id),
  date DATE NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk Journey / Timeline
CREATE TABLE timeline (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  location VARCHAR(255),
  type VARCHAR(50) NOT NULL, -- e.g., 'education', 'work', 'achievement'
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Konfigurasi Environment Variables

1. Buat file `.env.local` di root proyek dengan isi:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

2. Ganti placeholder values dengan kredensial Supabase Anda.

### Integrasi dengan Frontend

1. Integrasi dilakukan melalui file `lib/supabase.ts` yang berisi semua fungsi untuk berinteraksi dengan Supabase.
2. Komponen yang telah diintegrasikan:
   - PortfolioGrid.tsx - Menampilkan data proyek
   - Publications.tsx - Menampilkan data publikasi
   - Blog.tsx - Menampilkan data blog
   - Timeline.tsx - Menampilkan data timeline karir

### Admin Panel

1. Admin panel sederhana tersedia di `/admin` untuk melihat dan mengelola data.

### Pengembangan Selanjutnya

1. Tambahkan autentikasi untuk admin panel
2. Implementasikan fungsi create, update, dan delete (CRUD) lengkap
3. Tambahkan Row Level Security (RLS) di Supabase untuk keamanan data
