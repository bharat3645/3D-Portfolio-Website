'use client';

import { useRef, useState } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
    className?: string;
}

export function Magnetic({ children, strength = 0.35, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const onMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const cx = left + width / 2;
        const cy = top + height / 2;
        setOffset({
            x: (e.clientX - cx) * strength,
            y: (e.clientY - cy) * strength,
        });
        setActive(true);
    };

    const onLeave = () => {
        setOffset({ x: 0, y: 0 });
        setActive(false);
    };

    return (
        <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={className}
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: active
                    ? 'transform 0.1s ease-out'
                    : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                display: 'inline-block',
            }}
            data-magnetic
        >
            {children}
        </div>
    );
}
