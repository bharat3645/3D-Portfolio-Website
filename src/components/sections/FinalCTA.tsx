'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Magnetic } from '@/components/ui/Magnetic';
import { TextReveal, WordReveal } from '@/components/ui/TextReveal';
import { useRef, useState, useEffect } from 'react';

// Only load Earth when section enters viewport — prevents GPU hang
const EarthCanvas = dynamic(() => import('@/graphics/Earth').then((mod) => mod.EarthCanvas), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
});

const CTA_BUTTONS = [
    { href: 'mailto:bharat3645@gmail.com',                     label: 'Send Email',       cursorLabel: 'MAIL',    variant: 'primary'  },
    { href: '/Resume_Minimal.pdf',                             label: 'Download Resume',  cursorLabel: 'GET',     variant: 'secondary', download: true },
    { href: 'https://github.com/bharat3645',                   label: 'GitHub',           cursorLabel: 'CODE',    variant: 'primary',  external: true },
    { href: 'https://linkedin.com/in/bharat-singh-parihar',    label: 'LinkedIn',         cursorLabel: 'CONNECT', variant: 'secondary', external: true },
];

export function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const [earthMounted, setEarthMounted] = useState(false);

    // Mount EarthCanvas only when user scrolls within 400px of this section
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setEarthMounted(true); },
            { rootMargin: '400px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-12"
            id="contact"
        >
            {/* Earth — mounted lazily on scroll proximity */}
            {earthMounted && (
                <div className="absolute inset-0 z-0 h-full w-full opacity-22 pointer-events-none">
                    <EarthCanvas />
                </div>
            )}

            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden="true">
                <div className="w-[500px] h-[500px] rounded-full bg-[#E61E32] opacity-[0.035] blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-3xl w-full text-center">

                <WordReveal
                    text="Let's build something ambitious."
                    className="justify-center mb-6"
                    wordClass="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight pb-2"
                    stagger={0.07}
                />

                <div style={{ overflow: 'hidden' }} className="mb-12">
                    <TextReveal delay={0.4}>
                        <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            Open to meaningful conversations, research collaboration, and engineering challenges.
                        </p>
                    </TextReveal>
                </div>

                {/* Magnetic CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 mb-24 justify-center flex-wrap"
                >
                    {CTA_BUTTONS.map((btn) => (
                        <Magnetic key={btn.label} strength={0.35}>
                            <a
                                href={btn.href}
                                {...(btn.download ? { download: true } : {})}
                                {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                data-cursor="cta"
                                data-cursor-label={btn.cursorLabel}
                                className={`
                                    px-6 py-3 rounded-sm font-mono text-sm text-text-primary
                                    border transition-all duration-300 text-center block
                                    ${btn.variant === 'primary'
                                        ? 'bg-white/5 border-border-medium hover:bg-white/10 hover:border-accent-primary hover:shadow-glow-subtle'
                                        : 'bg-white/5 border-border-medium hover:bg-white/10 hover:border-accent-secondary hover:shadow-glow-cyan-subtle'
                                    }
                                `}
                            >
                                {btn.label}
                            </a>
                        </Magnetic>
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12 z-10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left pt-6 border-t border-white/[0.04]">
                    <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
                        © 2026 404ghost · Bharat Singh Parihar
                    </span>
                    <span className="font-mono text-[10px] text-white/15 uppercase tracking-widest">
                        Built with Next.js · StringTune · Three.js
                    </span>
                </div>
            </div>
        </section>
    );
}
