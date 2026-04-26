'use client';

import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AmbientSystem } from '@/components/systems/AmbientSystem';
import { HeroSection } from '@/components/sections/HeroSection';
import { Preloader } from '@/components/systems/Preloader';
import { Vignette } from '@/components/graphics/Vignette';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CustomCursor } from '@/components/systems/CustomCursor';
import { DotNav } from '@/components/systems/DotNav';

// Lazy-loaded sections
const CurrentRoleSection  = lazy(() => import('@/components/sections/CurrentRoleSection').then(m => ({ default: m.CurrentRoleSection })));
const IdentitySection     = lazy(() => import('@/components/sections/IdentitySection').then(m => ({ default: m.IdentitySection })));
const SkillDomains        = lazy(() => import('@/components/sections/SkillDomains').then(m => ({ default: m.SkillDomains })));
const ExperienceSection   = lazy(() => import('@/components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const WorkSection         = lazy(() => import('@/components/sections/WorkSection').then(m => ({ default: m.WorkSection })));
const StatsSection        = lazy(() => import('@/components/sections/StatsSection').then(m => ({ default: m.StatsSection })));
const TechSection         = lazy(() => import('@/components/sections/TechSection').then(m => ({ default: m.TechSection })));
const BlogPreviewSection  = lazy(() => import('@/components/sections/BlogPreviewSection').then(m => ({ default: m.BlogPreviewSection })));
// TestimonialsSection removed — replaced by extra blog logs
const CredibilitySection  = lazy(() => import('@/components/sections/CredibilitySection').then(m => ({ default: m.CredibilitySection })));
const ContactSection      = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.ContactSection })));
const FinalCTA            = lazy(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })));

const Fallback = memo(() => (
    <div className="h-48 flex items-center justify-center">
        <div className="w-5 h-5 border border-accent-crimson/40 border-t-accent-crimson rounded-full animate-spin" />
    </div>
));
Fallback.displayName = 'Fallback';

const Wrap = memo(({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Fallback />}>{children}</Suspense>
));
Wrap.displayName = 'Wrap';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = isLoading ? 'hidden' : '';
        if (!isLoading) window.scrollTo(0, 0);
    }, [isLoading]);

    return (
        <ErrorBoundary>
            <CustomCursor />
            {!isLoading && <DotNav />}

            <main className="relative min-h-screen w-full overflow-x-hidden bg-bg-void selection:bg-accent-primary selection:text-bg-void">

                <AnimatePresence mode="wait">
                    {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
                </AnimatePresence>

                {/* Ambient (Stars + Aurora + Noise) */}
                <AmbientSystem />
                {!isLoading && <Vignette />}

                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                    <HeroSection />

                    {!isLoading && (
                        <>
                            <Wrap><CurrentRoleSection /></Wrap>
                            <Wrap><IdentitySection /></Wrap>
                            <Wrap><SkillDomains /></Wrap>
                            <Wrap><StatsSection /></Wrap>
                            <Wrap><ExperienceSection /></Wrap>
                            <Wrap><WorkSection /></Wrap>
                            <Wrap><CredibilitySection /></Wrap>
                            <Wrap><TechSection /></Wrap>
                            <Wrap><BlogPreviewSection /></Wrap>
                            <Wrap><ContactSection /></Wrap>
                            <Wrap><FinalCTA /></Wrap>
                        </>
                    )}
                </motion.div>
            </main>
        </ErrorBoundary>
    );
}
