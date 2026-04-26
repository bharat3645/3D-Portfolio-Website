'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';
import { SectionHeading } from '@/components/ui/TextReveal';

interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    link: string;
    problem: string;
    solution: string;
    tech: string;
    image?: string;
}

const projects: Project[] = portfolioData.featuredProjects.map(p => ({
    id: p.id,
    title: p.title,
    category: p.tagline,
    year: p.period.split(' ').at(-1) ?? '',
    link: `/work/${p.id}`,
    problem: p.problem,
    solution: p.solution,
    tech: p.techStack.slice(0, 3).join(', '),
    image: p.image,
}));

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="py-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto relative"
            id="work"
        >
            <SectionHeading
                label="Selected Works"
                heading="Engineering Impact"
                subtext="Production-grade systems built to solve real problems"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isInView={isInView}
                    />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project, index, isInView }: {
    project: Project;
    index: number;
    isInView: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [shine, setShine] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
        setShine({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setShine({ x: 50, y: 50 });
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1200px' }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                data-cursor="view"
                data-cursor-label="VIEW"
                style={{
                    transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered
                        ? 'transform 0.15s ease-out'
                        : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    transformStyle: 'preserve-3d',
                }}
            >
                <Link
                    href={project.link}
                    className="group relative block h-full"
                    tabIndex={0}
                    aria-label={`View ${project.title} project`}
                >
                    <div className={`
                        relative min-h-[400px] h-full bg-transparent
                        flex flex-col justify-between p-8 md:p-10
                        transition-all duration-500 overflow-hidden
                        ${isHovered ? 'bg-[#0A0A0A]/40 shadow-[0_30px_80px_-20px_rgba(230,30,50,0.18)]' : ''}
                    `}>
                        {/* Shine overlay */}
                        {isHovered && (
                            <div
                                className="absolute inset-0 pointer-events-none z-0"
                                style={{
                                    background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.06) 0%, transparent 65%)`,
                                }}
                            />
                        )}

                        {/* Project image: top-right floating preview */}
                        {project.image && (
                            <div
                                className="absolute top-4 right-4 w-24 h-16 rounded overflow-hidden z-10"
                                style={{
                                    opacity: isHovered ? 1 : 0,
                                    transform: `scale(${isHovered ? 1 : 0.8}) translateZ(20px)`,
                                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                                }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />
                            </div>
                        )}

                        {/* Top Row: Meta */}
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="flex flex-col gap-1">
                                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}>
                                    {String(index + 1).padStart(2, '0')} / {project.category}
                                </span>
                                <span className="font-mono text-[10px] text-neutral-600">
                                    {project.year}
                                </span>
                            </div>
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-[#E61E32] shadow-[0_0_10px_#E61E32]' : 'bg-white/10'}`} />
                        </div>

                        {/* Middle: Title + Tech */}
                        <div className="relative z-10">
                            <h3 className="font-display text-3xl md:text-4xl font-bold text-neutral-200 mb-2 group-hover:text-white transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="font-mono text-xs text-neutral-500 mb-6 group-hover:text-neutral-400 transition-colors">
                                {project.tech}
                            </p>

                            <div className="overflow-hidden">
                                <motion.div
                                    animate={{
                                        height: isHovered ? 'auto' : 0,
                                        opacity: isHovered ? 1 : 0,
                                        marginBottom: isHovered ? 24 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-md">
                                        <span className="text-white block mb-1">Problem:</span> {project.problem}
                                        <br /><br />
                                        <span className="text-white block mb-1">Solution:</span> {project.solution}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom: Action */}
                        <div className="mt-auto pt-6 flex justify-between items-end relative z-10">
                            <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}>
                                View Project
                            </span>
                            <motion.svg
                                animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
                                transition={{ duration: 0.2 }}
                                width="12" height="12" viewBox="0 0 12 12" fill="none"
                                className={`transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}
                            >
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
                            </motion.svg>
                        </div>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}
