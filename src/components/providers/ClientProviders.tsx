'use client';

import { MotionProvider } from '@/core/MotionProvider';
import { ThemeProvider } from '@/core/ThemeProvider';
import { Analytics } from '@/components/systems/Analytics';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionProvider>
                <Analytics />
                {children}
            </MotionProvider>
        </ThemeProvider>
    );
}
