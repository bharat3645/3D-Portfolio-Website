'use client';

import { useEffect, useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { detectQuality, prefersReducedMotion } from '@/hooks/useQuality';

interface Star {
    x: number; y: number;
    size: number; opacity: number; speed: number;
}

const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { state, subscribe } = useMotion();
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // DPR-scaled backing store so stars are crisp on HiDPI (were half-res upscaled).
        // W/H stay in CSS pixels so density + placement math is unchanged.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let W = window.innerWidth;
        let H = window.innerHeight;
        const sizeCanvas = () => {
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            // Assigning canvas.width resets the context transform — re-apply DPR scale.
            ctx.scale(dpr, dpr);
        };
        sizeCanvas();

        // Star density scales with device capability tier.
        const q = detectQuality();
        const mult = q === 'high' ? 1 : q === 'med' ? 0.6 : 0.4;
        const base = W < 768 ? 80 : W < 1280 ? 150 : 220;
        const starCount = Math.round(base * mult);
        const stars: Star[] = Array.from({ length: starCount }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 1.4 + 0.2,
            opacity: Math.random() * 0.55 + 0.1,
            speed: Math.random() * 0.12 + 0.04,
        }));

        const paint = (warp: number) => {
            ctx.clearRect(0, 0, W, H);
            stars.forEach(s => {
                s.y += s.speed * warp;
                if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                if (warp > 2) {
                    ctx.fillRect(s.x, s.y, s.size, s.speed * warp * 2); // warp streaks
                } else {
                    ctx.fillRect(s.x, s.y, s.size, s.size);
                }
            });
        };

        const onResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            sizeCanvas();
        };
        window.addEventListener('resize', onResize, { passive: true });

        // Reduced motion: paint a single static starfield, never animate.
        if (prefersReducedMotion()) {
            ctx.clearRect(0, 0, W, H);
            stars.forEach(s => {
                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                ctx.fillRect(s.x, s.y, s.size, s.size);
            });
            return () => window.removeEventListener('resize', onResize);
        }

        // Animate on the single shared rAF tick (24fps cap; skip while tab hidden).
        let last = 0;
        const FPS = 24;
        const interval = 1000 / FPS;
        const tick = (ts: number) => {
            if (document.hidden) return;
            if (ts - last < interval) return;
            last = ts;
            const vel = Math.abs(stateRef.current.scrollVelocity || 0);
            paint(1 + Math.min(vel * 4, 8));
        };
        const unsub = subscribe(tick);

        return () => {
            unsub();
            window.removeEventListener('resize', onResize);
        };
    }, [subscribe]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full absolute inset-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export const StarsCanvas = () => (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
        <StarField />
    </div>
);
