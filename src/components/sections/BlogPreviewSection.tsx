'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { setSpotlightActive } from '@/core/MotionProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_COLORS: Record<string, string> = {
    'System Architecture': '#06B6D4',
    'Performance':         '#E61E32',
    'GenAI':               '#E61E32',
    'Web3':                '#7C3AED',
    'Engineering':         '#06B6D4',
};

const INITIAL_COUNT = 3;

export function BlogPreviewSection() {
    const headingRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headingRef, { once: true, margin: '-80px' });
    const [showAll, setShowAll] = useState(false);
    const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, INITIAL_COUNT);
    const remaining = blogPosts.length - INITIAL_COUNT;

    return (
        <section
            className="relative z-10 overflow-hidden section-spotlight"
            id="blog"
            onMouseEnter={() => setSpotlightActive(true)}
            onMouseLeave={() => setSpotlightActive(false)}
        >
            {/* Decorative bg text */}
            <div className="section-bg-text" aria-hidden="true">
                <span
                    // @ts-ignore
                    string="parallax"
                    string-speed="-0.06"
                >
                    LOGS
                </span>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div ref={headingRef} className="px-6 md:px-12 lg:px-16 pt-24 pb-16 max-w-[90rem] mx-auto">
                    <div className="flex items-end justify-between flex-wrap gap-6">
                        <div>
                            <div style={{ overflow: 'hidden' }}>
                                <motion.p
                                    initial={{ y: '110%' }}
                                    animate={inView ? { y: 0 } : {}}
                                    transition={{ duration: 0.7, ease: EASE }}
                                    className="font-mono text-[10px] text-[#E61E32] tracking-[0.35em] uppercase mb-4"
                                >
                                    Engineering Logs
                                </motion.p>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <motion.h2
                                    initial={{ y: '110%' }}
                                    animate={inView ? { y: 0 } : {}}
                                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
                                >
                                    Latest Logs
                                </motion.h2>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Link
                                href="/blog"
                                data-cursor="hover"
                                className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/25 hover:text-[#E61E32] transition-colors duration-300 flex items-center gap-3 group"
                            >
                                <span>All logs</span>
                                <svg width="16" height="6" viewBox="0 0 16 6" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                                    <path d="M0 3h14M10 1l4 2-4 2" stroke="currentColor" strokeWidth="0.8"/>
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Cinematic 1px-gap grid */}
                <div className="blog-cinematic-grid">
                    <AnimatePresence initial={false}>
                        {visiblePosts.map((post, i) => (
                            <BlogCard key={post.slug} post={post} index={i} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Load more */}
                {!showAll && remaining > 0 && (
                    <div className="flex justify-center pt-12 pb-8 px-6">
                        <motion.button
                            onClick={() => setShowAll(true)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="group flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300"
                            data-cursor="hover"
                        >
                            <span className="w-8 h-px bg-white/15 group-hover:w-14 group-hover:bg-white/40 transition-all duration-500" />
                            Load More Logs ({remaining})
                            <span className="w-8 h-px bg-white/15 group-hover:w-14 group-hover:bg-white/40 transition-all duration-500" />
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
}

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const accent = CATEGORY_COLORS[post.category] ?? '#E61E32';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: EASE }}
        >
            <Link href={`/blog/${post.slug}`} className="blog-cinematic-card block" data-cursor="hover">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden rounded-sm mb-6">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                        style={{ transition: 'opacity 0.7s ease, transform 1s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                        <span
                            className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full border"
                            style={{ color: accent, borderColor: `${accent}30`, background: `${accent}10` }}
                        >
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[9px] text-white/25 tracking-widest">{post.date}</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="font-mono text-[9px] text-white/25 tracking-widest">{post.readTime}</span>
                </div>

                {/* Title */}
                <div style={{ overflow: 'hidden' }} className="mb-3">
                    <motion.h3
                        initial={{ y: '110%' }}
                        animate={inView ? { y: 0 } : {}}
                        transition={{ duration: 0.75, delay: (index % 3) * 0.1 + 0.15, ease: EASE }}
                        className="font-display text-xl md:text-2xl font-bold text-white leading-snug tracking-tight"
                    >
                        {post.title}
                    </motion.h3>
                </div>

                {/* Excerpt */}
                <p className="text-white/35 text-sm font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
            </Link>
        </motion.div>
    );
}
