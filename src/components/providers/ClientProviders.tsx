'use client';

import { Suspense } from 'react';
import { MotionProvider } from '@/core/MotionProvider';
import { ThemeProvider } from '@/core/ThemeProvider';
import { Analytics } from '@/components/systems/Analytics';
import { ServiceWorkerRegister } from '@/components/systems/ServiceWorkerRegister';
import { ProgressBar } from '@/components/systems/ProgressBar';
import { StringTuneProvider } from '@/components/systems/StringTuneProvider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <MotionProvider>
                <StringTuneProvider>
                    <Suspense fallback={null}>
                        <Analytics />
                    </Suspense>
                    <ServiceWorkerRegister />
                    <Suspense fallback={null}>
                        <ProgressBar />
                    </Suspense>
                    {children}
                </StringTuneProvider>
            </MotionProvider>
        </ThemeProvider>
    );
}
