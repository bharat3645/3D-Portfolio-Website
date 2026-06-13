'use client';

import { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'hero',    label: 'Home'    },
    { id: 'work',    label: 'Work'    },
    { id: 'about',   label: 'About'   },
    { id: 'tech',    label: 'Tech'    },
    { id: 'blog',    label: 'Logs'    },
    { id: 'contact', label: 'Contact' },
];

export function DotNav() {
    const [active, setActive] = useState('hero');
    const [hovered, setHovered] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const els = SECTIONS
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => !!el);

        // Active section: fires only when a section crosses the viewport mid-line.
        // Replaces an unthrottled scroll handler that did getBoundingClientRect()
        // on every section on every scroll tick (forced layout under Lenis).
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
        );
        els.forEach((el) => io.observe(el));

        // Visibility toggle, rAF-throttled (one read per frame max)
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                setVisible(window.scrollY > 100);
                ticking = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => {
            io.disconnect();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            className="dot-nav"
            aria-label="Section navigation"
            style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
        >
            {SECTIONS.map((s) => (
                <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    onMouseEnter={() => setHovered(s.id)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`Navigate to ${s.label}`}
                    data-cursor="hover"
                    className={`dot-nav-item ${active === s.id ? 'dot-nav-item--active' : ''}`}
                >
                    {hovered === s.id && (
                        <span className="dot-nav-tooltip">{s.label}</span>
                    )}
                </button>
            ))}
        </nav>
    );
}
