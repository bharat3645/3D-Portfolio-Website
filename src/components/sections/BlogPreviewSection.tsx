'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

export function BlogPreviewSection() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 px-4 relative z-10" id="blog">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4">
              LATEST LOGS
            </h2>
            <p className="text-muted-foreground text-lg">
              Engineering insights and research notes.
            </p>
          </div>
          <Link href="/blog">
            <span className="flex items-center gap-2 text-white hover:text-accent-primary transition-colors cursor-pointer group">
              View All Logs
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4 border border-white/10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                  <span className="w-1 h-1 rounded-full bg-white/30 mx-1" />
                  {post.category}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-oswald group-hover:text-accent-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
