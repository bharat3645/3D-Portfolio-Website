'use client';

import { MotionProvider } from '@/core/MotionProvider';
import { ThemeProvider } from '@/core/ThemeProvider';
import { Analytics } from '@/components/systems/Analytics';
import { ServiceWorkerRegister } from '@/components/systems/ServiceWorkerRegister';
import { ProgressBar } from '@/components/systems/ProgressBar';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionProvider>
                <Analytics />
                <ServiceWorkerRegister />
                <ProgressBar />
                {children}
            </MotionProvider>
        </ThemeProvider>
    );
}
