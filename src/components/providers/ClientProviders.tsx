'use client';

import { MotionProvider } from '@/core/MotionProvider';
import { ThemeProvider } from '@/core/ThemeProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionProvider>
                {children}
            </MotionProvider>
        </ThemeProvider>
    );
}
