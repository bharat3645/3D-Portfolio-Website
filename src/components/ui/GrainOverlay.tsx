'use client';

import { useEffect, useState } from 'react';

export function GrainOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-30 mix-blend-overlay">
            <svg className="absolute inset-0 w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6"
                        stitchTiles="stitch"
                        numOctaves="3"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.4" />
            </svg>
            <div
                className="absolute inset-0 bg-repeat w-[200%] h-[200%] animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                }}
            />

        </div>
    );
}
