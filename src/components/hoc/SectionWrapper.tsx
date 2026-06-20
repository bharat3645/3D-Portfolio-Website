'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '@/core/animation';
import { useRef } from 'react';

export const SectionWrapper = (Component: React.ComponentType, idName: string) => {
    return function HOC() {
        const ref = useRef<HTMLDivElement>(null);

        return (
            <motion.section
                ref={ref}
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-7xl mx-auto relative z-0 px-4 sm:px-6 lg:px-8"
                style={{
                    background: 'transparent',
                    borderTop: 'none',
                    borderBottom: 'none'
                }}
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>

                {/* Crisp compositor-only reveal — fade + rise, no scale wobble.
                    Faster + snappier than the old 1.2s scale so the page reads
                    responsive, not heavy. */}
                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="py-6 sm:py-8 md:py-10"
                >
                    <Component />
                </motion.div>
            </motion.section>
        );
    };
};
