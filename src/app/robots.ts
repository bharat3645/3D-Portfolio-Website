import { MetadataRoute } from 'next';
import { siteUrl } from './metadata';

// Dynamic robots — reads the same NEXT_PUBLIC_SITE_URL source of truth as
// metadata/sitemap, so the Sitemap line is always the real production domain.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                // Let AI answer engines (GPTBot, PerplexityBot, Google-Extended, etc.)
                // crawl freely — they are explicitly allowed by the wildcard above.
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
    };
}
