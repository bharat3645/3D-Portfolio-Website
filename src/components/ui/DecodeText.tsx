'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

interface DecodeTextProps {
    text: string;
    className?: string;
    delay?: number; // Delay before starting decode
}

export function DecodeText({ text, className = "", delay = 0.5 }: DecodeTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isDecoding, setIsDecoding] = useState(true);

    // Simple Decoding Effect on Mount (no hover, no blur, no extra layers)
    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const startDecoding = () => {
            setIsDecoding(true);
            interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                    setIsDecoding(false);
                    setDisplayText(text); // Ensure final text is correct
                }

                iteration += 1 / 3;
            }, 30);
        };

        const timeout = setTimeout(startDecoding, delay * 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [text, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
            // Decorative brand wordmark — NOT the document <h1>. The real <h1>
            // (the person's name) lives in HeroSection for name-search ranking.
            role="img"
            aria-label={text}
        >
            <span aria-hidden="true">{displayText}</span>
        </motion.div>
    );
}
