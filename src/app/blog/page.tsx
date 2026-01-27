'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog-posts';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg-void pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-oswald text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6">
            ENGINEERING LOGS
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Insights on AI systems, distributed architecture, and high-performance web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent-primary/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium text-black bg-white/90 backdrop-blur-md rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-oswald group-hover:text-accent-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center text-sm font-medium text-white group-hover:text-accent-primary transition-colors">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
