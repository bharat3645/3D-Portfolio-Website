'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer } from '@/core/animation';
import { useRef } from 'react';

export const SectionWrapper = (Component: React.ComponentType, idName: string) => {
    return function HOC() {
        const ref = useRef<HTMLDivElement>(null);

        // Parallax scroll effect for smooth floating
        const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "end start"]
        });

        const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

        return (
            <motion.section
                ref={ref}
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.15 }}
                className="max-w-7xl mx-auto relative z-0 py-0"
                style={{
                    background: 'transparent',
                    borderTop: 'none',
                    borderBottom: 'none'
                }}
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>

                {/* Wix-style smooth floating transition */}
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                        duration: 1.8,
                        ease: [0.25, 0.1, 0.25, 1], // Wix-style smooth easing
                        opacity: { duration: 1.5 },
                        y: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
                    }}
                    style={{ y, opacity }}
                    className="py-16 md:py-24"
                >
                    <Component />
                </motion.div>
            </motion.section>
        );
    };
};
