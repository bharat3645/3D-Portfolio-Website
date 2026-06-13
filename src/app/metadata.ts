import type { Metadata } from 'next';
import { portfolioData } from '@/data/portfolioData';

/* ============================================================================
   SINGLE SOURCE OF TRUTH
   Set NEXT_PUBLIC_SITE_URL in your deploy env (e.g. Vercel) to your real domain.
   Everything below — metadata, canonical, OG, sitemap, robots, JSON-LD — reads
   from `siteUrl`, so there is exactly one place to change.
   ========================================================================== */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://404ghost.dev').replace(/\/$/, '');

const fullName = 'Bharat Singh Parihar';
const brand = '404ghost';
const role = 'AI Systems Engineer';

// Name leads (balanced strategy) so name-searches rank to this site.
const siteName = `${fullName} — ${role}`;
const siteDescription =
    `${fullName} (${brand}) is an ${role} specializing in GenAI, distributed systems, and full-stack development — ` +
    `building production-grade AI pipelines, agentic systems, and scalable architectures. ` +
    `5 SCOPUS-indexed publications and multiple national hackathon wins.`;

const ogImage = `${siteUrl}/og-image.jpg`;
const headshot = `${siteUrl}/Photo.jpeg`;

/* Verified, owner-confirmed profiles only.
   👉 To strengthen ranking + AI-answer-engine authority, paste your real
   Google Scholar, Instagram, Medium/dev.to URLs into this array (uncomment). */
const sameAs = [
    portfolioData.personal.github,    // https://github.com/bharat3645
    portfolioData.personal.linkedin,  // https://www.linkedin.com/in/bharat-singh-parihar/
    // 'https://scholar.google.com/citations?user=XXXXXXXX',  // <- paste Google Scholar
    // 'https://www.instagram.com/XXXXXXXX',                  // <- paste Instagram
    // 'https://medium.com/@XXXXXXXX',                        // <- paste Medium / dev.to
].filter(Boolean);

