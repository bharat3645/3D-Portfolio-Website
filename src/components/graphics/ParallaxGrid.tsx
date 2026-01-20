'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ParallaxGrid() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 range
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Create springs for smooth movement
    const smoothX = useSpring(0, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        smoothX.set(mousePosition.x);
        smoothY.set(mousePosition.y);
    }, [mousePosition, smoothX, smoothY]);

    return (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden select-none">
            {/* Layer 1: Deep Grid (Moves with mouse) */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%] opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"
                style={{
                    x: useTransform(smoothX, [-1, 1], [-20, 20]),
                    y: useTransform(smoothY, [-1, 1], [-20, 20]),
                }}
            />

            {/* Layer 2: Floating Coordinates (Moves opposite to mouse - Parallax) */}
            <motion.div
                className="absolute top-24 left-12 font-mono text-[10px] text-white/20"
                style={{
                    x: useTransform(smoothX, [-1, 1], [30, -30]),
                    y: useTransform(smoothY, [-1, 1], [30, -30]),
                }}
            >
                SYS.COORD // 04.99.12
                <br />
                SECTOR // NULL
            </motion.div>

            <motion.div
                className="absolute bottom-32 right-24 font-mono text-[10px] text-white/20 text-right"
                style={{
                    x: useTransform(smoothX, [-1, 1], [40, -40]),
                    y: useTransform(smoothY, [-1, 1], [40, -40]),
                }}
            >
                MEMORY_ALLOC :: 94%
                <br />
                RENDER_CYCLE :: ACTIVE
            </motion.div>

            {/* Layer 3: Crosshairs (Subtle movement) */}
            <motion.div
                className="absolute top-1/2 left-24 w-4 h-4 border border-white/10 flex items-center justify-center"
                style={{
                    x: useTransform(smoothX, [-1, 1], [15, -15]),
                    y: useTransform(smoothY, [-1, 1], [15, -15]),
                    rotate: useTransform(smoothX, [-1, 1], [-10, 10]),
                }}
            >
                <div className="w-[1px] h-full bg-white/10" />
                <div className="h-[1px] w-full bg-white/10 absolute" />
            </motion.div>

        </div>
    );
}
