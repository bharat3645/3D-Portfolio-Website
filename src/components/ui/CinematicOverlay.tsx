'use client';

interface CinematicOverlayProps {
    opacity?: number;
    grainRawIntensity?: number; // 0 to 1
}

export function CinematicOverlay({
    opacity = 0.4,
    grainRawIntensity = 0.15
}: CinematicOverlayProps) {

    return (
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Film Grain Overlay - Ultra subtle */}
            <div
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay animate-grain"
                style={{
                    backgroundImage: `url('/noise.svg')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '250px 250px'
                }}
            />
        </div>
    );
}
