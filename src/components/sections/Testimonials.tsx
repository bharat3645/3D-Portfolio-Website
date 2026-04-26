'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal, WordReveal } from '@/components/ui/TextReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Real verified records ────────────────────────────────────────────────────
const records = [
    {
        id: '01',
        org: 'Perplexity AI',
        role: 'Campus Student Partner',
        year: '2025',
        tag: 'AFFILIATION',
        metric: null,
        accent: '#E61E32',
    },
    {
        id: '02',
        org: 'Smart India Hackathon',
        role: 'National Winner — AI/ML Track',
        year: '2024',
        tag: 'WINNER',
        metric: '#1',
        accent: '#E61E32',
    },
    {
        id: '03',
        org: 'PGDAV College · Univ. of Delhi',
        role: 'Summer Research Intern — Deepfake Detection',
        year: '2024',
        tag: 'RESEARCH',
        metric: '95%',
        accent: '#06B6D4',
    },
    {
        id: '04',
        org: 'SCOPUS',
        role: '5 Indexed Publications · 2 Book Chapters',
        year: '2024–25',
        tag: 'PUBLISHED',
        metric: '5×',
        accent: '#E61E32',
    },
    {
        id: '05',
        org: 'CSI Student Chapter · SIT Nagpur',
        role: 'Chairperson — Led 15+ core members',
        year: '2024–25',
        tag: 'LEADERSHIP',
        metric: null,
        accent: '#06B6D4',
    },
    {
        id: '06',
        org: 'SITNovate 24H Hackathon',
        role: 'Organizer — 100+ Participants',
        year: 'Feb 2025',
        tag: 'ORGANIZED',
        metric: '100+',
        accent: '#E61E32',
    },
    {
        id: '07',
        org: 'IEEE Student Chapter',
        role: 'Core Member · AI/ML Workshops',
        year: '2023–24',
        tag: 'MEMBER',
        metric: null,
        accent: '#06B6D4',
    },
    {
        id: '08',
        org: 'GirlScript Summer of Code',
        role: 'Open Source Contributor',
        year: '2024',
        tag: 'OSS',
        metric: null,
        accent: '#E61E32',
    },
];

// ─── Key proof numbers (real data) ───────────────────────────────────────────
const proofNumbers = [
    { value: '52',   label: 'GitHub Repositories',       sub: 'Pull Shark badge earned'          },
    { value: '95%',  label: 'Deepfake Detection Acc.',   sub: 'CNN + MCDM · PGDAV Delhi'         },
    { value: '91%',  label: 'Fraud Detection Accuracy',  sub: 'Federated Learning · FedML'       },
    { value: '30%',  label: 'Traffic Wait Reduction',    sub: 'YOLO + AWS IoT · Smart City'      },
];

function RecordRow({ record, index }: { record: typeof records[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.07, ease: EASE }}
            className="record-row group"
            data-cursor="hover"
        >
            <span className="record-id font-mono text-[10px] text-white/20">[{record.id}]</span>

            <div className="record-body">
                <span className="record-org font-mono text-[11px] tracking-widest text-white/70 group-hover:text-white transition-colors duration-300">
                    {record.org}
                </span>
                <span className="record-role text-white/35 text-xs font-light">
                    {record.role}
                </span>
            </div>

            <div className="record-right">
                {record.metric && (
                    <span className="record-metric font-display font-bold text-lg" style={{ color: record.accent }}>
                        {record.metric}
                    </span>
                )}
                <span
                    className="record-tag font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 border rounded-full"
                    style={{ color: record.accent, borderColor: `${record.accent}30` }}
                >
                    {record.tag}
                </span>
                <span className="record-year font-mono text-[9px] text-white/20 hidden md:block">
                    {record.year}
                </span>
            </div>
        </motion.div>
    );
}

export function TestimonialsSection() {
    const numbersRef = useRef<HTMLDivElement>(null);
    const numbersInView = useInView(numbersRef, { once: true, margin: '-80px' });

    return (
        <section className="py-24 px-6 relative z-10 overflow-hidden" id="testimonials">
            <div className="max-w-5xl mx-auto">

                {/* Heading */}
                <div className="mb-16 text-center">
                    <div style={{ overflow: 'hidden', display: 'inline-block' }} className="mb-5">
                        <TextReveal>
                            <p className="font-mono text-[10px] text-[#E61E32] tracking-[0.35em] uppercase">
                                Proof of Work
                            </p>
                        </TextReveal>
                    </div>
                    <WordReveal
                        text="Verified. Indexed. Real."
                        className="justify-center"
                        wordClass="font-display text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 tracking-tight pb-2"
                        stagger={0.1}
                        delay={0.1}
                    />
                    <div style={{ overflow: 'hidden' }} className="mt-5">
                        <TextReveal delay={0.35}>
                            <p className="text-neutral-500 text-sm font-mono tracking-wider max-w-xl mx-auto">
                                Every entry below is a real affiliation, real win, or real publication — no placeholders.
                            </p>
                        </TextReveal>
                    </div>
                </div>

                {/* Record log */}
                <div className="record-log mb-20">
                    <div className="record-log-header font-mono text-[9px] text-white/20 tracking-widest uppercase flex justify-between px-4 pb-3 border-b border-white/5">
                        <span>ID · Organization</span>
                        <span>Status · Year</span>
                    </div>
                    {records.map((r, i) => (
                        <RecordRow key={r.id} record={r} index={i} />
                    ))}
                </div>

                {/* Real proof numbers */}
                <div ref={numbersRef} className="proof-numbers-grid">
                    {proofNumbers.map((n, i) => (
                        <motion.div
                            key={n.label}
                            initial={{ opacity: 0, y: 24 }}
                            animate={numbersInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                            className="proof-number-card"
                            data-cursor="hover"
                        >
                            <span className="proof-number-value">{n.value}</span>
                            <span className="proof-number-label">{n.label}</span>
                            <span className="proof-number-sub">{n.sub}</span>
                        </motion.div>
                    ))}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="https://github.com/bharat3645"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="cta"
                        data-cursor-label="CODE"
                        className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors duration-300 group"
                    >
                        <span className="w-8 h-px bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
                        52 repos · Pull Shark · github.com/bharat3645
                        <span className="w-8 h-px bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
