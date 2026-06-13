'use client';

import { useState, useEffect } from 'react';

export type Quality = 'high' | 'med' | 'low';

/**
 * One-shot device capability detection. Runs client-side only.
 * - prefers-reduced-motion or Data-Saver  -> 'low'  (freeze heavy motion, drop Spline)
 * - few cores / low memory                -> 'med'  (lighter effects)
 * - otherwise                             -> 'high' (full fidelity)
 */
export function detectQuality(): Quality {
    if (typeof window === 'undefined') return 'high';

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
        deviceMemory?: number;
    };

    if (reducedMotion || nav.connection?.saveData) return 'low';

    const cores = nav.hardwareConcurrency ?? 8;
    const mem = nav.deviceMemory ?? 8;
    if (cores <= 4 || mem <= 4) return 'med';

    return 'high';
}

/** True only when the user explicitly asked for reduced motion. */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/**
 * React hook form. Starts 'high' for SSR/first paint (avoids hydration flash),
 * then resolves to the real tier after mount.
 */
export function useQuality(): Quality {
    const [q, setQ] = useState<Quality>('high');
    useEffect(() => {
        setQ(detectQuality());
    }, []);
    return q;
}
