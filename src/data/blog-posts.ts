export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string; // Markdown supported
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'future-of-ai-systems',
    title: 'The Future of Distributed AI Systems',
    excerpt: 'Exploring how edge computing and federated learning are reshaping the landscape of artificial intelligence infrastructure.',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'System Architecture',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    content: `
# The Future of Distributed AI Systems

As models grow larger, the centralized training paradigm is hitting a wall. The future lies in distributed systems...

## Edge Computing
Edge computing allows processing to happen closer to the data source...

## Federated Learning
Privacy-preserving AI is becoming a requirement, not a feature...
    `
  },
  {
    slug: 'optimizing-threejs-react',
    title: 'Optimizing 3D in React Applications',
    excerpt: 'A deep dive into performance techniques for React Three Fiber: instance mesh, texture compression, and more.',
    date: '2024-12-28',
    readTime: '8 min read',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop',
    content: `
# Optimizing 3D in React Applications

Rendering 3D on the web is heavy. Here is how we make it fly.

## Dracosis Compression
Always compress your assets.

## Instancing
Don't render 1000 meshes. Render 1 mesh 1000 times.
    `
  },
  {
    slug: 'nextjs-14-server-actions',
    title: 'Building Type-Safe APIs with Next.js 14',
    excerpt: 'Why Server Actions are a game changer for full-stack React developers.',
    date: '2024-11-10',
    readTime: '6 min read',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2000&auto=format&fit=crop',
    content: `
# Server Actions

Say goodbye to manual API routes for simple mutations...
    `
  }
];
