'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/hoc';

function CurrentRole() {
    return (
        <div className="w-full py-12">{/* Removed bg-white/[0.01] for seamless experience */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Role & Org */}
                <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                        Web Developer Intern <span className="text-accent-primary">(AI/ML)</span>
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-accent-primary font-mono text-sm tracking-wide">
                            RNR Consulting Pvt. Ltd.
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-text-secondary font-mono text-xs">
                            Dec 2025 – Present
                        </span>
                    </div>
                </div>

                {/* Location */}
                <div className="hidden md:block text-right">
                    <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
                        New Delhi, India · On-site
                    </p>
                </div>

            </div>

            {/* Responsibilities */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="space-y-4">
                    <Bullet text="Working on backend-heavy web systems with emphasis on scalability, clean architecture, and long-term maintainability." />
                    <Bullet text="Integrating AI/ML capabilities into web applications, including data pipelines, inference workflows, and API-level intelligence." />
                    <Bullet text="Applying system design principles such as modular architecture, separation of concerns, and domain-oriented structure." />
                </div>
                <div className="space-y-4">
                    <Bullet text="Collaborating with senior engineers to translate business requirements into robust backend services and APIs." />
                    <Bullet text="Participating in code reviews, refactoring, and performance optimization with focus on sustainability." />
                    <Bullet text="Evaluating architectural trade-offs including monolith vs modular design, service boundaries, and infrastructure cost awareness." />
                </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 flex flex-wrap gap-3">
                {['Backend Engineering', 'System Design', 'AI/ML Integration', 'Scalable Web Architecture', 'Clean Code Practices'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-text-secondary font-mono">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

const Bullet = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3">
        <span className="text-accent-primary mt-1.5 text-[10px]">&gt;&gt;</span>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
            {text}
        </p>
    </div>
);

export const CurrentRoleSection = SectionWrapper(CurrentRole, "current-role");
