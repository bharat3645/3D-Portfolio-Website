'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Magnetic } from '@/components/ui/Magnetic';
import { TextReveal, WordReveal } from '@/components/ui/TextReveal';
import { useRef, useState, useEffect } from 'react';

// Only load Earth when section enters viewport — prevents GPU hang
const EarthCanvas = dynamic(() => import('@/graphics/Earth').then((mod) => mod.EarthCanvas), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const CTA_BUTTONS = [
    { href: 'mailto:bharat3645@gmail.com',                     label: 'Send Email',  cursorLabel: 'MAIL',    variant: 'primary'  },
    { href: 'https://github.com/bharat3645',                   label: 'GitHub',      cursorLabel: 'CODE',    variant: 'primary',  external: true },
    { href: 'https://linkedin.com/in/bharat-singh-parihar',    label: 'LinkedIn',    cursorLabel: 'CONNECT', variant: 'secondary', external: true },
];

// Two real resume tracks live in /public — matches the dual AI/ML + Full-Stack positioning.
const RESUMES = [
    { label: 'AI / ML',     sub: 'GenAI · Research · MLOps',        href: '/BSP-AI_ML_Resume.pdf'     },
    { label: 'Full-Stack',  sub: 'Web · Distributed · Product',     href: '/BSP-FullStack_Resume.pdf' },
];

const BTN_CLASS = (variant: string) => `
    px-6 py-3 rounded-sm font-mono text-sm text-text-primary
    border transition-all duration-300 text-center block
    ${variant === 'primary'
        ? 'bg-white/5 border-border-medium hover:bg-white/10 hover:border-accent-primary hover:shadow-glow-subtle'
        : 'bg-white/5 border-border-medium hover:bg-white/10 hover:border-accent-secondary hover:shadow-glow-cyan-subtle'
    }`;

/** Click-toggle résumé picker — reveals the two tracks. Closes on outside click / Esc. */
function ResumePicker() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <div ref={wrapRef} className="relative">
            <Magnetic strength={0.35}>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    data-cursor="cta"
                    data-cursor-label="GET"
                    aria-haspopup="true"
                    aria-expanded={open}
                    className={`${BTN_CLASS('secondary')} flex items-center gap-2 w-full justify-center`}
                >
                    Résumé
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
                        ↓
                    </motion.span>
                </button>
            </Magnetic>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 z-30
                                   bg-[#0A0A0A]/95 backdrop-blur-md border border-white/10 rounded-md p-2
                                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
                        role="menu"
                    >
                        {RESUMES.map((r) => (
                            <a
                                key={r.label}
                                href={r.href}
                                download
                                data-cursor="hover"
                                role="menuitem"
                                className="group flex items-center justify-between gap-3 px-4 py-3 rounded
                                           hover:bg-white/[0.04] transition-colors text-left"
                            >
                                <span className="flex flex-col">
                                    <span className="font-mono text-sm text-white group-hover:text-accent-primary transition-colors">
                                        {r.label}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/30 tracking-wide">{r.sub}</span>
                                </span>
                                <span className="text-white/25 group-hover:text-accent-primary group-hover:translate-y-0.5 transition-all" aria-hidden="true">
                                    ↓
                                </span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null);
    const [earthMounted, setEarthMounted] = useState(false);

    // Mount EarthCanvas when the contact section is near; UNMOUNT it once it's
    // well off-screen. Earth runs frameloop="always" (smooth autorotate), so it
    // must not keep rendering when scrolled away — gating here is the throttle.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setEarthMounted(entry.isIntersecting),
            { rootMargin: '300px' }
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
                    className="flex flex-col sm:flex-row gap-4 mb-24 justify-center flex-wrap items-stretch"
                >
                    <Magnetic strength={0.35}>
                        <a
                            href={CTA_BUTTONS[0].href}
                            data-cursor="cta"
                            data-cursor-label={CTA_BUTTONS[0].cursorLabel}
                            className={BTN_CLASS(CTA_BUTTONS[0].variant)}
                        >
                            {CTA_BUTTONS[0].label}
                        </a>
                    </Magnetic>

                    <ResumePicker />

                    {CTA_BUTTONS.slice(1).map((btn) => (
                        <Magnetic key={btn.label} strength={0.35}>
                            <a
                                href={btn.href}
                                {...(btn.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                data-cursor="cta"
                                data-cursor-label={btn.cursorLabel}
                                className={BTN_CLASS(btn.variant)}
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
