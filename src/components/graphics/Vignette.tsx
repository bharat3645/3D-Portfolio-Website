'use client';

export function Vignette() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[2]"
            style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.7) 100%)',
                mixBlendMode: 'multiply'
            }}
        />
    );
}
