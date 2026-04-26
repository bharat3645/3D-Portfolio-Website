'use client';

import { useEffect, useRef } from 'react';

interface Node {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    phase: number;
    baseOpacity: number;
}

export function NeuralCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const COUNT = 55;
        const MAX_DIST = 160;
        const CRIMSON = { r: 230, g: 30, b: 50 };

        const nodes: Node[] = Array.from({ length: COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.8 + 0.6,
            phase: Math.random() * Math.PI * 2,
            baseOpacity: Math.random() * 0.4 + 0.15,
        }));

        let last = 0;
        const FPS = 28;
        const interval = 1000 / FPS;
        let raf: number;

        const draw = (ts: number) => {
            raf = requestAnimationFrame(draw);
            if (ts - last < interval) return;
            last = ts;

            ctx.clearRect(0, 0, W, H);

            // Update positions
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
                n.phase += 0.018;
            });

            // Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist >= MAX_DIST) continue;
                    const alpha = ((1 - dist / MAX_DIST) ** 1.5) * 0.18;
                    ctx.strokeStyle = `rgba(${CRIMSON.r},${CRIMSON.g},${CRIMSON.b},${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }

            // Nodes
            nodes.forEach(n => {
                const pulse = 0.5 + 0.5 * Math.sin(n.phase);
                const opacity = n.baseOpacity * (0.75 + pulse * 0.25);
                const radius = n.r * (1 + pulse * 0.25);

                // Core dot
                ctx.fillStyle = `rgba(${CRIMSON.r},${CRIMSON.g},${CRIMSON.b},${opacity})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Soft halo
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 5);
                grad.addColorStop(0, `rgba(${CRIMSON.r},${CRIMSON.g},${CRIMSON.b},${opacity * 0.25})`);
                grad.addColorStop(1, `rgba(${CRIMSON.r},${CRIMSON.g},${CRIMSON.b},0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(n.x, n.y, radius * 5, 0, Math.PI * 2);
                ctx.fill();
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
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.65, mixBlendMode: 'screen' }}
            aria-hidden="true"
        />
    );
}
