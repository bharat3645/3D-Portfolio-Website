'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
    { value: 5,   suffix: '',  label: 'SCOPUS Publications' },
    { value: 20,  suffix: '+', label: 'Production Projects'  },
    { value: 5,   suffix: '',  label: 'Hackathon Wins'       },
    { value: 3,   suffix: '+', label: 'Years Building'       },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = value / 60; // ~1 second at 60fps
        const id = setInterval(() => {
            start += step;
            if (start >= value) {
                setCount(value);
                clearInterval(id);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(id);
    }, [inView, value]);

    return (
        <span className="stats-number">
            {count}<span className="stats-suffix">{suffix}</span>
        </span>
    );
}

export function StatsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="stats-section" aria-label="Impact statistics">
            <div className="stats-inner">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="stats-item">
                        <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
                        <span className="stats-label">{stat.label}</span>
                        {i < stats.length - 1 && (
                            <div className="stats-divider" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
