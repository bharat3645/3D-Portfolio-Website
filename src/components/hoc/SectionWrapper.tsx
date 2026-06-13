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

                {/* Compositor-only reveal — opacity + transform + scale (no blur, no paint thrash) */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1], // Professional easing curve
                        opacity: { duration: 0.8 },
                        y: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                        scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="py-8 sm:py-10 md:py-12 lg:py-16"
                >
                    <Component />
                </motion.div>
            </motion.section>
        );
    };
};
