'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, PerformanceMonitor } from '@react-three/drei';
import CanvasLoader from './Loader';
import { detectQuality } from '@/hooks/useQuality';

const Earth = () => {
    const earth = useGLTF('/planet/scene.gltf');

    return (
        <primitive
            object={earth.scene}
            scale={2.5}
            position-y={0}
            rotation-y={0}
        />
    );
};

export const EarthCanvas = () => {
    // DPR ceiling by device tier; PerformanceMonitor adapts live within that range.
    const q = detectQuality();
    const ceiling = q === 'high' ? 2 : q === 'med' ? 1.5 : 1;
    const [dpr, setDpr] = useState(ceiling);

    return (
        <Canvas
            shadows={false}
            frameloop="always"
            dpr={dpr}
            gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            {/* Step DPR down when frames lag, back up (capped at tier ceiling) when stable. */}
            <PerformanceMonitor
                onDecline={() => setDpr((d) => Math.max(1, Math.round((d - 0.5) * 10) / 10))}
                onIncline={() => setDpr((d) => Math.min(ceiling, Math.round((d + 0.5) * 10) / 10))}
            />
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    autoRotateSpeed={1.5}
                />
                <Earth />
                <Preload all />
            </Suspense>
        </Canvas>
    );
};
