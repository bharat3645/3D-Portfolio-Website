'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, SpotLight } from '@react-three/drei';
import CanvasLoader from './Loader';

import { useMotion } from '@/hooks/useMotion';
import * as THREE from 'three';

// PC Model Component
const Computers = ({ isMobile }: { isMobile: boolean }) => {
    // Ensuring the path is correct relative to /public
    const computer = useGLTF('/desktop_pc/scene.gltf');
    const meshRef = React.useRef<THREE.Mesh>(null);
    const { state } = useMotion(); // Access Global Engine

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // 1. Idle Drift
        meshRef.current.rotation.y += delta * 0.05;

        // 2. Scroll Velocity Reaction (Spin slightly on fast scroll)
        const velocity = state.scrollVelocity || 0;
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
            meshRef.current.rotation.z,
            velocity * 0.0005,
            0.1
        );

        // 3. Mouse Parallax (Refined)
        // We use the raw mouse values from the engine
        const mouseX = state.mouseX / 50; // Normalize somewhat
        const mouseY = state.mouseY / 50;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            -0.01 + (mouseY * 0.1),
            0.1
        );
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            -0.2 + (mouseX * 0.1) + (delta * 0.05), // Combined with drift
            0.1
        );
    });

    return (
        <mesh ref={meshRef}>
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                object={computer.scene}
                scale={isMobile ? 0.7 : 0.75}
                position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                rotation={[-0.01, -0.2, -0.1]}
            />
        </mesh>
    );
};

// Canvas Component
export const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia('(max-width: 500px)');

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            dpr={[1, 2]}
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full"
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};
