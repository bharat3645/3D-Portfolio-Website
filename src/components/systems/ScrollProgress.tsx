'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Page-wide scroll progress rail — the "journey" cue. Fills left→right as the
 * visitor travels the whole story. Spring-smoothed so it glides instead of
 * stepping. Pure compositor transform (scaleX) — no layout, no paint thrash.
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.3,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[2px] z-[9997] origin-left
                       bg-gradient-to-r from-[#B91325] via-[#FF2A42] to-[#E61E32]"
            style={{ scaleX, boxShadow: '0 0 12px rgba(230,30,50,0.5)' }}
        />
    );
}
