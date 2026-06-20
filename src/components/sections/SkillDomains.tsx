'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper } from '@/components/hoc';

const EASE = [0.16, 1, 0.3, 1] as const;

const domains = [
    {
        title: "GenAI & Intelligent Systems",
        activity: ["Development of RAG, GraphRAG pipelines", "Agentic AI workflows", "Knowledge graph integration"],
        tech: ["LangChain", "LangGraph", "VectorDB", "OpenAI / Gemini APIs", "Neo4j"]
    },
    {
        title: "Machine Learning & Deep Learning",
        activity: ["Computer vision models", "Anomaly & security detection", "Federated learning systems"],
        tech: ["PyTorch", "TensorFlow", "Keras", "YOLOv8", "CNNs", "NLP"]
    },
    {
        title: "Backend & Distributed Systems",
        activity: ["Scalable APIs", "Microservices", "Real-time communication"],
        tech: ["Node.js", "FastAPI", "Go", "Docker", "Kubernetes", "gRPC"]
    },
    {
        title: "Full-Stack Engineering",
        activity: ["Frontend & backend integration", "Design + engineering workflows"],
        tech: ["React", "Next.js", "Tailwind", "TypeScript", "Web3 / Ethereum", "Solidity"]
    }
];

function DomainCard({ domain, index, inView }: { domain: typeof domains[0]; index: number; inView: boolean }) {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // RAF-driven tilt + cursor-follow shine — zero React state on mouse move.
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!outerRef.current || !innerRef.current) return;
            const r = outerRef.current.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            const rx = (y - 0.5) * -6;
            const ry = (x - 0.5) * 6;
            innerRef.current.style.transform =
                `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            if (shineRef.current) {
                shineRef.current.style.background =
                    `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(230,30,50,0.10) 0%, transparent 60%)`;
            }
        });
    };

    const onMouseEnter = () => {
        if (releaseTimer.current) clearTimeout(releaseTimer.current);
        if (innerRef.current) {
            innerRef.current.style.willChange = 'transform';
            innerRef.current.style.transition = 'transform 0.15s ease-out';
        }
    };

    const onMouseLeave = () => {
        cancelAnimationFrame(rafRef.current);
        if (innerRef.current) {
            innerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            innerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25,1,0.5,1)';
            if (releaseTimer.current) clearTimeout(releaseTimer.current);
            releaseTimer.current = setTimeout(() => {
                if (innerRef.current) innerRef.current.style.willChange = 'auto';
            }, 650);
        }
        if (shineRef.current) shineRef.current.style.background = 'none';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
            ref={outerRef}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-cursor="hover"
        >
            <div
                ref={innerRef}
                className="group relative border border-white/5 bg-white/[0.02] p-8 md:p-10 rounded-sm hover:border-accent-primary/30 transition-colors duration-500 overflow-hidden h-full"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
                    backfaceVisibility: 'hidden',
                }}
            >
                {/* RAF-controlled cursor shine */}
                <div ref={shineRef} className="absolute inset-0 pointer-events-none z-0" />

                <h3 className="relative z-10 font-display text-xl md:text-2xl font-bold text-text-primary mb-6 group-hover:text-accent-primary transition-colors">
                    {domain.title}
                </h3>

                <div className="relative z-10 mb-8">
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">Focus Areas</p>
                    <ul className="space-y-2">
                        {domain.activity.map((act, i) => (
                            <li key={i} className="text-sm text-text-secondary leading-relaxed flex items-start gap-2">
                                <span className="text-accent-primary/40 mt-1.5 text-[10px]">&gt;</span>
                                {act}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative z-10">
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">Core Stack</p>
                    <div className="flex flex-wrap gap-2">
                        {domain.tech.map((t, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded-sm text-xs text-text-secondary font-mono group-hover:border-white/10 transition-colors">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function Domains() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div ref={ref} className="py-12 w-full">
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: EASE }}
                className="mb-16"
            >
                <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4">
                    Technical Architecture
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary max-w-2xl">
                    Breadth with structure.
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                {domains.map((domain, index) => (
                    <DomainCard key={index} domain={domain} index={index} inView={inView} />
                ))}
            </div>
        </div>
    );
}

export const SkillDomains = SectionWrapper(Domains, "skills");
