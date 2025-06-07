/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.imgur.com', 'picsum.photos', 'images.unsplash.com', '1h1v9ndzh4okzjrr.public.blob.vercel-storage.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Improve SEO with metadata
  poweredByHeader: false,
  // Performance optimizations
  compress: true,
  // Sitemaps and robots.txt
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },
}

module.exports = nextConfig