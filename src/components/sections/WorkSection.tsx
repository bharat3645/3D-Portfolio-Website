'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';

const EASE = [0.16, 1, 0.3, 1] as const;

const projects = portfolioData.featuredProjects.map((p, i) => ({
    id: p.id,
    index: i,
    title: p.title,
    tagline: p.tagline,
    year: p.period.split(' ').at(-1) ?? '',
    link: `/work/${p.id}`,
    tech: p.techStack.slice(0, 4),
    impact: p.impact[0] ?? '',
    image: p.image,
}));

// ─── Individual card ─────────────────────────────────────────────────────────
function ProjectCard({ p }: { p: typeof projects[0] }) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Link href={p.link} className="block flex-shrink-0 w-[90vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] h-full group">
            <div
                ref={ref}
                data-cursor="view"
                data-cursor-label="OPEN"
                className="relative h-full overflow-hidden rounded-sm border border-white/[0.06] bg-[#080808]"
            >
                {/* Full-bleed image */}
                {p.image && (
                    <div className="absolute inset-0">
                        <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="(max-width: 768px) 90vw, 55vw"
                            className="object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-700 scale-105 group-hover:scale-100"
                            style={{ transition: 'opacity 0.7s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 lg:p-12">
                    {/* Top row */}
                    <div className="flex items-start justify-between">
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: '110%' }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease: EASE }}
                                className="block font-mono text-[10px] tracking-[0.3em] uppercase text-[#E61E32]"
                            >
                                {String(p.index + 1).padStart(2, '0')} — {p.year}
                            </motion.span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E61E32] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_12px_#E61E32] transition-all duration-300" />
                    </div>

                    {/* Bottom content */}
                    <div>
                        {/* Tagline */}
                        <div className="overflow-hidden mb-3">
                            <motion.p
                                initial={{ y: '110%' }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                                className="font-mono text-[11px] tracking-widest uppercase text-white/40"
                            >
                                {p.tagline}
                            </motion.p>
                        </div>

                        {/* Title */}
                        <div className="overflow-hidden mb-5">
                            <motion.h3
                                initial={{ y: '110%' }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
                                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight"
                            >
                                {p.title}
                            </motion.h3>
                        </div>

                        {/* Impact line */}
                        {p.impact && (
                            <div className="overflow-hidden mb-6">
                                <motion.p
                                    initial={{ y: '110%' }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
                                    className="text-white/50 text-sm font-light"
                                >
                                    {p.impact}
                                </motion.p>
                            </div>
                        )}

                        {/* Tech tags */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="flex flex-wrap gap-2"
                        >
                            {p.tech.map(t => (
                                <span
                                    key={t}
                                    className="font-mono text-[9px] tracking-[0.16em] uppercase px-2.5 py-1 border border-white/10 text-white/35 rounded-full"
                                >
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#E61E32] w-0 group-hover:w-full transition-all duration-700" />
            </div>
        </Link>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function WorkSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Pan left: 7 cards, each ~42vw + gap, scroll through (7-1) cards
    const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-260vw']);

    return (
        <section
            ref={containerRef}
            id="work"
            style={{ height: `${projects.length * 110}vh` }}
            className="relative"
        >
            {/* Decorative bg text */}
            <div className="sticky top-0 h-screen overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 overflow-hidden">
                    <span
                        className="font-display font-black text-[22vw] text-white/[0.025] tracking-tighter select-none leading-none"
                        // @ts-ignore
                        string="parallax"
                        string-speed="-0.08"
                    >
                        WORK
                    </span>
                </div>
            </div>

            {/* Sticky scroll panel */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden -mt-screen" style={{ marginTop: '-100vh' }}>
                {/* Header */}
                <div ref={headingRef} className="pt-16 pb-10 px-6 md:px-12 lg:px-16 flex-shrink-0">
                    <div className="flex items-end justify-between max-w-[90rem] mx-auto">
                        <div>
                            <div style={{ overflow: 'hidden' }}>
                                <motion.p
                                    initial={{ y: '110%' }}
                                    animate={headingInView ? { y: 0 } : {}}
                                    transition={{ duration: 0.7, ease: EASE }}
                                    className="font-mono text-[10px] text-[#E61E32] tracking-[0.35em] uppercase mb-4"
                                >
                                    Selected Works
                                </motion.p>
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                                <motion.h2
                                    initial={{ y: '110%' }}
                                    animate={headingInView ? { y: 0 } : {}}
                                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
                                >
                                    Engineering Impact
                                </motion.h2>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={headingInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/25"
                        >
                            <span>Scroll to explore</span>
                            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                                <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.8"/>
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* Horizontal scroll track */}
                <div className="flex-1 flex items-center overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex gap-4 md:gap-6 pl-6 md:pl-12 lg:pl-16 pr-6"
                        // @ts-ignore
                        string="glide"
                    >
                        {projects.map(p => (
                            <ProjectCard key={p.id} p={p} />
                        ))}
                        {/* End spacer card */}
                        <div className="flex-shrink-0 w-[20vw] h-full flex flex-col items-center justify-center">
                            <Link
                                href="/work/genai-assistant"
                                className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-[#E61E32] transition-colors duration-300 group flex items-center gap-3"
                                data-cursor="hover"
                            >
                                <span>View all</span>
                                <svg width="16" height="6" viewBox="0 0 16 6" fill="none" className="group-hover:translate-x-1 transition-transform duration-300">
                                    <path d="M0 3h14M10 1l4 2-4 2" stroke="currentColor" strokeWidth="0.8"/>
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll progress bar */}
                <div className="flex-shrink-0 px-6 md:px-12 lg:px-16 pb-8">
                    <div className="max-w-[90rem] mx-auto">
                        <div className="h-[1px] bg-white/[0.06] relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#E61E32]"
                                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
