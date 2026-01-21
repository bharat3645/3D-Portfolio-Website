'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-neutral-900 text-white flex items-center justify-center min-h-screen">
                <div className="text-center p-8">
                    <h2 className="text-4xl font-bold mb-4">Critical System Error</h2>
                    <p className="text-neutral-400 mb-8 font-mono text-sm max-w-md mx-auto">
                        {error.message || "An unexpected error occurred within the system core."}
                    </p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors font-bold rounded-sm text-sm tracking-wide"
                    >
                        Reboot System
                    </button>
                </div>
            </body>
        </html>
    );
}
