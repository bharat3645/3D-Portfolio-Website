'use client';

import { useContext } from 'react';
import { MotionContext } from '@/core/MotionProvider';

export function useMotion() {
    const context = useContext(MotionContext);
    if (!context) {
        throw new Error('useMotion must be used within a MotionProvider');
    }
    return context;
}
