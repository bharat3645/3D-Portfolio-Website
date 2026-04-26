'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Single line reveal (overflow:hidden mask) ───────────────────────────────
interface TextRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    duration?: number;
}

export function TextReveal({ children, delay = 0, className = '', duration = 0.9 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <div ref={ref} style={{ overflow: 'hidden', display: 'block' }}>
            <motion.div
                className={className}
                initial={{ y: '110%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration, delay, ease: EASE }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// ─── Word-by-word stagger reveal ─────────────────────────────────────────────
interface WordRevealProps {
    text: string;
    delay?: number;
    className?: string;
    wordClass?: string;
    stagger?: number;
}

export function WordReveal({ text, delay = 0, className = '', wordClass = '', stagger = 0.06 }: WordRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <div ref={ref} className={`flex flex-wrap ${className}`} style={{ columnGap: '0.28em', rowGap: 0 }}>
            {text.split(' ').map((word, i) => (
                <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                    <motion.span
                        className={wordClass}
                        style={{ display: 'block' }}
                        initial={{ y: '110%' }}
                        animate={inView ? { y: '0%' } : {}}
                        transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    );
}

// ─── Label + Heading combo (StringTune site pattern) ─────────────────────────
interface SectionHeadingProps {
    label: string;
    heading: string;
    subtext?: string;
    align?: 'left' | 'center';
    delay?: number;
}

export function SectionHeading({ label, heading, subtext, align = 'center', delay = 0 }: SectionHeadingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const center = align === 'center';

    return (
        <div ref={ref} className={`mb-16 ${center ? 'text-center' : ''}`}>
            {/* Label slide */}
            <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.p
                    className="font-mono text-[10px] text-[#E61E32] tracking-[0.35em] uppercase mb-5"
                    initial={{ y: '110%' }}
                    animate={inView ? { y: '0%' } : {}}
                    transition={{ duration: 0.7, delay, ease: EASE }}
                >
                    {label}
                </motion.p>
            </div>

            {/* Heading word reveal */}
            <WordReveal
                text={heading}
                delay={delay + 0.1}
                className={center ? 'justify-center' : ''}
                wordClass="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight pb-2"
                stagger={0.07}
            />

            {/* Subtext */}
            {subtext && (
                <div style={{ overflow: 'hidden' }} className="mt-5">
                    <motion.p
                        className="text-neutral-400 text-base md:text-lg font-light max-w-2xl mx-auto"
                        initial={{ y: '110%' }}
                        animate={inView ? { y: '0%' } : {}}
                        transition={{ duration: 0.8, delay: delay + 0.35, ease: EASE }}
                    >
                        {subtext}
                    </motion.p>
                </div>
            )}
        </div>
    );
}
