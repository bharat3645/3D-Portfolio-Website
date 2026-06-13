'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { DecodeText } from '@/components/ui/DecodeText';
import { Magnetic } from '@/components/ui/Magnetic';
import { detectQuality } from '@/hooks/useQuality';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

const EASE = [0.16, 1, 0.3, 1] as const;
const NAV_ITEMS = ['Work', 'About', 'Blog', 'Contact'];

export function HeroSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [splineMounted, setSplineMounted] = useState(false);
    const [splineReady, setSplineReady] = useState(false);

    useEffect(() => {
        // On reduced-motion / data-saver / weak devices, skip the heavy Spline scene
        // entirely (static hero). The asset is preserved — just not loaded here.
        if (detectQuality() === 'low') return;
        const id = setTimeout(() => setSplineMounted(true), 1800);
        return () => clearTimeout(id);
    }, []);

    const handleSplineLoad = useCallback((_app: Application) => {
        setSplineReady(true);
    }, []);

    return (
        <section
            id="hero"
            ref={ref}
            className="relative min-h-screen w-full overflow-hidden bg-[#050505]"
            aria-label="Hero section"
        >
            <a
                href="#work"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-crimson focus:text-white focus:rounded"
            >
                Skip to main content
            </a>

            {/* Noise grain */}
            <div
                className="absolute inset-0 z-0 bg-[url('/noise.svg')] opacity-[0.035] pointer-events-none"
                aria-hidden="true"
            />

            {/* SEO / AEO: the real document <h1> — name-led so name searches rank here.
                Visually hidden; the 404GHOST wordmark below is the visual focal point. */}
            <h1 className="sr-only">
                Bharat Singh Parihar — AI Systems Engineer specializing in GenAI,
                distributed systems, and full-stack development. Known online as 404ghost.
            </h1>

            {/* ─── TOP CRIMSON RULE — 1px full-width accent ─── */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                className="absolute top-0 left-0 w-full h-px z-30"
                style={{ background: '#E61E32', transformOrigin: 'left center' }}
                aria-hidden="true"
            />

            {/* ─── SPLINE — right-side robot, bigger + pushed further right ─── */}
            <div
                className="absolute right-[-20%] sm:right-[-12%] md:right-[-8%] top-1/2 -translate-y-1/2 h-[80%] sm:h-[90%] w-[100%] sm:w-[70%] md:w-[60%] z-[1] mix-blend-screen pointer-events-none"
                style={{
                    opacity: splineReady ? 0.8 : 0,
                    transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1)',
                }}
                aria-hidden="true"
            >
                {splineMounted && (
                    <Suspense fallback={null}>
                        <Spline
                            scene="/scene.splinecode"
                            onLoad={handleSplineLoad}
                            renderOnDemand={true}
                            className="w-full h-full"
                            style={{ pointerEvents: 'none' }}
                        />
                    </Suspense>
                )}
            </div>

            {/* ─── NAV ─── */}
            <nav
                className="absolute top-7 right-6 sm:right-10 md:right-16 z-20 flex gap-6 md:gap-10"
                aria-label="Main navigation"
            >
                {NAV_ITEMS.map((item, i) => (
                    <Magnetic key={item} strength={0.4}>
                        <motion.a
                            href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 0.45, y: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: EASE }}
                            className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white block p-2 -m-2"
                            data-cursor="hover"
                            aria-label={`Navigate to ${item}`}
                        >
                            {item}
                        </motion.a>
                    </Magnetic>
                ))}
            </nav>

            {/* ─── LOGO ─── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="absolute top-6 left-6 sm:left-10 md:left-16 z-20 flex items-center gap-3"
                data-cursor="hover"
            >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/12 bg-white/5 flex-shrink-0">
                    <Image src="/logo.jpg" alt="Bharat Singh Parihar — 404ghost logo" fill className="object-cover" priority />
                </div>
                <div className="hidden sm:flex flex-col gap-[1px]">
                    <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/50">Bharat Singh Parihar</span>
                    <span className="font-mono text-[7px] tracking-[0.28em] uppercase text-white/20">AI Systems Engineer</span>
                </div>
            </motion.div>

            {/* ─── MAIN CONTENT ─── */}
            <motion.div
                className="relative z-10 flex flex-col min-h-screen px-6 sm:px-10 md:px-16"
                style={{ y: titleY, opacity: contentOpacity }}
            >

                {/* ── STATUS BADGE ── crimson, floats above title */}
                <div className="pt-28 md:pt-32 pb-6 md:pb-8">
                    <div style={{ overflow: 'hidden' }}>
                        <motion.div
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                            className="inline-flex items-center gap-2"
                        >
                            <span
                                className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                style={{ background: '#E61E32' }}
                                aria-hidden="true"
                            />
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.42em] uppercase text-white/35">
                                Bharat Singh Parihar &nbsp;·&nbsp; Available for Work
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* ── TITLE — wordmark sized to fit one line (no clip) ── */}
                <div className="flex-1 flex flex-col justify-center">
                    <DecodeText
                        text="404GHOST"
                        delay={0.25}
                        className="font-display font-black text-[clamp(2.4rem,10.5vw,12.5rem)] leading-[0.82] tracking-[-0.035em] text-white select-none whitespace-nowrap"
                    />

                    {/* Role line + animated rule — gives the wordmark immediate context */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
                        className="mt-7 md:mt-9 flex items-center gap-4 md:gap-6 flex-wrap"
                    >
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/75 whitespace-nowrap">
                            AI Systems Engineer
                        </span>
                        <span className="hidden sm:block h-px w-10 md:w-16 bg-gradient-to-r from-[#E61E32]/60 to-transparent flex-shrink-0" />
                        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/35">
                            GenAI · Distributed Systems · Full-Stack
                        </span>
                    </motion.div>
                </div>

                {/* ── FOOTER ROW ── */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.25, ease: EASE }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 pb-14 md:pb-16"
                >
                    {/* Left — tagline */}
                    <div className="max-w-[26rem]">
                        <p className="text-[0.95rem] font-light leading-[1.75]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Architecting intelligent systems that endure in production —
                            <span className="text-white/80"> from GenAI pipelines to distributed backends.</span>
                        </p>
                    </div>

                    {/* Right — CTAs */}
                    <div className="flex flex-row md:flex-col gap-5 md:gap-[14px] items-start md:items-end flex-shrink-0">
                        <Magnetic strength={0.35}>
                            <a href="#work" data-cursor="cta" data-cursor-label="VIEW" className="group flex items-center gap-3">
                                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-white/38 group-hover:text-white/80 transition-colors duration-300">
                                    View Work
                                </span>
                                <span className="block h-px bg-white/18 group-hover:bg-white/60 transition-all duration-500"
                                      style={{ width: '2rem' }}
                                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.width = '3.5rem')}
                                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.width = '2rem')}
                                />
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.35}>
                            <a href="#contact" data-cursor="cta" data-cursor-label="TALK" className="group flex items-center gap-3">
                                <span className="font-mono text-[10px] tracking-[0.28em] uppercase transition-colors duration-300"
                                      style={{ color: 'rgba(230,30,50,0.6)' }}
                                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E61E32')}
                                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(230,30,50,0.6)')}
                                >
                                    Get in Touch
                                </span>
                                <span className="block h-px transition-all duration-500"
                                      style={{ width: '2rem', background: 'rgba(230,30,50,0.28)' }}
                                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.width = '3.5rem'; (e.currentTarget as HTMLElement).style.background = 'rgba(230,30,50,0.75)'; }}
                                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.width = '2rem'; (e.currentTarget as HTMLElement).style.background = 'rgba(230,30,50,0.28)'; }}
                                />
                            </a>
                        </Magnetic>
                    </div>
                </motion.div>
            </motion.div>

            {/* ─── SCROLL INDICATOR — right side, vertical ─── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute right-5 md:right-9 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-20"
                aria-hidden="true"
            >
                <motion.div
                    animate={{ scaleY: [1, 0.3, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent origin-top"
                />
                <span
                    className="font-mono text-[7px] tracking-[0.5em] uppercase text-white/18 mt-1"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    Scroll
                </span>
            </motion.div>

            {/* Mobile scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden z-20"
                aria-hidden="true"
            >
                <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-5 bg-gradient-to-b from-white/20 to-transparent"
                />
            </motion.div>
        </section>
    );
}
