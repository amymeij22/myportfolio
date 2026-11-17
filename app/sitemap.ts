import { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/supabase';

function parseDateSafe(val: any): Date {
  if (!val) return new Date();
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d;

  // Handle Indonesian localized date format: "12 Juni 2023"
  const monthMap: Record<string, string> = {
    januari: '01',
    februari: '02',
    maret: '03',
    april: '04',
    mei: '05',
    juni: '06',
    juli: '07',
    agustus: '08',
    september: '09',
    oktober: '10',
    november: '11',
    desember: '12',
  };
  const parts = String(val).trim().toLowerCase().split(/\s+/);
  if (parts.length === 3 && monthMap[parts[1]]) {
    const day = parts[0].padStart(2, '0');
    const month = monthMap[parts[1]];
    const year = parts[2];
    const parsed = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://amymeij.web.id';

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getAllBlogs();
    for (const blog of blogs || []) {
      const lastMod = parseDateSafe(blog.updated_at || blog.date);
      // Indonesian route
      blogRoutes.push({
        url: `${baseUrl}/blog/${blog.id}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            id: `${baseUrl}/blog/${blog.id}`,
            en: `${baseUrl}/en/blog/${blog.id}`,
          },
        },
      });
      // English route
      blogRoutes.push({
        url: `${baseUrl}/en/blog/${blog.id}`,
        lastModified: lastMod,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            id: `${baseUrl}/blog/${blog.id}`,
            en: `${baseUrl}/en/blog/${blog.id}`,
          },
        },
      });
    }
  } catch (error) {
    console.warn('Failed to query blogs for sitemap, skipping dynamic blog routes:', error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    // Home (Indonesian)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          id: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    // Home (English)
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          id: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    // Blog (Indonesian)
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: {
          id: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
    // Blog (English)
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: {
        languages: {
          id: `${baseUrl}/blog`,
          en: `${baseUrl}/en/blog`,
        },
      },
    },
  ];

  return [...staticRoutes, ...blogRoutes];
}
