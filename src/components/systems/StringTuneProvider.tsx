'use client';

import { useEffect } from 'react';

export function StringTuneProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Defer past critical paint + preloader so it doesn't compete on load
        const id = setTimeout(async () => {
            try {
                const mod = await import('@fiddle-digital/string-tune');
                const st = mod.StringTune.getInstance();

                st.use(mod.StringProgress);
                st.use(mod.StringParallax);
                st.use(mod.StringGlide);
                st.use(mod.StringLerp);
                st.use(mod.StringMagnetic);

                st.setupSettings({ 'scroll-mode': 'default' });
                st.start(0);
            } catch {
                // Progressive enhancement — silently continue without StringTune
            }
        }, 2400); // fires after preloader (~1.8s) + settle buffer

        return () => clearTimeout(id);
    }, []);

    return <>{children}</>;
}
