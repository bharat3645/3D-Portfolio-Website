'use client';

import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useState } from 'react';

interface RiveIconProps {
    iconName?: string;
    size?: number;
    className?: string;
}

/**
 * Individual Rive Icon Component
 * Uses the interactive icon set Rive file
 */
export function RiveIcon({ iconName = 'default', size = 48, className = '' }: RiveIconProps) {
    const [isHovered, setIsHovered] = useState(false);

    const { rive, RiveComponent } = useRive({
        src: '/animations/25691-47977-interactive-icon-set.riv',
        autoplay: isHovered,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center
        }),
    });

    return (
        <div
            className={`inline-block ${className}`}
            style={{ width: size, height: size }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            <RiveComponent />
        </div>
    );
}

/**
 * Reusable Rive Icon Set Components
 * These can be used throughout the site for skill cards, project cards, etc.
 */
export const RiveIcons = {
    Brain: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="brain" {...props} />,
    Code: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="code" {...props} />,
    Server: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="server" {...props} />,
    CPU: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="cpu" {...props} />,
    Database: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="database" {...props} />,
    Cloud: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="cloud" {...props} />,
    Trophy: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="trophy" {...props} />,
    Star: (props: Omit<RiveIconProps, 'iconName'>) => <RiveIcon iconName="star" {...props} />,
};
