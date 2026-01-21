'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook for smooth section fade-in animations on scroll
 * Uses IntersectionObserver for performance
 */
export function useSectionAnimation(threshold = 0.1) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Add initial class
        element.classList.add('section-fade-in');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Optionally unobserve after animation
                        // observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold,
                rootMargin: '0px 0px -100px 0px', // Trigger slightly before element is fully visible
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold]);

    return ref;
}
