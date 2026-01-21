// Professional easing curves
const professionalEasing = [0.16, 1, 0.3, 1]; // Smooth professional curve
const cinematicEasing = [0.22, 1, 0.36, 1]; // Cinematic feel

export const textVariant = (delay: number) => {
    return {
        hidden: {
            y: -50,
            opacity: 0,
            scale: 0.95,
        },
        show: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                duration: 1.4,
                delay: delay,
                ease: professionalEasing,
            },
        },
    };
};

export const fadeIn = (direction: string, type: any, delay: number, duration: number) => {
    return {
        hidden: {
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            opacity: 0,
            scale: 0.95,
            filter: "blur(4px)",
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: professionalEasing as any,
            },
        },
    };
};

export const zoomIn = (delay: number, duration: number) => {
    return {
        hidden: {
            scale: 0.8,
            opacity: 0,
            filter: "blur(8px)",
        },
        show: {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                delay: delay,
                duration: duration,
                ease: cinematicEasing as any,
            },
        },
    };
};

export const slideIn = (direction: string, type: any, delay: number, duration: number) => {
    return {
        hidden: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: professionalEasing as any,
            },
        },
    };
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren || 0.15, // Increased for more noticeable stagger
                delayChildren: delayChildren || 0.1,
            },
        },
    };
};
