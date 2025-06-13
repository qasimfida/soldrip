import { Container } from './container';
import Title from './title';
import RoadMapBg from '@/assets/road-map.jpg';
import Backdrop from '@/assets/back-drop.png';
import { ROAD_MAP } from '@/constants/road-map';
import type { RoadmapItem } from '@/types/road-map';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect, useRef } from 'react';
import 'animate.css';

const RoadMapItem = ({ item, index }: { item: RoadmapItem; index: number }) => {
    const [ref, isInView] = useInView<HTMLDivElement>({
        threshold: 0.3,
        once: false
    });

    const [isGlitching, setIsGlitching] = useState(false);
    const [currentGlitchClass, setCurrentGlitchClass] = useState('');
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const shakeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const skewIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isInView) {
            setIsGlitching(true);

            glitchIntervalRef.current = setInterval(() => {
                setCurrentGlitchClass(randomGlitchAnimation());
            }, 200);



            const timeout = setTimeout(() => {
                setIsGlitching(false);
                if (glitchIntervalRef.current) {
                    clearInterval(glitchIntervalRef.current);
                }
                if (shakeIntervalRef.current) {
                    clearInterval(shakeIntervalRef.current);
                }
                if (skewIntervalRef.current) {
                    clearInterval(skewIntervalRef.current);
                }

            }, 4000);

            return () => {
                clearTimeout(timeout);
                if (glitchIntervalRef.current) {
                    clearInterval(glitchIntervalRef.current);
                }

            };
        }
    }, [isInView]);

    const glitchAnimations = [
        'animate__flash',
        'animate__pulse',
        'animate__headShake',
        'animate__swing',
        'animate__shakeX',
        'animate__shakeY',
        'animate__bounceIn',
        'animate__flipX',
        'animate__flipY',
        'animate__jello',
        'animate__tada',
        'animate__wobble'
    ];

    const randomGlitchAnimation = () => {
        if (Math.random() > 0.5) {
            return ['animate__shakeX', 'animate__shakeY', 'animate__headShake', 'animate__wobble'][Math.floor(Math.random() * 4)];
        }
        return glitchAnimations[Math.floor(Math.random() * glitchAnimations.length)];
    };

    const getAnimationClasses = () => {
        if (!isInView) return 'opacity-0';

        let classes = 'animate__animated animate__fadeIn';

        if (isGlitching && currentGlitchClass) {
            classes += ` ${currentGlitchClass}`;
        }

        return classes;
    };

    const getGlitchStyle = () => {
        if (!isGlitching) return {};


        const brightness = Math.random() * 0.5 + 0.75;
        const contrast = Math.random() * 0.6 + 0.7;

        const hueRotate = Math.random() > 0.7 ? `rotate(${Math.floor(Math.random() * 360)}deg)` : '';

        const invert = Math.random() > 0.9 ? `invert(${Math.random() * 30}%)` : '';


        return {
            filter: `brightness(${brightness}) contrast(${contrast}) ${hueRotate} ${invert}`,
            transition: 'transform 0.05s ease, filter 0.05s ease'
        };
    };



    const getGlitchOverlay = () => {
        if (!isGlitching) return null;

        const shouldShow = Math.random() > 0.5;
        if (!shouldShow) return null;

        const opacity = Math.random() * 0.4;
        const leftOffset = Math.random() * 8 - 4;
        const topOffset = Math.random() * 8 - 4;

        const randomColor = Math.random() > 0.6
            ? 'rgba(0, 255, 255, 0.2)'
            : Math.random() > 0.5
                ? 'rgba(255, 0, 255, 0.2)'
                : 'rgba(255, 255, 0, 0.2)';

        return (
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundColor: randomColor,
                    mixBlendMode: 'overlay',
                    transform: `translate(${leftOffset}px, ${topOffset}px)`,
                    opacity
                }}
            />
        );
    };

    const getSecondaryGlitchOverlay = () => {
        if (!isGlitching || Math.random() > 0.7) return null;

        const leftOffset = Math.random() * 12 - 6;
        const topOffset = Math.random() * 12 - 6;

        return (
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundColor: 'rgba(255, 0, 0, 0.15)',
                    mixBlendMode: 'screen',
                    transform: `translate(${leftOffset}px, ${topOffset}px)`,
                    opacity: Math.random() * 0.3,
                    clipPath: `polygon(0 ${Math.random() * 100}%, 100% ${Math.random() * 100}%, 100% 100%, 0 100%)`
                }}
            />
        );
    };

    return (
        <div
            className={`relative ${getAnimationClasses()}`}
            ref={ref}
            style={{
                animationDuration: isGlitching ? '0.1s' : '1s',
                animationDelay: `${index * 0.15}s`,
            }}
        >
            <div className="z-10 absolute top-1/2 left-0 lg:left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary border-[3px] lg:border-[6px] border-[#48EDC6] w-7 h-7 lg:w-14 lg:h-14 border-box  shadow-secondary ">
            </div>
            <div className={`absolute w-11 lg:w-[100px] h-[3px] bg-[#48EDC6] top-1/2 left-3 lg:left-1/2 transform  -translate-y-1/2  ${index % 2 === 0 ? "lg:-translate-x-[calc(50%+50px)]" : "lg:-translate-x-[calc(50%-75px)]"}`} />

            <div className={`  flex flex-col ml-13 lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse lg:mr-[245px]' : 'lg:ml-[245px]'}`}>
                <div className="hidden w-0 lg:w-1/2 lg:block " />
                <div
                    className={`relative overflow-hidden flex w-full lg:w-1/2  ${index % 2 === 0 ? `lg:justify-end` : `lg:justify-start`}`}
                >
                    <div
                        className={`relative w-full lg:w-auto animate__animated ${isInView ? '' + (index % 2 === 0 ? 'animate__fadeInRight' : 'animate__fadeInLeft') : 'opacity-0'}`}
                        style={{
                            animationDelay: `${index * 0.3}s`,
                            ...getGlitchStyle()
                        }}
                    >
                        {getGlitchOverlay()}
                        {getSecondaryGlitchOverlay()}
                        <img src={Backdrop} alt="backdrop" className='absolute top-0 left-0 w-full h-full ' />

                        <div className={`relative  px-7 md:px-8 py-6 w-auto max-w-full   ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}  `}

                        >

                            <div className="flex items-center mb-3 ">
                                <Title type="heading" className="text-gradient-secondary-linear" >Phase {index + 1}</Title>

                            </div>
                            <div className="flex">
                                {item.left && <div className={`h-full w-full  ${item.left && item.right ? "md:max-w-1/2" : "w-full"}`}>
                                    <div className="flex flex-col justify-between h-full space-y-4 text-white">
                                        {item.left?.map((item, i) => (
                                            <p key={i} className={`text-sm mb-0 ${i > 0 ? 'mt-3' : ""}`}>
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>}
                                {item.left && item.right && <div className="block w-px bg-[#4FD1C5] mx-4"></div>}
                                {item.right && <div className={`h-full w-full  ${item.left && item.right ? "md:max-w-1/2" : "w-full"}`}>
                                    <div className="flex flex-col justify-between h-full space-y-4 text-white">
                                        {item.right?.map((item, i) => (
                                            <p key={i} className={`text-sm mb-0 ${i > 0 ? 'mt-3' : ""}`}>
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const RoadMap = () => {
    return (
        <section
            id="roadmap"
            className="pt-26 -mt-26">

            <div
                className="bg-center bg-cover no-repeat pt-11 pb-13 md:pt-20 gradient primary / 50" style={{
                    backgroundImage: `url(${RoadMapBg})`,
                    backgroundBlendMode: "overlay",
                }}>
                <Container>
                    <Title
                        className="mb-16 text-white"
                    >
                        Road Map
                    </Title>

                    <div className="relative py-3 ml-6 lg:ml-0">
                        <div className="block w-[3px] top-0 h-full lg:transform lg:-translate-x-1/2 rounded-full absolute lg:left-1/2 bg-secondary" />
                        <div className="absolute w-6 lg:w-[84px] h-[3px] bg-[#48EDC6] top-0 left-0 lg:left-1/2 transform rounded-md   -translate-x-1/2" />
                        <div className="absolute w-6 lg:w-[84px] h-[3px] bg-[#48EDC6] bottom-0 left-0 lg:left-1/2 transform rounded-md   -translate-x-1/2" />

                        <div className="flex flex-col gap-12 lg:gap-0">
                            {ROAD_MAP.map((item: RoadmapItem, index: number) => (
                                <RoadMapItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </section >
    );
}

export default RoadMap;