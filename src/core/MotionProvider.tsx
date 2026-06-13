'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

interface MotionState {
    scrollY: number;
    scrollVelocity: number;
    scrollProgress: number; // 0 to 1
    mouseX: number;
    mouseY: number;
    mouseVelocityX: number;
    mouseVelocityY: number;
    isIdle: boolean;
    time: number;
}

interface MotionContextType {
    state: MotionState;
    lenis: Lenis | null;
    /** Subscribe to the single shared rAF tick. Returns an unsubscribe fn. */
    subscribe: (fn: (time: number) => void) => () => void;
}

export const MotionContext = createContext<MotionContextType | null>(null);

// useMotion has been moved to @/hooks/useMotion

// Module-level flag: only write --mouse-x/--mouse-y to <body> while a
// .section-spotlight section is actually hovered. Otherwise the ~30/sec writes
// invalidate the body subtree for a gradient that's opacity:0 (paint-skipped).
let spotlightActive = false;
export const setSpotlightActive = (v: boolean) => { spotlightActive = v; };

interface MotionProviderProps {
    children: React.ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
    const [state, setState] = useState<MotionState>({
        scrollY: 0,
        scrollVelocity: 0,
        scrollProgress: 0,
        mouseX: 0,
        mouseY: 0,
        mouseVelocityX: 0,
        mouseVelocityY: 0,
        isIdle: false,
        time: 0,
    });

    const lenisRef = useRef<Lenis | null>(null);
    const stateRef = useRef(state); // Ref to access latest state in loops without deps
    const lastMouseTime = useRef(0);
    const idleTimer = useRef<NodeJS.Timeout | null>(null);

    // Single shared rAF tick-bus — other systems (Stars, etc.) subscribe here
    // instead of spinning their own requestAnimationFrame loops.
    const tickSubs = useRef<Set<(time: number) => void>>(new Set());
    const subscribe = useRef((fn: (time: number) => void) => {
        tickSubs.current.add(fn);
        return () => { tickSubs.current.delete(fn); };
    }).current;

    // Update ref when state changes (only for consumption, not for the loop itself mainly)
    /* Actually, to avoid re-renders on every frame, we might NOT want to setState on every frame.
       Instead, we can expose a REF or a subscribe mechanism. 
       However, for Reactivity in components (like showing values), we need state.
       But high freq updates = bad perf.
       
       Strategy:
       - We will primarily allow components to read from a Ref via a getter or useFrame hook.
       - We will ONLY trigger state updates for "Low Frequency" events (Idle change) 
         OR if we accept that this context is for "System" access, maybe we provide a ref-based API.
       
       BUT, for simplicity in this "creative" mode, let's try to be smart.
       Let's expose the REF in the context, and a subscription mechanism.
    */

    // For now, let's keep it simple: We won't trigger re-renders 60fps.
    // We will expose the current values via a Ref in the context.
    // Components that need 60fps animations should use `useFrame` (from R3F) or their own RAF reading this ref.

    const motionValues = useRef<MotionState>({
        scrollY: 0,
        scrollVelocity: 0,
        scrollProgress: 0,
        mouseX: 0,
        mouseY: 0,
        mouseVelocityX: 0,
        mouseVelocityY: 0,
        isIdle: false,
        time: 0,
    });

    useEffect(() => {
        // SCROLL SETUP
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.8,
            infinite: false,
            syncTouch: true,
        });
        lenisRef.current = lenis;

        // MOUSE SETUP
        const handleMouseMove = (e: MouseEvent) => {
            const now = performance.now();
            const dt = now - lastMouseTime.current;

            motionValues.current.mouseX = e.clientX;
            motionValues.current.mouseY = e.clientY;

            // Reset idle
            if (motionValues.current.isIdle) {
                motionValues.current.isIdle = false;
                // Force re-render if needed? Maybe later.
            }

            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => {
                motionValues.current.isIdle = true;
            }, 2000); // 2s idle

            lastMouseTime.current = now;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // RAF LOOP — store ID so we can cancel on cleanup
        let rafId = 0;
        let cssFrame = 0;

        function raf(time: number) {
            lenis.raf(time);

            motionValues.current.time = time;
            motionValues.current.scrollY = window.scrollY;
            motionValues.current.scrollVelocity = (lenis as any).velocity || 0;
            motionValues.current.scrollProgress = lenis.progress || 0;

            // Only write CSS vars every 2nd frame — halves DOM mutation cost.
            // --scroll-y / --scroll-velocity removed: no mounted CSS consumer
            // (scrollVelocity is still read from motionValues.current by the Stars warp).
            // --mouse-x/y only while a spotlight section is hovered.
            cssFrame++;
            if (cssFrame % 2 === 0 && spotlightActive) {
                document.body.style.setProperty('--mouse-x', `${motionValues.current.mouseX}px`);
                document.body.style.setProperty('--mouse-y', `${motionValues.current.mouseY}px`);
            }

            // Drive all subscribers from this one loop.
            tickSubs.current.forEach((fn) => fn(time));

            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
        };
    }, []);

    return (
        <MotionContext.Provider value={{
            state: motionValues.current, // Initial, careful using this in render
            lenis: lenisRef.current,
            subscribe,
        }}>
            {children}
        </MotionContext.Provider>
    );
}
