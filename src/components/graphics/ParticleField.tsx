'use client';

import { useEffect, useRef } from 'react';

/**
 * PARTICLE FIELD — ULTRA-OPTIMIZED
 * 
 * Performance Optimizations:
 * - Reduced to 8 particles (was 30)
 * - 30fps throttling
 * - Ultra-simple rendering (no gradients)
 */

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();
    const lastFrameTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // ULTRA-REDUCED: 8 particles only
        const particleCount = 8;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: Math.random() * 0.2 + 0.05,
            opacity: Math.random() * 0.15 + 0.05,
        }));

        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime: number) => {
            const deltaTime = currentTime - lastFrameTimeRef.current;

            if (deltaTime < frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            lastFrameTimeRef.current = currentTime - (deltaTime % frameInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.y > canvas.height) {
                    particle.y = -10;
                    particle.x = Math.random() * canvas.width;
                }
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;

                // Ultra-simple rendering - no gradients
                ctx.globalAlpha = particle.opacity;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{
                mixBlendMode: 'screen',
                willChange: 'contents',
            }}
        />
    );
}
