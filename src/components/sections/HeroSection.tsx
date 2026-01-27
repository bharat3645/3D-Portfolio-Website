'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Image from 'next/image';
import { DecodeText } from '@/components/ui/DecodeText';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function HeroSection() {
    return (
        <section
            className="relative min-h-screen w-full overflow-hidden bg-[#050505] selection:bg-white/20 selection:text-white"
            aria-label="Hero section"
        >
            {/* Skip to main content link for keyboard navigation */}
            <a
                href="#work"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-crimson focus:text-white focus:rounded"
            >
                Skip to main content
            </a>

            {/* ================= BACKGROUND: Deep Void ================= */}
            <div className="absolute inset-0 z-0 bg-[#050505]" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
            </div>

            {/* ================= SPLINE ENVIRONMENT (Responsive positioning) ================= */}
            <div className="absolute right-[-40%] sm:right-[-30%] md:right-[-20%] top-0 h-full w-[100%] sm:w-[80%] md:w-[70%] z-[1] opacity-50 sm:opacity-60 md:opacity-70 mix-blend-screen" aria-hidden="true">
                <Suspense fallback={null}>
                    <Spline scene="/scene.splinecode" className="w-full h-full" />
                </Suspense>
            </div>

            {/* ================= SYSTEM NAV ================= */}
            <nav
                className="absolute top-6 sm:top-8 md:top-10 right-6 sm:right-10 md:right-16 z-20 flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 mix-blend-difference"
                aria-label="Main navigation"
            >
{['Work', 'About', 'Blog', 'Contact'].map((item, i) => (
                    <motion.a
                        key={item}
                        href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 }}
                        whileHover={{ opacity: 1, color: '#E61E32', scale: 1.05 }}
                        transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                        className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white cursor-pointer transition-all duration-300 touch-manipulation"
                        aria-label={`Navigate to ${item}`}
                    >
                        {item}
                    </motion.a>
                ))}
            </nav>

            {/* ================= SYSTEM LOGO ================= */}
            <div className="absolute top-6 sm:top-8 md:top-10 left-4 sm:left-6 md:left-8 lg:left-16 z-20 flex items-center gap-3 sm:gap-4 group cursor-pointer mix-blend-difference" role="banner">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <Image
                        src="/logo.jpg"
                        alt="404ghost logo - Bharat Singh Parihar"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="hidden sm:flex flex-col gap-[2px]">
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-white/70 group-hover:text-[#E61E32] transition-colors duration-300">
                        System Online
                    </span>
                    <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-white/30">
                        Root Access
                    </span>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 w-full py-20 sm:py-0">

                    {/* MICRO IDENTIFIER: Crimson Brand Accent */}
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="font-mono text-[11px] sm:text-[13px] md:text-[15px] tracking-[0.32em] sm:tracking-[0.38em] md:tracking-[0.42em] uppercase text-[#E61E32] mb-3 sm:mb-4 font-bold"
                    >
                        I'm Bharat Singh Parihar, aka
                    </motion.p>

                    {/* PRIMARY IDENTITY: Decode Title */}
                    <DecodeText
                        text="404ghost"
                        delay={0.3}
                        className="font-display font-black text-[clamp(3rem,12vw,12rem)] leading-[0.9] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700 py-4 sm:py-6 pr-4 sm:pr-6 drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                    />{/* Playfair Display for elegant sophistication */}

                    {/* ROLE STRIP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 font-body text-xs sm:text-sm md:text-base text-white/60 font-light"
                    >
                        <span className="text-white font-medium">AI Systems Engineer</span>
                        <span className="text-[#E61E32] opacity-50">●</span>
                        <span>GenAI</span>
                        <span className="text-[#E61E32] opacity-50">●</span>
                        <span>Distributed Systems</span>
                        <span className="text-[#E61E32] opacity-50 hidden sm:inline">●</span>
                        <span className="hidden sm:inline">Full-Stack</span>
                    </motion.div>

                    {/* PHILOSOPHY LINE */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.9 }}
                        className="mt-4 sm:mt-6 max-w-xl text-white/50 text-sm sm:text-base leading-relaxed font-light"
                    >
                        Architecting intelligent systems that endure in production.
                    </motion.p>
                </div>
            </div>

            {/* ================= SCROLL CUE ================= */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-white/30"
            >
                Scroll
            </motion.div>
        </section>
    );
}
