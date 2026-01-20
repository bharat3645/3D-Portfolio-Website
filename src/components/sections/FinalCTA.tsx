'use client';

import { motion } from 'framer-motion';
import { EarthCanvas } from '@/graphics/Earth';

export function FinalCTA() {
    return (
        <section className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12">

            {/* 3D Earth Background (Subtle) */}
            <div className="absolute inset-0 z-0 h-full w-full opacity-30 pointer-events-none">
                <EarthCanvas />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-3xl w-full text-center">

                {/* 1. Primary Message (Intent) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight mb-6">
                        Let&apos;s build something ambitious.
                    </h2>
                </motion.div>

                {/* 2. Supporting Context */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-base md:text-lg text-text-secondary leading-relaxed mb-12 opacity-70 max-w-2xl mx-auto"
                >
                    Open to meaningful conversations, research collaboration, and engineering challenges.
                </motion.p>

                {/* 3. Contact Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 mb-24 justify-center"
                >
                    <a
                        href="mailto:bharat3645@gmail.com"
                        className="px-6 py-3 bg-white/5 border border-border-medium rounded-sm font-mono text-sm text-text-primary hover:bg-white/10 hover:border-accent-primary hover:shadow-glow-subtle transition-all duration-300 text-center"
                    >
                        Send Email
                    </a>
                    <a
                        href="/Resume_Minimal.pdf"
                        download
                        className="px-6 py-3 bg-white/5 border border-border-medium rounded-sm font-mono text-sm text-text-primary hover:bg-white/10 hover:border-accent-secondary hover:shadow-glow-cyan-subtle transition-all duration-300 text-center"
                    >
                        Download Resume
                    </a>
                    <a
                        href="https://github.com/bharat3645"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white/5 border border-border-medium rounded-sm font-mono text-sm text-text-primary hover:bg-white/10 hover:border-accent-primary hover:shadow-glow-subtle transition-all duration-300 text-center"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com/in/bharat-singh-parihar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white/5 border border-border-medium rounded-sm font-mono text-sm text-text-primary hover:bg-white/10 hover:border-accent-secondary hover:shadow-glow-cyan-subtle transition-all duration-300 text-center"
                    >
                        LinkedIn
                    </a>
                </motion.div>
            </div>

            {/* 4. Footer Metadata (Very Subtle) */}
            <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12 z-10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left border-t border-white/5 pt-6">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                        © 2026 404ghost · Bharat Singh Parihar
                    </span>
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                        Deployed on Vercel · Built with React / Next.js
                    </span>
                </div>
            </div>

        </section>
    );
}
