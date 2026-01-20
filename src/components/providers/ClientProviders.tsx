'use client';

import { MotionProvider } from '@/core/MotionProvider';
import { ThemeProvider } from '@/core/ThemeProvider';
import { PointerTracker } from '@/components/ui/PointerTracker';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionProvider>
                <PointerTracker />
                {children}
            </MotionProvider>
        </ThemeProvider>
    );
}
