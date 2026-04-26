'use client';

import { useEffect, useRef, useState } from 'react';

type HoverState = 'default' | 'hover' | 'view' | 'cta';

const RING_SIZES: Record<HoverState, number> = {
    default: 36,
    hover: 56,
    view: 80,
    cta: 64,
};

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringWrapperRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const lerped = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);
    const [hoverState, setHoverState] = useState<HoverState>('default');
    const [label, setLabel] = useState('');
    const [visible, setVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(true);

    useEffect(() => {
        if (!('ontouchstart' in window)) setIsTouch(false);
    }, []);

    useEffect(() => {
        if (isTouch) return;

        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
            }
        };

        const animate = () => {
            lerped.current.x += (mouse.current.x - lerped.current.x) * 0.09;
            lerped.current.y += (mouse.current.y - lerped.current.y) * 0.09;

            if (ringWrapperRef.current) {
                ringWrapperRef.current.style.transform =
                    `translate(${lerped.current.x}px, ${lerped.current.y}px)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            const interactive = t.closest('a, button, [data-cursor], [data-magnetic]');
            if (!interactive) {
                setHoverState('default');
                setLabel('');
                return;
            }
            const cursorType = (interactive.getAttribute('data-cursor') || 'hover') as HoverState;
            const cursorLabel = interactive.getAttribute('data-cursor-label') || '';
            setHoverState(cursorType);
            setLabel(cursorLabel);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        document.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        return () => {
            cancelAnimationFrame(rafRef.current);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [isTouch, visible]);

    if (isTouch) return null;

    const ringSize = RING_SIZES[hoverState];

    return (
        <>
            {/* Instant dot */}
            <div
                ref={dotRef}
                aria-hidden="true"
                className="cursor-dot"
                style={{ opacity: visible ? 1 : 0 }}
            />

            {/* Lerped ring wrapper — always 200px, centered via negative margin */}
            <div
                ref={ringWrapperRef}
                aria-hidden="true"
                className="cursor-ring-wrapper"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <div
                    className={`cursor-ring ${hoverState !== 'default' ? 'cursor-ring--active' : ''}`}
                    style={{ width: ringSize, height: ringSize }}
                >
                    {label && (
                        <span className="cursor-ring-label">{label}</span>
                    )}
                </div>
            </div>
        </>
    );
}
