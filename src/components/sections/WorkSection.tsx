'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    link: string;
    role: string;
    problem: string;
    solution: string;
    tech: string;
    image?: string;
}

const projects: Project[] = [
    {
        id: '01',
        title: 'GhostSync',
        category: 'Distributed Systems',
        year: '2026',
        link: 'https://github.com/bharat3645/GhostSync',
        role: 'System Architect',
        problem: 'Real-time synchronization in distributed environments',
        solution: 'Built backend infrastructure for real-time data flow',
        tech: 'Node.js, gRPC, Event Streams',
    },
    {
        id: '02',
        title: 'PII Detection Engine',
        category: 'Machine Learning Systems',
        year: '2025',
        link: 'https://github.com/bharat3645',
        role: 'ML Engineer',
        problem: 'Detect sensitive PII in large datasets',
        solution: 'ML-driven detection engine for sensitive data',
        tech: 'Python, ML Models, Security',
    },
    {
        id: '03',
        title: 'Federated Learning',
        category: 'Federated ML',
        year: '2025',
        link: 'https://github.com/bharat3645',
        role: 'Researcher',
        problem: 'Anomaly detection without sharing raw data',
        solution: 'Federated learning pipeline (~91% accuracy)',
        tech: 'Federated ML, Privacy Architecture',
    },
    {
        id: '04',
        title: 'GigX',
        category: 'Web3 Application',
        year: '2024',
        link: 'https://github.com/bharat3645',
        role: 'Full Stack',
        problem: 'Centralized freelancing lacks transparency',
        solution: 'Ethereum-based marketplace with token task escrow',
        tech: 'Next.js, Solidity, Docker',
    },
    {
        id: '05',
        title: 'Assistive CV',
        category: 'AI for Accessibility',
        year: '2024',
        link: 'https://github.com/bharat3645',
        role: 'Computer Vision',
        problem: 'Real-time book text recognition for visually impaired',
        solution: 'OCR+TTS pipeline with OpenCV & PyTesseract',
        tech: 'Python, TTS, OpenCV',
    },
    {
        id: '06',
        title: 'DeepFake Detection',
        category: 'Computer Vision',
        year: '2024',
        link: 'https://github.com/bharat3645',
        role: 'Researcher',
        problem: 'Distinguishing authentic vs deep-fake media',
        solution: 'CNN + MCDM integration for accuracy improvement',
        tech: 'PyTorch, CNN, MCDM',
    }
];

export function WorkSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-32 px-6 md:px-12 w-full max-w-screen-2xl mx-auto relative group/section"
            id="work"
        >
            {/* Header: Subtle Fade & Platinum Gradient */}
            <div className="mb-24 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-4"
                >
                    <p className="font-mono text-xs text-[#E61E32] tracking-[0.3em] uppercase text-center font-bold">
                        Selected Works
                    </p>
                </motion.div>

                <div className="pb-4 -mb-4 px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="font-display text-5xl md:text-7xl font-bold tracking-tight text-center"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                            Engineering Impact
                        </span>
                    </motion.h2>
                </div>

                <div className="mt-6">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="text-neutral-400 max-w-2xl mx-auto text-lg font-light text-center"
                    >
                        Production-grade systems built to solve real problems
                    </motion.p>
                </div>
            </div>

            {/* Projects Grid */}
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

            {/* Bottom Line */}
            <motion.div
                className="mt-32 h-[1px] bg-white/10 w-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
        </section>
    );
}

function ProjectCard({ project, index, isInView }: {
    project: Project;
    index: number;
    isInView: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 1,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
            }}
            className="h-full"
        >
            <Link
                href={project.link}
                target="_blank"
                className="group relative block h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* 
                   Card Container - Dark Glass + CRIMSON Interaction 
                   Border: White/5 -> Crimson/50
                   Shadow: None -> Crimson Glow
                */}
                <div className={`
                    relative h-full min-h-[400px] bg-[#0A0A0A] 
                    border transition-all duration-500 flex flex-col justify-between p-8 md:p-10
                    ${isHovered
                        ? 'border-[#E61E32]/50 bg-[#0F0F0F] shadow-[0_0_30px_-10px_rgba(230,30,50,0.3)]'
                        : 'border-white/5 shadow-none'}
                `}>

                    {/* Top Row: Meta */}
                    <div className="flex justify-between items-start mb-12">
                        <div className="flex flex-col gap-1">
                            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}>
                                {project.id} / {project.category}
                            </span>
                            <span className="font-mono text-[10px] text-neutral-600">
                                {project.year}
                            </span>
                        </div>

                        {/* Status Light - Crimson when active */}
                        <div
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                            ${isHovered ? 'bg-[#E61E32] shadow-[0_0_10px_#E61E32]' : 'bg-white/10'}`}
                        />
                    </div>

                    {/* Middle: Title & Tech */}
                    <div className="relative z-10">
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-neutral-200 mb-2 group-hover:text-white transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="font-mono text-xs text-neutral-500 mb-6 group-hover:text-neutral-400 transition-colors">
                            {project.tech}
                        </p>

                        {/* Description - Reveal on Hover */}
                        <div className="overflow-hidden relative">
                            <motion.div
                                animate={{
                                    height: isHovered ? 'auto' : '0px',
                                    opacity: isHovered ? 1 : 0,
                                    marginBottom: isHovered ? '24px' : '0px'
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
                    <div className={`
                        mt-auto pt-6 border-t flex justify-between items-end transition-colors duration-500
                        ${isHovered ? 'border-[#E61E32]/20' : 'border-white/5'}
                    `}>
                        <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}>
                            View Project
                        </span>
                        <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg
                                width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                                className={`transition-colors duration-300 ${isHovered ? 'text-[#E61E32]' : 'text-neutral-500'}`}
                            >
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
                            </svg>
                        </motion.div>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
