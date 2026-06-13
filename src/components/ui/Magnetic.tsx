'use client';

import { useRef } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    className?: string;
}

export function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const rect = useRef<DOMRect | null>(null);
    const rafRef = useRef<number>(0);

    // Cache the rect once on enter — avoids a forced layout read on every mousemove.
    const onEnter = () => {
        if (!ref.current) return;
        rect.current = ref.current.getBoundingClientRect();
        ref.current.style.transition = 'transform 0.1s ease-out';
    };

    // Write transform directly, coalesced into one rAF — no React state, no re-render.
    const onMove = (e: React.MouseEvent) => {
        const r = rect.current;
        if (!r) return;
        const { clientX, clientY } = e;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            if (!ref.current) return;
            const x = (clientX - (r.left + r.width / 2)) * strength;
            const y = (clientY - (r.top + r.height / 2)) * strength;
            ref.current.style.transform = `translate(${x}px, ${y}px)`;
        });
    };

    const onLeave = () => {
        cancelAnimationFrame(rafRef.current);
        if (!ref.current) return;
        ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        ref.current.style.transform = 'translate(0px, 0px)';
    };

    return (
        <div
            ref={ref}
            onMouseEnter={onEnter}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{ transform: 'translate(0px, 0px)', display: 'inline-block' }}
            data-magnetic
        >
            {children}
        </div>
    );
}
