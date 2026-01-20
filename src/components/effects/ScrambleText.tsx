'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleSpeed?: number;
    revealSpeed?: number; // Time between revealing each character
    delay?: number;
}

export function ScrambleText({
    text,
    className,
    scrambleSpeed = 50,
    revealSpeed = 100,
    delay = 0
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // We keep track of how many characters are "locked in"
    const revealIndexRef = useRef(0);
    // Interval for scrambling the remaining characters
    const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    // Timeout for the next reveal step
    const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial state: random random string of same length
        const generateRandomString = (length: number) => {
            return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
        };

        setDisplayText(generateRandomString(text.length));

        const startScramble = () => {
            // Start the scrambling loop for non-revealed chars
            scrambleIntervalRef.current = setInterval(() => {
                if (isComplete) return;

                setDisplayText(prev => {
                    const next = prev.split('');
                    for (let i = revealIndexRef.current; i < text.length; i++) {
                        // Only scramble spaces occasionally to keep word structure slightly visible? 
                        // No, pure chaos is better.
                        if (text[i] !== ' ') {
                            next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
                        } else {
                            next[i] = ' ';
                        }
                    }
                    return next.join('');
                });
            }, scrambleSpeed);

            // Start revealing characters one by one
            const nextStep = () => {
                if (revealIndexRef.current >= text.length) {
                    setIsComplete(true);
                    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
                    return;
                }

                setDisplayText(prev => {
                    const next = prev.split('');
                    next[revealIndexRef.current] = text[revealIndexRef.current];
                    return next.join('');
                });

                revealIndexRef.current += 1;
                revealTimeoutRef.current = setTimeout(nextStep, revealSpeed);
            };

            nextStep();
        };

        startTimeoutRef.current = setTimeout(startScramble, delay);

        return () => {
            if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
            if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
            if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
        };
    }, [text, scrambleSpeed, revealSpeed, delay]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
