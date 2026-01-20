'use client';

import { PointMaterial, Points, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as random from 'maath/random/dist/maath-random.esm'
import React, { Suspense, useRef, useState } from 'react'

import { useMotion } from '@/hooks/useMotion';

const Stars = (props: any) => {
    const ref = useRef<any>();
    const { state } = useMotion(); // Access Global Engine

    // Generate sphere points - pinned to avoid hydration mismatch if possible, or use useMemo
    const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }));

    useFrame((_, delta) => {
        if (ref.current) {
            // REACTIVITY: Warp Speed on Scroll & Idle Drift
            const velocity = Math.abs(state.scrollVelocity || 0);

            if (velocity > 0.1) {
                // Fast scroll = Warp
                ref.current.rotation.x -= (velocity * 0.0005);
                ref.current.rotation.y -= (velocity * 0.0005);
            } else if (state.isIdle) {
                // Idle = Deep Space Drift (Slower, different axis)
                ref.current.rotation.z += delta / 50;
                ref.current.rotation.y -= delta / 30;
            } else {
                // Normal
                ref.current.rotation.x -= delta / 10;
                ref.current.rotation.y -= delta / 15;
            }
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props} >
                <PointMaterial
                    transparent
                    color="#f272c8" // Use a color that fits 404ghost? Or keep reference pink for now.
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export const StarsCanvas = () => {
    return (
        <div className="w-full h-auto absolute inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
