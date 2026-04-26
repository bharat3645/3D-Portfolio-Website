'use client';

import { useEffect } from 'react';

export function StringTuneProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        async function init() {
            try {
                const mod = await import('@fiddle-digital/string-tune');
                const st = mod.StringTune.getInstance();

                // Core scroll engine
                st.use(mod.StringProgress);   // --progress CSS var on scroll
                st.use(mod.StringParallax);   // string="parallax" string-speed="x"
                st.use(mod.StringGlide);      // smooth inertia on scroll elements
                st.use(mod.StringLerp);       // interpolated scroll values
                st.use(mod.StringMagnetic);   // magnetic cursor pull

                // Smooth scroll mode — works alongside Lenis
                st.setupSettings({ 'scroll-mode': 'default' });

                st.start(0); // 0 = match display refresh rate
            } catch {
                // Progressive enhancement — silently continue without StringTune
            }
        }
        init();
    }, []);

    return <>{children}</>;
}