/* ============================================================================
   PAGE METADATA
   ========================================================================== */
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${fullName} — ${role} | GenAI & Distributed Systems`,
        template: `%s | ${fullName}`,
    },
    description: siteDescription,
    applicationName: `${fullName} Portfolio`,
    keywords: [
        'Bharat Singh Parihar',
        'Bharat Parihar',
        '404ghost',
        'AI Systems Engineer',
        'AI Engineer India',
        'GenAI Engineer',
        'Machine Learning Engineer',
        'Distributed Systems',
        'Full-Stack Developer',
        'LangChain',
        'GraphRAG',
        'Agentic AI',
        'Symbiosis Institute of Technology',
        'Software Engineer Nagpur',
    ],
    authors: [{ name: fullName, url: siteUrl }],
    creator: fullName,
    publisher: fullName,
    category: 'technology',
    alternates: {
        canonical: siteUrl,
    },

    openGraph: {
        type: 'profile',
        firstName: 'Bharat Singh',
        lastName: 'Parihar',
        username: brand,
        locale: 'en_US',
        url: siteUrl,
        title: `${fullName} — ${role}`,
        description: siteDescription,
        siteName: `${fullName} — ${brand}`,
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: `${fullName} — ${role} (${brand})`,
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: `${fullName} — ${role}`,
        description: siteDescription,
        images: [ogImage],
    },

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

    // Optional: set NEXT_PUBLIC_GOOGLE_VERIFICATION to your Search Console token.
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
        ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
        : {}),
};

/* ============================================================================
   JSON-LD STRUCTURED DATA
   Entity-anchored with stable @id so Google/AI engines treat it as one Person
   entity referenced across schemas. This is the core of name-ranking + GEO/AEO.
   ========================================================================== */
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

// Person — the central entity.
export const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: fullName,
    alternateName: brand,
    url: siteUrl,
    image: headshot,
    jobTitle: role,
    description: siteDescription,
    email: `mailto:${portfolioData.personal.email}`,
    worksFor: {
        '@type': 'Organization',
        name: 'RNR Consulting Pvt. Ltd.',
    },
    alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Symbiosis Institute of Technology, Nagpur',
        sameAs: 'https://www.sitnagpur.siu.edu.in/',
    },
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nagpur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
    },
    nationality: { '@type': 'Country', name: 'India' },
    knowsAbout: [
        'Artificial Intelligence',
        'Generative AI',
        'Large Language Models',
        'Retrieval-Augmented Generation',
        'GraphRAG',
        'Agentic AI Systems',
        'Machine Learning',
        'Deep Learning',
        'Distributed Systems',
        'Federated Learning',
        'Full-Stack Development',
        'System Architecture',
        'Blockchain / Web3',
    ],
    knowsLanguage: ['English', 'Hindi'],
    sameAs,
};

// WebSite — enables sitelinks + ties content to the Person publisher.
export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: `${fullName} — ${brand}`,
    description: siteDescription,
    inLanguage: 'en',
    publisher: { '@id': personId },
    author: { '@id': personId },
};

// ProfilePage — types the homepage as a person profile (strong AEO/GEO signal).
export const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: siteUrl,
    name: `${fullName} — ${role}`,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
};

// FAQPage — wins featured snippets + feeds answer engines crisp, factual answers.
export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Who is Bharat Singh Parihar?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'Bharat Singh Parihar is an AI Systems Engineer from India who specializes in generative AI, ' +
                    'distributed systems, and full-stack development. He builds production-grade AI pipelines and ' +
                    'agentic systems, has 5 SCOPUS-indexed publications, and has won multiple national hackathons ' +
                    'including the Smart India Hackathon 2024. He is also known online as 404ghost.',
            },
        },
        {
            '@type': 'Question',
            name: 'What does Bharat Singh Parihar do?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'He designs and builds intelligent, production-ready systems — GenAI and Retrieval-Augmented ' +
                    'Generation (RAG) pipelines, multi-agent architectures, distributed backends, and modern web ' +
                    'applications. He works as an AI/ML web developer at RNR Consulting Pvt. Ltd. and as an ' +
                    'independent freelance engineer.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is 404ghost?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    '404ghost is the online handle and engineering brand of Bharat Singh Parihar, an AI Systems ' +
                    'Engineer. It represents his portfolio of GenAI, machine learning, and full-stack engineering work.',
            },
        },
        {
            '@type': 'Question',
            name: "What are Bharat Singh Parihar's notable projects?",
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'Notable projects include a real-time GenAI assistant using GraphRAG and Neo4j, a ' +
                    'privacy-preserving federated-learning fraud detector (91% accuracy), a deepfake detection ' +
                    'system (95% accuracy), and GigX, a decentralized freelance marketplace built on Ethereum ' +
                    'smart contracts.',
            },
        },
        {
            '@type': 'Question',
            name: 'What has Bharat Singh Parihar published?',
            acceptedAnswer: {
                '@type': 'Answer',
                text:
                    'He has 5 SCOPUS-indexed publications spanning deepfake detection with multi-criteria decision ' +
                    'making, privacy-preserving federated anomaly detection, GAN-LSTM image encryption, and ' +
                    'computer-vision accessibility systems.',
            },
        },
    ],
};

// CreativeWork — the portfolio itself.
export const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${fullName} Portfolio (${brand})`,
    author: { '@id': personId },
    description: siteDescription,
    url: siteUrl,
    image: ogImage,
    genre: 'Portfolio',
    keywords: 'AI, GenAI, Machine Learning, Distributed Systems, Full-Stack, Portfolio',
};

// ItemList of featured projects → richer entity coverage + project discovery.
export const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${fullName} — Featured Projects`,
    itemListElement: portfolioData.featuredProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.tagline,
            url: `${siteUrl}/work/${project.id}`,
            ...(project.image ? { image: project.image } : {}),
            programmingLanguage: project.techStack,
            author: { '@id': personId },
        },
    })),
};

// Helper: BreadcrumbList for sub-pages (blog posts, case studies).
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map((t, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: t.name,
            item: t.url.startsWith('http') ? t.url : `${siteUrl}${t.url}`,
        })),
    };
}

// Helper: Article schema for blog posts.
export function articleSchema(post: {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    image: string;
    category?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        url: `${siteUrl}/blog/${post.slug}`,
        ...(post.category ? { articleSection: post.category } : {}),
        author: { '@id': personId },
        publisher: { '@id': personId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
        isPartOf: { '@id': websiteId },
    };
}

// Persistent entity graph — safe on EVERY page (reinforces the Person entity site-wide).
export const globalJsonLd = [
    structuredData,
    websiteSchema,
];

// Homepage-only — ProfilePage/FAQ/ItemList describe the home document specifically,
// so they must NOT leak onto blog posts / case studies.
export const homeOnlyJsonLd = [
    profilePageSchema,
    faqSchema,
    portfolioSchema,
    creativeWorkSchema,
];

export { siteUrl, fullName, brand, role };
