import { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://amymeij.web.id';

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getAllBlogs();
    blogRoutes = (blogs || []).map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.warn('Failed to query blogs for sitemap, skipping dynamic blog routes:', error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...blogRoutes];
}

