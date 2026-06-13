import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-posts';
import { portfolioData } from '@/data/portfolioData';
import { siteUrl } from './metadata';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastBuild = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteUrl}/`, lastModified: lastBuild, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${siteUrl}/blog`, lastModified: lastBuild, changeFrequency: 'weekly', priority: 0.7 },
    ];

    const posts: MetadataRoute.Sitemap = blogPosts.map((post) => {
        const d = new Date(post.date);
        return {
            url: `${siteUrl}/blog/${post.slug}`,
            // Stable per-post date (not rebuild time) → cleaner crawl signals.
            lastModified: isNaN(d.getTime()) ? lastBuild : d,
            changeFrequency: 'monthly',
            priority: 0.6,
        };
    });

    const works: MetadataRoute.Sitemap = portfolioData.featuredProjects.map((p) => ({
        url: `${siteUrl}/work/${p.id}`,
        lastModified: lastBuild,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...posts, ...works];
}
