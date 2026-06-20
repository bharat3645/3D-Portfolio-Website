'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
    { value: 5,   suffix: '',  label: 'SCOPUS Publications' },
    { value: 20,  suffix: '+', label: 'Production Projects'  },
    { value: 5,   suffix: '',  label: 'Hackathon Wins'       },
    { value: 3,   suffix: '+', label: 'Years Building'       },
];

const EASE = [0.16, 1, 0.3, 1] as const;
// easeOutExpo — fast launch, long graceful settle. Reads premium vs a linear tick.
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Counter({ value, suffix, inView, delay = 0 }: { value: number; suffix: string; inView: boolean; delay?: number }) {
    const [count, setCount] = useState(0);
    const rafRef = useRef(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1500;
        let startTs = 0;
        const tick = (ts: number) => {
            if (!startTs) startTs = ts;
            const t = Math.min((ts - startTs) / duration, 1);
            setCount(Math.round(value * easeOutExpo(t)));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        const id = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, delay * 1000);
        return () => { cancelAnimationFrame(rafRef.current); clearTimeout(id); };
    }, [inView, value, delay]);

    return (
        <span className="stats-number tabular-nums">
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
                    <motion.div
                        key={stat.label}
                        className="stats-item"
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                    >
                        <Counter value={stat.value} suffix={stat.suffix} inView={inView} delay={i * 0.1} />
                        <span className="stats-label">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
