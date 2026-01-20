'use client';

import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Image from 'next/image';
import { DecodeText } from '@/components/ui/DecodeText';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function HeroSection() {
    return (
        <section
            className="relative h-screen w-full overflow-hidden bg-[#050505] selection:bg-white/20 selection:text-white"
        >
            {/* ================= BACKGROUND: Deep Void ================= */}
            <div className="absolute inset-0 z-0 bg-[#050505]">
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
            </div>

            {/* ================= SPLINE ENVIRONMENT (Static, pointer-reactive only) ================= */}
            <div className="absolute right-[-20%] top-0 h-full w-[70%] z-[1] opacity-70 mix-blend-screen">
                <Suspense fallback={null}>
                    <Spline scene="/scene.splinecode" className="w-full h-full" />
                </Suspense>
            </div>

            {/* ================= SYSTEM NAV ================= */}
            <nav className="absolute top-10 right-10 md:right-16 z-20 flex gap-8 md:gap-12 mix-blend-difference">
                {['Work', 'About', 'Contact'].map((item, i) => (
                    <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 }}
                        whileHover={{ opacity: 1, color: '#E61E32', scale: 1.05 }}
                        transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                        className="font-mono text-[10px] uppercase tracking-[0.28em] text-white cursor-pointer transition-all duration-300"
                    >
                        {item}
                    </motion.a>
                ))}
            </nav>

            {/* ================= SYSTEM LOGO ================= */}
            <div className="absolute top-10 left-8 md:left-16 z-20 flex items-center gap-4 group cursor-pointer mix-blend-difference">
                <div className="relative w-11 h-11 transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <Image
                        src="/logo.jpg"
                        alt="404ghost system mark"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col gap-[2px]">
                    <span className="font-mono text-[9px] tracking-[0.32em] uppercase text-white/70 group-hover:text-[#E61E32] transition-colors duration-300">
                        System Online
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.28em] uppercase text-white/30">
                        Root Access
                    </span>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-[90rem] mx-auto px-8 md:px-16 w-full">

                    {/* MICRO IDENTIFIER: Crimson Brand Accent */}
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="font-mono text-[15px] tracking-[0.42em] uppercase text-[#E61E32] mb-4 font-bold"
                    >
                        I’m Bharat Singh Parihar, aka
                    </motion.p>

                    {/* PRIMARY IDENTITY: Decode Title */}
                    <DecodeText
                        text="404ghost"
                        delay={0.3}
                        className="font-display font-black text-[clamp(5rem,15vw,12rem)] leading-[0.9] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700 py-6 pr-6 drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                    />{/* Playfair Display for elegant sophistication */}

                    {/* ROLE STRIP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 flex flex-wrap gap-3 font-body text-sm md:text-base text-white/60 font-light"
                    >
                        <span className="text-white font-medium">AI Systems Engineer</span>
                        <span className="text-[#E61E32] opacity-50">●</span>
                        <span>GenAI</span>
                        <span className="text-[#E61E32] opacity-50">●</span>
                        <span>Distributed Systems</span>
                        <span className="text-[#E61E32] opacity-50">●</span>
                        <span>Full-Stack</span>
                    </motion.div>

                    {/* PHILOSOPHY LINE */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 max-w-xl text-white/50 text-base leading-relaxed font-light"
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.32em] uppercase text-white/30"
            >
                Scroll
            </motion.div>
        </section>
    );
}
