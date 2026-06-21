'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

/** Cursor-reactive 3D tilt photo — RAF-driven, zero React state on move. */
function IdentityPhoto() {
    const outerRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!outerRef.current || !tiltRef.current) return;
            const r = outerRef.current.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            tiltRef.current.style.transform =
                `perspective(1100px) rotateX(${(y - 0.5) * -7}deg) rotateY(${(x - 0.5) * 7}deg) scale(1.02)`;
        });
    };

    const onEnter = () => {
        if (tiltRef.current) tiltRef.current.style.transition = 'transform 0.18s ease-out';
    };
    const onLeave = () => {
        cancelAnimationFrame(rafRef.current);
        if (tiltRef.current) {
            tiltRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
            tiltRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            ref={outerRef}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative w-full max-w-md aspect-[3/4] group"
            data-cursor="view"
            data-cursor-label="HELLO"
        >
            <div
                ref={tiltRef}
                className="relative w-full h-full rounded-sm overflow-hidden"
                style={{ transform: 'perspective(1100px)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', backfaceVisibility: 'hidden' }}
            >
                <Image
                    src="/Photo.jpeg"
                    alt="Bharat Singh Parihar"
                    fill
                    sizes="(max-width: 768px) 100vw, 28rem"
                    className="object-cover grayscale contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 pointer-events-none" />
                {/* Crimson edge that catches on tilt */}
                <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-white/0 group-hover:ring-accent-primary/20 transition-all duration-500 pointer-events-none" />
            </div>
        </motion.div>
    );
}

export function IdentitySection() {
    return (
        <section className="py-16 md:py-20 px-6 md:px-12 relative flex items-center">

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Column 1: Philosophy Text (Left) */}
                <div className="order-2 md:order-1 relative z-10">

                    {/* Name-anchored eyebrow — gives answer engines a clean, crawlable
                        "X is a ..." entity statement, and reads as professional. */}
                    <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-accent-primary mb-5">
                        Bharat Singh Parihar
                        <span className="text-white/25 mx-2">—</span>
                        <span className="text-white/50">AI Systems Engineer</span>
                    </p>

                    {/* Subtle Fade for Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                            I don’t just write code.
                        </span>
                        <br />
                        <span className="text-neutral-500">
                            I engineer systems.
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="max-w-xl text-base md:text-lg text-neutral-400 leading-relaxed font-body font-light text-justify"
                    >
                        My work sits at the intersection of artificial intelligence, distributed systems, and product-grade engineering.
                        I focus on building systems that are <span className="text-white">production-ready</span>, <span className="text-white">research-grounded</span>, and architecturally sound.
                    </motion.div>

                    {/* Removed decorative line for seamless look */}
                </div>

                {/* Column 2: Photo Identity (Right) — cursor-reactive 3D tilt */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                    <IdentityPhoto />
                </div>

            </div>

            {/* Ambient Label */}
            <div className="absolute left-6 bottom-12 hidden md:block">
                <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
                    Based in India · Available Worldwide
                </span>
            </div>

        </section>
    );
}
