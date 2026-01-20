'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Preloader - System Boot Sequence
 * Cinematic boot-up with terminal metaphors and progress
 */
const steps = [
    "INITIALIZING KERNEL...",
    "LOADING MOTION ENGINE...",
    "CALIBRATING SENSORS...",
    "ESTABLISHING LINK...",
    "SYSTEM READY"
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [bootStep, setBootStep] = useState(0);

    useEffect(() => {
        // Simulate loading time 2.5s
        const totalTime = 2500;
        const intervalTime = 30;
        const stepsInterval = totalTime / steps.length;

        let current = 0;
        const timer = setInterval(() => {
            current += 1.5; // randomized increment
            if (current >= 100) {
                current = 100;
                clearInterval(timer);
                setTimeout(onComplete, 800); // Slight delay at 100%
            }
            setProgress(current);
        }, intervalTime);

        // Step progression
        const stepTimer = setInterval(() => {
            setBootStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
        }, stepsInterval);

        return () => {
            clearInterval(timer);
            clearInterval(stepTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(20px)' }} // Cinematic exit
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-bg-void flex flex-col justify-between p-12 pointer-events-none"
        >
            {/* Center: Progress & Label */}
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-64 h-[1px] bg-white/10 mb-8 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-text-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary tracking-tighter tabular-nums mb-2">
                    {Math.round(progress)}%
                </h1>

                <div className="h-6 overflow-hidden">
                    <motion.p
                        key={bootStep}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-mono text-xs text-text-muted tracking-widest uppercase"
                    >
                        {steps[bootStep]}
                    </motion.p>
                </div>
            </div>

            {/* Bottom: Technical Footer */}
            <div className="flex justify-between items-end">
                <div className="font-mono text-[10px] text-text-muted/50">
                    MEM: 64TB OK<br />
                    GPU: DETECTED<br />
                    NET: SECURE
                </div>
                <div className="font-mono text-[10px] text-text-muted/50 text-right">
                    404GHOST<br />
                    SYS.VER.2.0.4
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.svg')] pointer-events-none animate-flicker" />
        </motion.div>
    );
}
