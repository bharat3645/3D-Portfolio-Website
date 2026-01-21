'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-bg-void text-white relative overflow-hidden">

            {/* Background Noise not dependent on heavy components */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/noise.svg')] mix-blend-overlay" />
            </div>

            <div className="relative z-10 text-center px-4">
                <h1 className="font-display text-[120px] md:text-[200px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-80">
                    404
                </h1>

                <div className="w-16 h-1 bg-accent-crimson mx-auto my-8 rounded-full" />

                <h2 className="font-mono text-lg md:text-xl text-text-secondary uppercase tracking-widest mb-12">
                    Sector Not Found
                </h2>

                <Link
                    href="/"
                    className="inline-block px-8 py-4 bg-white/5 border border-white/10 rounded-sm font-mono text-sm tracking-widest hover:bg-white/10 hover:border-accent-crimson transition-all duration-300"
                >
                    Return to Base
                </Link>
            </div>

            <div className="absolute bottom-8 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                System Error // Coordinates Invalid
            </div>
        </div>
    );
}
