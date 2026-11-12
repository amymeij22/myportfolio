/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://amymeij.web.id',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/robots.txt', '/sitemap.xml', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    additionalSitemaps: [],
  },
};
