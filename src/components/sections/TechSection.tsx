'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BallCanvas } from '@/graphics/Ball';
import { SectionWrapper } from '@/components/hoc';
import { fadeIn } from '@/core/animation';

// Technology data - matching the reference assets
const technologies = [
    { name: "HTML 5", icon: "/tech/html.png" },
    { name: "CSS 3", icon: "/tech/css.png" },
    { name: "JavaScript", icon: "/tech/javascript.png" },
    { name: "React JS", icon: "/tech/reactjs.png" },
    { name: "Redux Toolkit", icon: "/tech/redux.png" },
    { name: "Tailwind CSS", icon: "/tech/tailwind.png" },
    { name: "Node JS", icon: "/tech/nodejs.png" },
    { name: "MongoDB", icon: "/tech/mongodb.png" },
    { name: "Three JS", icon: "/tech/threejs.svg" },
    { name: "Git", icon: "/tech/git.png" },
    { name: "Figma", icon: "/tech/figma.png" },
    { name: "Docker", icon: "/tech/docker.png" },
];

const Tech = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <motion.div
                variants={fadeIn("down", "tween", 0.1, 1)}
                className="text-center mb-16"
            >
                <p className="font-mono text-[10px] text-accent-primary tracking-widest uppercase mb-4">
                    System Capabilities
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary">
                    Tech Stack
                </h2>
            </motion.div>

            <div className='flex flex-row flex-wrap justify-center gap-10 max-w-7xl mx-auto'>
                {technologies.map((tech, index) => (
                    <motion.div
                        className="w-28 h-28 cursor-pointer"
                        key={tech.name}
                        variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                    >
                        <BallCanvas icon={tech.icon} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const TechSection = SectionWrapper(Tech, "tech");
