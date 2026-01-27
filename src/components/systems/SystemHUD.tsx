'use client';

import { useMotion } from '@/hooks/useMotion';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/core/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function SystemHUD() {
    const { state } = useMotion();
    const { theme, toggleTheme } = useTheme();
    const [time, setTime] = useState('');

    useEffect(() => {
        // Update clock every second
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none p-6 md:p-12 flex flex-col justify-between select-none mix-blend-difference">
            {/* Top Left: Theme Toggle */}
            <div className="absolute top-8 left-6 md:left-12 pointer-events-auto">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-white transition-colors group"
                >
                    <div className="p-2 border border-white/10 rounded-full group-hover:bg-white/10 transition-colors">
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </div>
                    <span className="opacity-50 group-hover:opacity-100">
                        {theme === 'dark' ? 'LIGHT_MODE' : 'DARK_MODE'}
                    </span>
                </button>
            </div>

            {/* Top Right: System Status & Clock (Zone 1) */}
            <div className="absolute top-8 right-6 md:right-12 flex flex-col items-end gap-2 text-right">
                <div className="flex flex-col gap-1 items-end">
                    <StatusItem label="SYSTEM" value="ACTIVE" active />
                    <StatusItem label="MODE" value={state.isIdle ? "IDLE" : "INTERACTION"} />
                </div>
                <div className="h-px w-12 bg-white/10 my-1" />
                <span className="font-mono text-xs text-text-secondary tracking-widest block">
                    {time}
                </span>
            </div>

            {/* Bottom Right: Motion Metrics */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end font-mono text-[10px] text-text-muted gap-1">
                <div>VEL: {state.scrollVelocity.toFixed(2)}</div>
                <div>POS: {state.scrollY.toFixed(0)}</div>
            </div>
        </div>
    );
}

function StatusItem({ label, value, active }: { label: string, value: string, active?: boolean }) {
    return (
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-text-secondary">
            {active && (
                <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            )}
            <span className="opacity-50">{label} ::</span>
            <span className={active ? "text-text-primary" : "text-text-secondary"}>{value}</span>
        </div>
    );
}
