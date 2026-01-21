import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://404ghost.dev';
const siteName = '404ghost | Bharat Singh Parihar';
const siteDescription = 'AI Systems Engineer specializing in GenAI, Distributed Systems, and Full-Stack Development. Building intelligent systems that endure in production.';
const siteImage = `${siteUrl}/og-image.jpg`; // You'll need to create this

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteName,
        template: '%s | 404ghost',
    },
    description: siteDescription,
    keywords: [
        'AI Engineer',
        'Systems Engineer',
        'GenAI',
        'Distributed Systems',
        'Full-Stack Developer',
        'Machine Learning',
        'Bharat Singh Parihar',
        '404ghost',
        'Software Engineer',
        'Web Developer'
    ],
    authors: [{ name: 'Bharat Singh Parihar', url: siteUrl }],
    creator: 'Bharat Singh Parihar',
    publisher: 'Bharat Singh Parihar',

    // Open Graph
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: siteName,
        description: siteDescription,
        siteName,
        images: [
            {
                url: siteImage,
                width: 1200,
                height: 630,
                alt: '404ghost - AI Systems Engineer Portfolio',
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: siteName,
        description: siteDescription,
        images: [siteImage],
        creator: '@404ghost', // Update with actual Twitter handle if available
    },

    // Additional
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    icons: {
        icon: '/logo.jpg',
        apple: '/logo.jpg',
    },

    manifest: '/manifest.json',
};

// Structured Data (JSON-LD)
export const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bharat Singh Parihar',
    alternateName: '404ghost',
    url: siteUrl,
    image: siteImage,
    jobTitle: 'AI Systems Engineer',
    worksFor: {
        '@type': 'Organization',
        name: 'RNR Consulting Pvt. Ltd.',
    },
    sameAs: [
        'https://github.com/bharat3645',
        'https://linkedin.com/in/bharat-singh-parihar', // Update with actual LinkedIn
    ],
    knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Distributed Systems',
        'Full-Stack Development',
        'GenAI',
        'System Architecture',
    ],
};
