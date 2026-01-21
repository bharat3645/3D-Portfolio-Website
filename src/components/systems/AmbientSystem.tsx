'use client';

import { StarsCanvas } from '@/graphics/Stars';
import { useMotion } from '@/hooks/useMotion';

export function AmbientSystem() {
    const { state } = useMotion();

    return (
        <div
            className="fixed inset-0 z-[-1] pointer-events-none bg-bg-void overflow-hidden transition-opacity duration-1000"
            style={{ opacity: state.isIdle ? 0.6 : 1 }} // Dim when idle for "Breathing" effect
        >
            <StarsCanvas />

            {/* Dynamic CSS for Fog Movement */}
            <style jsx>{`
                @keyframes fog-drift {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-5%, -5%) rotate(2deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                .animate-fog-drift {
                    animation: fog-drift 60s infinite ease-in-out;
                }
             `}</style>
        </div>
    );
}
