import { MetadataRoute } from 'next';


export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmopharmalindustry.org';
  
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/api/', '/_next/'],
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }