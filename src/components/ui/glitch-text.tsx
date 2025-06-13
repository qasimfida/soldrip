import React, { useEffect, useState } from 'react';
import { useGlitchEffect } from '@/hooks/useGlitchEffect';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
    glitchIntensity?: number;
    glitchDuration?: number;
    textColor?: string;
    glitchColors?: string[];
}

export const GlitchText = ({
    text,
    className,
    as: Component = 'div',
    glitchIntensity = 5,
    glitchDuration = 1500,
    textColor = 'text-white',
    glitchColors = ['text-primary', 'text-secondary', 'text-destructive'],
}: GlitchTextProps) => {
    const { ref, isVisible, isGlitching } = useGlitchEffect({
        glitchIntensity,
        glitchDuration,
    });

    const [glitchText, setGlitchText] = useState(text);

    // Update glitch text with random characters when glitching
    useEffect(() => {
        if (!isGlitching) {
            setGlitchText(text);
            return;
        }

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

        const glitchInterval = setInterval(() => {
            const newText = text.split('').map((char, i) => {
                if (char === ' ') return ' ';
                return Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char;
            }).join('');

            setGlitchText(newText);
        }, 100);

        return () => clearInterval(glitchInterval);
    }, [isGlitching, text]);

    return (
        <div ref={ref} className={cn('relative overflow-hidden', className)}>
            {/* Main text */}
            <Component className={cn('relative z-10', textColor)}>
                {isVisible ? text : glitchText}
            </Component>

            {/* Glitch layers */}
            {isGlitching && (
                <>
                    <Component
                        className={cn('absolute top-0 left-0 z-[1]', glitchColors[0])}
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            transform: `translate(-${glitchIntensity}px, ${glitchIntensity}px)`,
                            opacity: 0.8,
                        }}
                    >
                        {glitchText}
                    </Component>

                    <Component
                        className={cn('absolute top-0 left-0 z-[2]', glitchColors[1])}
                        style={{
                            clipPath: 'polygon(0 45%, 100% 45%, 100% 80%, 0 80%)',
                            transform: `translate(${glitchIntensity}px, -${glitchIntensity}px)`,
                            opacity: 0.8,
                        }}
                    >
                        {glitchText}
                    </Component>

                    <Component
                        className={cn('absolute top-0 left-0 z-[3]', glitchColors[2])}
                        style={{
                            clipPath: 'polygon(0 80%, 100% 80%, 100% 100%, 0 100%)',
                            transform: `translate(-${glitchIntensity * 1.5}px, -${glitchIntensity * 0.5}px)`,
                            opacity: 0.8,
                        }}
                    >
                        {glitchText}
                    </Component>
                </>
            )}
        </div>
    );
}; 