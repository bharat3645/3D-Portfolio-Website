'use client';

import { useState, useEffect } from 'react';

const SECTIONS = [
    { id: 'hero',         label: 'Home'         },
    { id: 'work',         label: 'Work'         },
    { id: 'about',        label: 'About'        },
    { id: 'tech',         label: 'Tech'         },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact',      label: 'Contact'      },
];

export function DotNav() {
    const [active, setActive] = useState('hero');
    const [hovered, setHovered] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);

            for (const s of [...SECTIONS].reverse()) {
                const el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
                    setActive(s.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
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
