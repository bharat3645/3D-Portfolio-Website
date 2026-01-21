'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/hoc';
import { fadeIn } from '@/core/animation';

function Experience() {
    return (
        <div className="py-12 w-full">
            <motion.div variants={fadeIn("down", "tween", 0.1, 1)} className="mb-16">
                <p className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4">
                    Professional History
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary max-w-2xl">
                    Engineering Experience
                </h2>
            </motion.div>

            <div className="space-y-16 ml-3 md:ml-0 pl-8 md:pl-0">

                {/* Entry 1: Perplexity AI */}
                <ExperienceItem
                    role="Student Representative"
                    org="Perplexity AI"
                    date="Oct 2025 – Nov 2025"
                    type="Remote"
                    bullets={[
                        "Worked as a Student Partner focused on promoting AI-powered research tools.",
                        "Supported student engagement initiatives and awareness of advanced AI research workflows."
                    ]}
                    index={0}
                />

                {/* Entry 2: PGDAV */}
                <ExperienceItem
                    role="Summer Research Intern"
                    org="PGDAV College (University of Delhi)"
                    date="May 2024 – Aug 2024"
                    type="On-site"
                    bullets={[
                        "Conducted academic research in deep learning and computer vision.",
                        "Worked with CNN-based models and applied multi-criteria decision analysis for improved model evaluation.",
                        "Gained experience in research methodology, experimentation, and academic writing."
                    ]}
                    index={1}
                />

                {/* Entry 3: Avabodh */}
                <ExperienceItem
                    role="Student Intern"
                    org="Avabodh Foundation"
                    date="Jul 2024 – Oct 2024"
                    type="On-site"
                    bullets={[
                        "Contributed to CSR initiatives through survey research and community data collection.",
                        "Assisted in reporting and analysis for social impact programs."
                    ]}
                    index={2}
                />

            </div>
        </div>
    );
}

const ExperienceItem = ({ role, org, date, type, bullets, index }: { role: string, org: string, date: string, type: string, bullets: string[], index: number }) => (
    <motion.div
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        className="relative group"
    >
        {/* Timeline Dot */}
        <div className="absolute -left-[37px] md:-left-4 top-2 w-3 h-3 rounded-full bg-bg-void group-hover:bg-accent-primary transition-colors duration-300" />{/* Removed border for seamless look */}

        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
            <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                {role}
            </h3>
            <span className="hidden md:inline text-text-muted">·</span>
            <span className="font-mono text-sm text-text-secondary">{org}</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-text-muted mb-6 uppercase tracking-widest">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{type}</span>
        </div>

        <ul className="space-y-2 max-w-2xl">
            {bullets.map((txt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-white/10 rounded-full mt-1.5 flex-shrink-0" />
                    {txt}
                </li>
            ))}
        </ul>
    </motion.div>
);

export const ExperienceSection = SectionWrapper(Experience, "experience");
