import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://amymeij.web.id';

  // Explicit AI Bot & Search Engine Crawl Directives (GEO Princeton Best Practice)
  const allowedBots = [
    '*',
    'Googlebot',
    'Bingbot',
    'GPTBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'anthropic-ai',
    'Applebot',
    'Google-Extended',
    'CCBot',
  ];

  return {
    rules: allowedBots.map((bot) => ({
      userAgent: bot,
      allow: '/',
      disallow: ['/api/'],
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
