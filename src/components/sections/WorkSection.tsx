'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/TextReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

const projects = portfolioData.featuredProjects.map((p, i) => ({
    id: p.id,
    index: i,
    title: p.title,
    category: p.tagline,
    year: p.period.split(' ').at(-1) ?? '',
    link: `/work/${p.id}`,
    problem: p.problem,
    solution: p.solution,
    tech: p.techStack.slice(0, 3).join(', '),
    image: p.image,
    impact: p.impact[0] ?? '',
}));

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            id="work"
            className="py-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto relative"
        >
            {/* Decorative bg text */}
            <div
                className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <span
                    className="font-display font-black text-[20vw] text-white/[0.022] tracking-tighter select-none leading-none"
                    // @ts-ignore
                    string="parallax"
                    string-speed="-0.07"
                >
                    WORK
                </span>
            </div>

            <div className="relative z-10">
                <SectionHeading
                    label="Selected Works"
                    heading="Engineering Impact"
                    subtext="Production-grade systems built to solve real problems"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    index,
    isInView,
}: {
    project: typeof projects[0];
    index: number;
    isInView: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const rafRef = useRef<number>(0);

    // RAF-based tilt & shine — zero state updates on mouse move
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!cardRef.current || !innerRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rx = (y - 0.5) * -10;
            const ry = (x - 0.5) * 10;
            innerRef.current.style.transform =
                `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            if (shineRef.current) {
                shineRef.current.style.background =
                    `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.055) 0%, transparent 65%)`;
            }
        });
    };

    const wcTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onMouseLeave = () => {
        cancelAnimationFrame(rafRef.current);
        setHovered(false);
        if (innerRef.current) {
            innerRef.current.style.transform =
                'perspective(1200px) rotateX(0deg) rotateY(0deg)';
            innerRef.current.style.transition =
                'transform 0.6s cubic-bezier(0.25,1,0.5,1)';
            // Release the GPU layer once the tilt-settle transition is done
            if (wcTimer.current) clearTimeout(wcTimer.current);
            wcTimer.current = setTimeout(() => {
                if (innerRef.current) innerRef.current.style.willChange = 'auto';
            }, 650);
        }
        if (shineRef.current) shineRef.current.style.background = 'none';
    };

    const onMouseEnter = () => {
        setHovered(true);
        if (innerRef.current) {
            if (wcTimer.current) clearTimeout(wcTimer.current);
            // Promote just-in-time — only the card being tilted gets a layer
            innerRef.current.style.willChange = 'transform';
            innerRef.current.style.transition = 'transform 0.15s ease-out';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.08, ease: EASE }}
        >
            <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                data-cursor="view"
                data-cursor-label="OPEN"
            >
                <Link
                    href={project.link}
                    className="group relative block"
                    aria-label={`View ${project.title} project`}
                >
                    {/* RAF-controlled inner — no React state on move */}
                    <div
                        ref={innerRef}
                        className="work-card-inner"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
                            transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
                        }}
                    >
                    <div className={`
                        relative min-h-[400px] h-full
                        flex flex-col justify-between p-8 md:p-10
                        overflow-hidden border border-white/[0.05]
                        transition-colors duration-500
                        ${hovered
                            ? 'bg-[#0A0A0A]/60 border-[#E61E32]/20'
                            : 'bg-[#080808]/80'}
                    `}>
                        {/* Full-bleed image — Ken-Burns surge on hover. The image
                            scales/brightens; the gradient stays put so text stays legible. */}
                        {project.image && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        opacity: hovered ? 0.34 : 0.05,
                                        transform: hovered ? 'scale(1.08)' : 'scale(1)',
                                        transition: 'opacity 1.1s ease-out, transform 1.1s ease-out',
                                    }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]/40" />
                            </div>
                        )}

                        {/* Ghost index numeral — depth layer behind content */}
                        <span
                            aria-hidden="true"
                            className="absolute top-2 right-4 font-display font-black leading-none select-none pointer-events-none z-0 transition-colors duration-500"
                            style={{
                                fontSize: '8rem',
                                color: hovered ? 'rgba(230,30,50,0.05)' : 'rgba(255,255,255,0.022)',
                            }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* RAF-controlled shine */}
                        <div ref={shineRef} className="absolute inset-0 pointer-events-none z-0" />

                        {/* Top row */}
                        <div className="flex justify-between items-start relative z-10 mb-12">
                            <div className="flex flex-col gap-1">
                                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${hovered ? 'text-[#E61E32]' : 'text-neutral-600'}`}>
                                    {String(index + 1).padStart(2, '0')} / {project.category}
                                </span>
                                <span className="font-mono text-[10px] text-neutral-700">
                                    {project.year}
                                </span>
                            </div>
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hovered ? 'bg-[#E61E32] shadow-[0_0_10px_#E61E32]' : 'bg-white/10'}`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div style={{ overflow: 'hidden' }} className="mb-2">
                                <motion.h3
                                    initial={{ y: '110%' }}
                                    animate={isInView ? { y: 0 } : {}}
                                    transition={{ duration: 0.8, delay: index * 0.08 + 0.2, ease: EASE }}
                                    className="font-display text-3xl md:text-4xl font-bold text-neutral-200 group-hover:text-white transition-colors duration-300 tracking-tight"
                                >
                                    {project.title}
                                </motion.h3>
                            </div>

                            <p className="font-mono text-xs text-neutral-600 mb-5 group-hover:text-neutral-500 transition-colors">
                                {project.tech}
                            </p>

                            {/* Impact badge */}
                            {project.impact && (
                                <div
                                    className="mb-5 overflow-hidden"
                                    style={{
                                        maxHeight: hovered ? '60px' : '0',
                                        opacity: hovered ? 1 : 0,
                                        transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                                    }}
                                >
                                    <p className="text-xs text-[#E61E32]/70 font-mono tracking-wide">
                                        ↗ {project.impact}
                                    </p>
                                </div>
                            )}

                            {/* Problem/solution */}
                            <div
                                style={{
                                    maxHeight: hovered ? '120px' : '0',
                                    opacity: hovered ? 1 : 0,
                                    overflow: 'hidden',
                                    transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
                                }}
                            >
                                <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-md mb-4">
                                    {project.solution}
                                </p>
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-auto pt-5 flex justify-between items-end relative z-10 border-t border-white/[0.04]">
                            <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${hovered ? 'text-[#E61E32]' : 'text-neutral-600'}`}>
                                View Project
                            </span>
                            <motion.svg
                                animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
                                transition={{ duration: 0.2 }}
                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                                className={`transition-colors duration-300 ${hovered ? 'text-[#E61E32]' : 'text-neutral-600'}`}
                            >
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
                            </motion.svg>
                        </div>

                        {/* Bottom sweep line */}
                        <div
                            className="absolute bottom-0 left-0 h-[1px] bg-[#E61E32]"
                            style={{
                                width: hovered ? '100%' : '0%',
                                transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                            }}
                        />
                    </div>
                    </div>{/* end innerRef */}
                </Link>
            </div>
        </motion.div>
    );
}
