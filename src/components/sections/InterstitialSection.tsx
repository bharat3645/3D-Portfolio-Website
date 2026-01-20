'use client';

import { motion } from 'framer-motion';

export function InterstitialSection() {
    return (
        <section className="h-[50vh] w-full relative flex items-center justify-center pointer-events-none">
            {/* Just the ambient field showing through. No decorations. */}
            <div
                className="opacity-20 font-mono text-[10px] tracking-[0.5em] text-white transition-transform duration-75"
                style={{ transform: 'scale(calc(1 + var(--scroll-velocity, 0) * 0.05))' }}
            >
                {'// VOID'}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-void/50 to-bg-void pointer-events-none" />
        </section>
    );
}
