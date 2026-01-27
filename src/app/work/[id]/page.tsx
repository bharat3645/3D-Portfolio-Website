import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolioData';
import { ArrowLeft, ExternalLink, Github, Calendar, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return portfolioData.featuredProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = portfolioData.featuredProjects.find((p) => p.id === params.id);
  if (!project) return {};

  return {
    title: `${project.title} | Case Study`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = portfolioData.featuredProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-bg-void pt-32 pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-12">
        <div className="absolute inset-0">
            {project.image && (
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/#work">
                    <Button variant="ghost" className="text-white/80 hover:text-white mb-6 pl-0 hover:bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Works
                    </Button>
                </Link>
                
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                    <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-white">
                        {project.period}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold font-oswald text-white mb-4 leading-tight">
                    {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl">
                    {project.tagline}
                </p>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-accent-primary">01.</span> The Challenge
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.problem}
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-accent-primary">02.</span> The Solution
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.solution}
                        </p>
                    </div>
                </div>

                {/* Long Description (Markdown-like) */}
                <div className="prose prose-invert prose-lg max-w-none">
                     {project.longDescription?.split('\n').map((line, i) => {
                        if (line.trim().startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-white font-oswald">{line.replace('## ', '')}</h2>;
                        if (line.trim().startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-white">{line.replace('### ', '')}</h3>;
                        if (line.trim().startsWith('- ')) return <li key={i} className="text-muted-foreground ml-4 mb-2">{line.replace('- ', '')}</li>;
                        if (line.trim().match(/^\d+\./)) return <li key={i} className="text-muted-foreground ml-4 mb-2">{line.replace(/^\d+\.\s/, '')}</li>;
                        if (line.trim() === '') return <br key={i} />;
                        return <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{line}</p>;
                    })}
                </div>

                 {/* Architecture & Tech Stack */}
                 <div>
                    <h2 className="text-3xl font-bold font-oswald text-white mb-8">System Architecture</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="flex flex-col gap-4">
                             {project.architecture?.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Layers className="w-5 h-5 text-accent-primary mt-1 shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-8">
                {/* Quick Links */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Project Links</h3>
                    <div className="flex flex-col gap-3">
                        {project.demo && (
                            <Link href={project.demo} target="_blank">
                                <Button className="w-full justify-between group">
                                    Live Demo
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        )}
                        {project.github && (
                            <Link href={project.github} target="_blank">
                                <Button variant="outline" className="w-full justify-between group">
                                    Source Code
                                    <Github className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Impact Stats */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Key Impact</h3>
                    <div className="space-y-4">
                        {project.impact?.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </article>
  );
}
