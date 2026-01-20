'use client';

import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AmbientSystem } from '@/components/systems/AmbientSystem';
import { HeroSection } from '@/components/sections/HeroSection';
import { Preloader } from '@/components/systems/Preloader';
import { ParticleField } from '@/components/graphics/ParticleField';
import { Vignette } from '@/components/graphics/Vignette';

// Lazy load below-fold sections for better initial load performance
const CurrentRoleSection = lazy(() => import('@/components/sections/CurrentRoleSection').then(m => ({ default: m.CurrentRoleSection })));
const IdentitySection = lazy(() => import('@/components/sections/IdentitySection').then(m => ({ default: m.IdentitySection })));
const SkillDomains = lazy(() => import('@/components/sections/SkillDomains').then(m => ({ default: m.SkillDomains })));
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const WorkSection = lazy(() => import('@/components/sections/WorkSection').then(m => ({ default: m.WorkSection })));
const CredibilitySection = lazy(() => import('@/components/sections/CredibilitySection').then(m => ({ default: m.CredibilitySection })));
const FinalCTA = lazy(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })));

// Memoized section wrapper for performance
const SectionWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-screen" />}>
    {children}
  </Suspense>
));
SectionWrapper.displayName = 'SectionWrapper';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling during load
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Force top
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0); // Reset position for entry
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-bg-void selection:bg-accent-primary selection:text-bg-void">

      {/* 1. Cinematic Boot Loader */}
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Persistent Systems (Always Mounted) */}
      <AmbientSystem />
      {!isLoading && (
        <>
          {/* ParticleField suspended for stricter cinematic look */}
          <ParticleField />
          <Vignette />
        </>
      )}

      {/* 3. Main Content - Reveal after load */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Hero loads immediately */}
        <HeroSection />

        {/* Below-fold sections lazy loaded */}
        {!isLoading && (
          <>
            <SectionWrapper>
              <CurrentRoleSection />
            </SectionWrapper>

            <SectionWrapper>
              <IdentitySection />
            </SectionWrapper>

            <SectionWrapper>
              <SkillDomains />
            </SectionWrapper>

            <SectionWrapper>
              <ExperienceSection />
            </SectionWrapper>

            <SectionWrapper>
              <WorkSection />
            </SectionWrapper>

            <SectionWrapper>
              <CredibilitySection />
            </SectionWrapper>

            <SectionWrapper>
              <FinalCTA />
            </SectionWrapper>
          </>
        )}
      </motion.div>
    </main>
  );
}
