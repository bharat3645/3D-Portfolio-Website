'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function SpotlightEffect() {
    const startX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const startY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

    const x = useMotionValue(startX);
    const y = useMotionValue(startY);

    const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1]">
            {/* Hidden Grid Layer that gets revealed */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_var(--x)_var(--y),black_40%,transparent_100%)]" />

            {/* The Light Itself */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `radial-gradient(600px circle at ${smoothX.get()}px ${smoothY.get()}px, rgba(255,255,255,0.06), transparent 40%)`
                }}
            />
            {/* Direct style update for performance on the gradient */}
            <UpdateVariables x={smoothX} y={smoothY} />
        </div>
    );
}

function UpdateVariables({ x, y }: { x: any, y: any }) {
    useEffect(() => {
        let frameId: number;
        const update = () => {
            document.documentElement.style.setProperty('--x', `${x.get()}px`);
            document.documentElement.style.setProperty('--y', `${y.get()}px`);
            frameId = requestAnimationFrame(update);
        }
        update();
        return () => cancelAnimationFrame(frameId);
    }, [x, y]);
    return null;
}
