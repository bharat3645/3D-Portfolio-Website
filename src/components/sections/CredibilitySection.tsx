'use client';

import { SectionWrapper } from '@/components/hoc';

function Credibility() {
    return (
        <div className="py-12 w-full">

            {/* 1. Leadership & Community */}
            <div className="mb-24">
                <SectionLabel>Leadership & Community</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RoleCard
                        role="Chairperson"
                        org="CSI Student Chapter (SIT, Nagpur)"
                        date="Dec 2024 – Jul 2025"
                        desc="Led the CSI Student Chapter with focus on innovation, collaboration, and technical skill development. Organized technical events, workshops, and hackathons."
                    />
                    <RoleCard
                        role="Vice Chair"
                        org="CSI Student Chapter (SIT, Nagpur)"
                        date="Jul 2024 – Nov 2024"
                        desc="Supported chapter leadership through coordination, event execution, and student engagement."
                    />
                    <RoleCard
                        role="Core Member"
                        org="IEEE Student Chapter"
                        date="Jun 2023 – May 2024"
                        desc="Contributed to technical initiatives, workshops, and collaborative learning activities."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Left Col: Education & Research */}
                <div className="space-y-16">
                    {/* Education */}
                    <div>
                        <SectionLabel>Education</SectionLabel>
                        <div className="pl-4 space-y-8">{/* Removed border for seamless look */}
                            <div>
                                <h4 className="font-display text-xl font-bold text-text-primary">B.Tech (Hons.) in CSE — Data Science</h4>
                                <p className="text-sm text-text-secondary mt-1">Symbiosis Institute of Technology, Nagpur</p>
                                <p className="font-mono text-xs text-text-muted mt-2">Aug 2022 – Present</p>
                            </div>
                        </div>
                    </div>

                    {/* Research */}
                    <div>
                        <SectionLabel>Research & Publications</SectionLabel>
                        <div className="mb-6">
                            <h4 className="text-lg text-text-primary font-display font-medium">5 SCOPUS Publications • 2 Book Chapters</h4>
                            <p className="text-xs text-text-muted mt-2 uppercase tracking-wide">Topics: Computer Vision, AI Research, Security, Federated Systems</p>
                        </div>
                        <ul className="space-y-3 pl-4">{/* Removed border for seamless look */}
                            <ListItem text="Publication 1 — IEEE ICISCT 2024 (SCOPUS)" />
                            <ListItem text="Publication 2 — IEEE ICISCT 2024 (SCOPUS)" />
                            <ListItem text="Publication 3 — IEEE ICIPCT 2025 (SCOPUS)" />
                            <ListItem text="Book Chapter — Industry 4.0 Federated Learning (2025)" />
                            <ListItem text="Book Chapter — AI Forecasting for Renewable Energy (2025)" />
                        </ul>
                    </div>

                    {/* Awards */}
                    <div>
                        <SectionLabel>Awards & Recognition</SectionLabel>
                        <ul className="space-y-3 pl-4 border-l border-white/10">
                            <ListItem text="Winner — GDSC Hackathon (2023)" />
                            <ListItem text="3rd Place — IEEE Research Hackathon (2023)" />
                            <ListItem text="4th Place — CyberHack Maha (2023)" />
                        </ul>
                    </div>
                </div>

                {/* Right Col: CERTIFICATIONS (2-TIER SYSTEM) */}
                <div>
                    <SectionLabel>Certifications & Credentials</SectionLabel>

                    {/* TIER 1: PRIMARY / ENTERPRISE CERTIFICATIONS */}
                    <div className="mb-12 pb-8">{/* Removed border for seamless look */}
                        <h4 className="font-mono text-xs text-accent-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-3 h-3 bg-accent-primary/30 rounded-sm"></span>
                            Enterprise Certifications
                        </h4>
                        <div className="space-y-6 pl-4">{/* Removed border for seamless look */}

                            {/* ServiceNow CAD */}
                            <div className="group">
                                <h5 className="text-text-primary font-display font-semibold text-base leading-tight group-hover:text-accent-primary transition-colors">
                                    ServiceNow Certified Application Developer (CAD)
                                </h5>
                                <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-xs text-text-secondary">
                                        <span className="font-mono text-text-muted">Issued:</span> May 2025
                                    </p>
                                    <p className="text-xs text-text-secondary font-mono">
                                        <span className="text-text-muted">Credential ID:</span> 27153923
                                    </p>
                                </div>
                            </div>

                            {/* ServiceNow CSA */}
                            <div className="group">
                                <h5 className="text-text-primary font-display font-semibold text-base leading-tight group-hover:text-accent-primary transition-colors">
                                    ServiceNow Certified System Administrator (CSA)
                                </h5>
                                <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-xs text-text-secondary">
                                        <span className="font-mono text-text-muted">Issued:</span> April 2025
                                    </p>
                                    <p className="text-xs text-text-secondary font-mono">
                                        <span className="text-text-muted">Credential ID:</span> 27027635
                                    </p>
                                </div>
                            </div>

                            {/* Red Hat */}
                            <div className="group">
                                <h5 className="text-text-primary font-display font-semibold text-base leading-tight group-hover:text-accent-primary transition-colors">
                                    Red Hat System Administration I (RHSA I)
                                </h5>
                                <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-xs text-text-secondary">
                                        <span className="font-mono text-text-muted">Issued:</span> April 2024
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* TIER 2: SUPPORTING TECHNICAL CERTIFICATIONS */}
                    <div className="space-y-8 pl-4">{/* Removed border for seamless look */}

                        <CertGroup title="AI / ML & Accelerated Computing">
                            <ListItem text="NVIDIA — Fundamentals of Deep Learning (Dec 2023)" />
                            <ListItem text="NVIDIA — Fundamentals of Accelerated Computing with CUDA (Dec 2023)" />
                            <ListItem text="NVIDIA — Accelerating CUDA C Applications with Multiple GPUs (Apr 2024)" />
                        </CertGroup>

                        <CertGroup title="Cloud, Data & Infrastructure">
                            <ListItem text="Google Cloud Computing Foundations (Jul 2024)" />
                            <ListItem text="Google — Manage Kubernetes in Google Cloud (Jul 2024)" />
                            <ListItem text="Google — Cloud Data Engineer Path (Nov 2023)" />
                            <ListItem text="Infosys Springboard — Big Data 201 (Apache Spark, Hive)" />
                        </CertGroup>

                        <CertGroup title="Core Engineering Foundations">
                            <ListItem text="Oracle Database Foundations (Aug 2024)" />
                            <ListItem text="Oracle Java Fundamentals (Aug 2024)" />
                            <ListItem text="HackerRank SQL (Advanced)" />
                            <ListItem text="HackerRank Software Engineer Intern Certificate" />
                        </CertGroup>

                        {/* Additional Badges Summary */}
                        <div className="pt-4">{/* Removed border for seamless look */}
                            <p className="text-xs text-text-muted italic">
                                + Additional Google Cloud & ML Skill Badges (2023–2024)
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

const RoleCard = ({ role, org, date, desc }: { role: string, org: string, date: string, desc: string }) => (
    <div className="p-6 rounded-sm transition-colors">{/* Removed bg and border for seamless look */}
        <h4 className="text-text-primary font-display font-medium text-lg leading-tight mb-2">{role}</h4>
        <p className="text-xs font-mono text-accent-primary mb-4">{org}</p>
        <p className="text-xs text-text-muted mb-4 font-mono">{date}</p>
        <p className="text-sm text-text-secondary leading-relaxed opacity-80">{desc}</p>
    </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="font-mono text-xs text-accent-primary tracking-widest uppercase mb-8 pl-4">{/* Removed border for seamless look */}
        {children}
    </p>
);

const CertGroup = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h5 className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-4 opacity-70">{title}</h5>
        <ul className="space-y-3">{children}</ul>
    </div>
);

const ListItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 text-sm text-text-secondary">
        <span className="w-1.5 h-1.5 bg-white/10 rounded-full mt-1.5 flex-shrink-0" />
        {text}
    </li>
);

export const CredibilitySection = SectionWrapper(Credibility, "credibility");
