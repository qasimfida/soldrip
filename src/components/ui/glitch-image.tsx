import React, { useState } from 'react';
import { useGlitchEffect } from '@/hooks/useGlitchEffect';
import { cn } from '@/lib/utils';

interface GlitchImageProps {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    glitchIntensity?: number;
    glitchDuration?: number;
}

export const GlitchImage = ({
    src,
    alt,
    className,
    imgClassName,
    glitchIntensity = 5,
    glitchDuration = 1500,
}: GlitchImageProps) => {
    const { ref, isGlitching, getGlitchStyle } = useGlitchEffect({
        glitchIntensity,
        glitchDuration,
    });

    const [glitchStyles] = useState({
        red: { left: '-5px', top: '0px', filter: 'blur(1px) contrast(1.2)' },
        green: { left: '5px', top: '2px', filter: 'blur(1px) contrast(1.2)' },
        blue: { left: '-2px', top: '-2px', filter: 'blur(1px) contrast(1.2)' },
    });

    return (
        <div ref={ref} className={cn('relative overflow-hidden', className)}>
            {/* Main image */}
            <img
                src={src}
                alt={alt}
                className={cn('relative z-10 w-full h-full object-cover', imgClassName)}
                style={isGlitching ? getGlitchStyle() : {}}
            />

            {/* Glitch layers */}
            {isGlitching && (
                <>
                    {/* Red channel */}
                    <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="absolute top-0 left-0 z-[1] w-full h-full object-cover opacity-70 mix-blend-screen"
                        style={{
                            ...glitchStyles.red,
                            ...getGlitchStyle(),
                            clipPath: 'polygon(0 15%, 100% 0, 100% 65%, 0 70%)',
                            filter: 'blur(1px) contrast(1.2) hue-rotate(90deg)',
                        }}
                    />

                    {/* Green channel */}
                    <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="absolute top-0 left-0 z-[2] w-full h-full object-cover opacity-70 mix-blend-screen"
                        style={{
                            ...glitchStyles.green,
                            ...getGlitchStyle(),
                            clipPath: 'polygon(0 25%, 100% 15%, 100% 75%, 0 80%)',
                            filter: 'blur(1px) contrast(1.2) hue-rotate(180deg)',
                        }}
                    />

                    {/* Blue channel */}
                    <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        className="absolute top-0 left-0 z-[3] w-full h-full object-cover opacity-70 mix-blend-screen"
                        style={{
                            ...glitchStyles.blue,
                            ...getGlitchStyle(),
                            clipPath: 'polygon(0 65%, 100% 60%, 100% 100%, 0 100%)',
                            filter: 'blur(1px) contrast(1.2) hue-rotate(270deg)',
                        }}
                    />

                    {/* Noise overlay */}
                    <div
                        className="absolute inset-0 z-[4] opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        }}
                    />
                </>
            )}
        </div>
    );
}; 