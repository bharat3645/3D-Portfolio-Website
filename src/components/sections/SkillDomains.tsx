'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/hoc';
import { fadeIn } from '@/core/animation';

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

function Domains() {
    return (
        <div className="py-12 w-full">
            <motion.div variants={fadeIn("down", "tween", 0.1, 1)} className="mb-16">
                <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4">
                    Technical Architecture
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary max-w-2xl">
                    Breadth with structure.
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                {domains.map((domain, index) => (
                    <motion.div
                        key={index}
                        variants={fadeIn("right", "spring", index * 0.2, 0.75)}
                        className="group relative border border-white/5 bg-white/[0.02] p-8 md:p-10 rounded-sm hover:border-accent-primary/30 transition-colors duration-500 overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export const SkillDomains = SectionWrapper(Domains, "skills");
