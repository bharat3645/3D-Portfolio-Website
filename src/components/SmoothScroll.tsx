'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
}

/**
 * Smooth Scroll Provider - 404ghost style
 * Provides cinematic, weighted scrolling experience
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, // Very slow interpolation for 'heavy' feel
            duration: 1.5, // Long duration for cinematic ease
            wheelMultiplier: 1.2, // Slightly responsive to start, but heavy to stop
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
