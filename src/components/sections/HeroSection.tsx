'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy, useState, useEffect } from 'react';
import Image from 'next/image';
import { DecodeText } from '@/components/ui/DecodeText';
import { Magnetic } from '@/components/ui/Magnetic';

const Spline = lazy(() => import('@splinetool/react-spline'));

const EASE = [0.16, 1, 0.3, 1] as const;
const NAV_ITEMS = ['Work', 'About', 'Blog', 'Contact'];
const ROLE_WORDS = ['AI Systems Engineer', 'GenAI', 'Distributed Systems', 'Full-Stack'];

export function HeroSection() {
    const [splineMounted, setSplineMounted] = useState(false);

    useEffect(() => {
        // Let preloader finish first, then mount Spline
        const id = setTimeout(() => setSplineMounted(true), 2000);
        return () => clearTimeout(id);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full overflow-hidden bg-[#050505] selection:bg-white/20 selection:text-white"
            aria-label="Hero section"
        >
            <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-crimson focus:text-white focus:rounded">
                Skip to main content
            </a>

            {/* Deep void bg */}
            <div className="absolute inset-0 z-0 bg-[#050505]" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.025] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Spline — mounted after preloader, parallax via StringTune */}
            {splineMounted && (
                <div
                    className="absolute right-[-40%] sm:right-[-30%] md:right-[-20%] top-0 h-full w-[100%] sm:w-[80%] md:w-[70%] z-[1] opacity-45 sm:opacity-55 md:opacity-65 mix-blend-screen"
                    aria-hidden="true"
                    // @ts-ignore — StringTune parallax attribute
                    string="parallax"
                    string-speed="-0.18"
                >
                    <Suspense fallback={null}>
                        <Spline scene="/scene.splinecode" className="w-full h-full" />
                    </Suspense>
                </div>
            )}

            {/* Nav */}
            <nav
                className="absolute top-6 sm:top-8 md:top-10 right-6 sm:right-10 md:right-16 z-20 flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 mix-blend-difference"
                aria-label="Main navigation"
            >
                {NAV_ITEMS.map((item, i) => (
                    <Magnetic key={item} strength={0.4}>
                        <motion.a
                            href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 0.6, y: 0 }}
                            whileHover={{ opacity: 1, color: '#E61E32' }}
                            transition={{ duration: 0.7, delay: 0.8 + i * 0.08, ease: EASE }}
                            className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-white block p-2 -m-2"
                            data-cursor="hover"
                            aria-label={`Navigate to ${item}`}
                        >
                            {item}
                        </motion.a>
                    </Magnetic>
                ))}
            </nav>

            {/* Logo */}
            <div
                className="absolute top-6 sm:top-8 md:top-10 left-4 sm:left-6 md:left-8 lg:left-16 z-20 flex items-center gap-3 group mix-blend-difference"
                role="banner"
                data-cursor="hover"
            >
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <Image src="/logo.jpg" alt="404ghost" fill className="object-cover" priority />
                </div>
                <div className="hidden sm:flex flex-col gap-[2px]">
                    <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.32em] uppercase text-white/70 group-hover:text-[#E61E32] transition-colors duration-300">System Online</span>
                    <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.28em] uppercase text-white/30">Root Access</span>
                </div>
            </div>

            {/* Content — parallax layer (slightly slower than Spline) */}
            <div
                className="relative z-10 min-h-screen flex items-center"
                // @ts-ignore
                string="parallax"
                string-speed="0.05"
            >
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 w-full py-20 sm:py-0">

                    {/* Label — StringTune mask reveal */}
                    <div style={{ overflow: 'hidden' }} className="mb-3 sm:mb-4">
                        <motion.p
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
                            className="font-mono text-[11px] sm:text-[13px] md:text-[15px] tracking-[0.38em] uppercase text-[#E61E32] font-bold"
                        >
                            I&apos;m Bharat Singh Parihar, aka
                        </motion.p>
                    </div>

                    {/* Title — decode effect */}
                    <DecodeText
                        text="404ghost"
                        delay={0.3}
                        className="font-display font-black text-[clamp(3rem,12vw,12rem)] leading-[0.9] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700 py-4 sm:py-6 pr-4 sm:pr-6 drop-shadow-[0_0_60px_rgba(255,255,255,0.12)]"
                    />

                    {/* Role strip — staggered word reveal */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
                        className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 font-body text-xs sm:text-sm md:text-base"
                    >
                        {ROLE_WORDS.map((word, i) => (
                            <div key={word} style={{ overflow: 'hidden' }}>
                                <motion.span
                                    variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
                                    transition={{ duration: 0.75, ease: EASE }}
                                    style={{ display: 'block' }}
                                    className={i === 0 ? 'text-white font-medium' : 'text-white/55 font-light'}
                                >
                                    {i > 0 && <span className="text-[#E61E32]/40 mr-2">●</span>}
                                    {word}
                                </motion.span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Philosophy */}
                    <div style={{ overflow: 'hidden' }} className="mt-5 sm:mt-7 max-w-xl">
                        <motion.p
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
                            className="text-white/45 text-sm sm:text-base leading-relaxed font-light"
                        >
                            Architecting intelligent systems that endure in production.
                        </motion.p>
                    </div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
                        className="mt-10 sm:mt-12 flex flex-wrap gap-3 sm:gap-4"
                    >
                        <Magnetic strength={0.3}>
                            <a href="#work" data-cursor="cta" data-cursor-label="VIEW" className="hero-btn hero-btn--primary">View Work</a>
                        </Magnetic>
                        <Magnetic strength={0.3}>
                            <a href="#contact" data-cursor="cta" data-cursor-label="TALK" className="hero-btn hero-btn--secondary">Get in Touch</a>
                        </Magnetic>
                    </motion.div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.28 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                aria-hidden="true"
            >
                <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-white/28">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-6 bg-gradient-to-b from-white/28 to-transparent"
                />
            </motion.div>
        </section>
    );
}
