'use client';

import dynamic from 'next/dynamic';
import { useMotion } from '@/hooks/useMotion';
import { AuroraMesh } from '@/components/systems/AuroraMesh';

const StarsCanvas = dynamic(() => import('@/graphics/Stars').then((mod) => mod.StarsCanvas), {
    ssr: false
});

export function AmbientSystem() {
    const { state } = useMotion();

    return (
        <>
            {/* Aurora color mesh — deepest layer */}
            <AuroraMesh />

            {/* Stars + Fog */}
            <div
                className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden transition-opacity duration-1000"
                style={{ opacity: state.isIdle ? 0.5 : 0.85 }}
            >
                <StarsCanvas />

                <style jsx>{`
                    @keyframes fog-drift {
                        0%   { transform: translate(0, 0) rotate(0deg); }
                        50%  { transform: translate(-5%, -5%) rotate(2deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                    .animate-fog-drift {
                        animation: fog-drift 60s infinite ease-in-out;
                    }
                `}</style>
            </div>

            {/* Global film-grain noise overlay */}
            <div
                className="noise-overlay"
                aria-hidden="true"
            />
        </>
    );
}
