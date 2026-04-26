'use client';

import { useEffect, useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';

interface Star {
    x: number; y: number;
    size: number; opacity: number; speed: number;
}

const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { state } = useMotion();
    const stateRef = useRef(state);
    stateRef.current = state;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const stars: Star[] = Array.from({ length: 220 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 1.4 + 0.2,
            opacity: Math.random() * 0.55 + 0.1,
            speed: Math.random() * 0.12 + 0.04,
        }));

        let last = 0;
        const FPS = 30;
        const interval = 1000 / FPS;
        let raf: number;

        const draw = (ts: number) => {
            raf = requestAnimationFrame(draw);
            if (ts - last < interval) return;
            last = ts;

            ctx.clearRect(0, 0, W, H);

            const vel = Math.abs(stateRef.current.scrollVelocity || 0);
            const warp = 1 + Math.min(vel * 4, 8);

            stars.forEach(s => {
                s.y += s.speed * warp;
                if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
                if (warp > 2) {
                    // Warp speed: draw as streaks
                    ctx.fillRect(s.x, s.y, s.size, s.speed * warp * 2);
                } else {
                    ctx.fillRect(s.x, s.y, s.size, s.size);
                }
            });
        };

        raf = requestAnimationFrame(draw);

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, []);

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
