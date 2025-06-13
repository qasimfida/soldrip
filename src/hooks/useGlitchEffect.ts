import { useEffect, useRef, useState } from 'react';

interface GlitchOptions {
    threshold?: number;
    glitchDuration?: number;
    glitchIntensity?: number;
}

export const useGlitchEffect = (options: GlitchOptions = {}) => {
    const {
        threshold = 0.5,
        glitchDuration = 1500,
        glitchIntensity = 5
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When element enters viewport
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    setIsGlitching(true);

                    // Stop glitching after duration
                    setTimeout(() => {
                        setIsGlitching(false);
                    }, glitchDuration);
                } else if (!entry.isIntersecting && isVisible) {
                    // When element leaves viewport
                    setIsVisible(false);
                }
            },
            {
                threshold,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isVisible, threshold, glitchDuration]);

    // Generate random glitch transform
    const getGlitchStyle = () => {
        if (!isGlitching) return {};

        const randomX = Math.random() * glitchIntensity - glitchIntensity / 2;
        const randomY = Math.random() * glitchIntensity - glitchIntensity / 2;
        const randomSkew = Math.random() * glitchIntensity / 10 - glitchIntensity / 20;

        return {
            transform: `translate(${randomX}px, ${randomY}px) skew(${randomSkew}deg)`,
            opacity: Math.random() * 0.2 + 0.8,
        };
    };

    return { ref, isVisible, isGlitching, getGlitchStyle };
}; 