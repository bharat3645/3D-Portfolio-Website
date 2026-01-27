import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.image }],
    }
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-bg-void pt-32 pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/blog">
                    <Button variant="ghost" className="text-white/80 hover:text-white mb-6 pl-0 hover:bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Logs
                    </Button>
                </Link>
                
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                    <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-white">
                        <Tag className="w-3 h-3" />
                        {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold font-oswald text-white mb-6 leading-tight">
                    {post.title}
                </h1>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-lg max-w-none">
            {/* Simple Markdown Rendering (Replace with a proper MDX/Markdown renderer in production) */}
            {post.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-white font-oswald">{line.replace('# ', '')}</h1>
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-white font-oswald">{line.replace('## ', '')}</h2>
                if (line.trim() === '') return <br key={i} />
                return <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>
            })}
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
                © 2024 Bharat Singh Parihar
            </div>
            <Button variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share Article
            </Button>
        </div>
      </div>
    </article>
  );
}
