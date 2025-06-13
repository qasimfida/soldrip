import { COMMUNITY } from "@/constants/community"
import { Container } from "@/components/container"
import Title from "@/components/title"
import VideoThumbnail from "@/assets/videos/People Cheering.mp4"
import Thumbnail from "@/assets/thumbnails/People Cheering.png"
import { Player } from '@/components/player'
import { useEffect, useRef, useState } from "react"

const Community = () => {
    const [inView, setInView] = useState<Array<boolean>>([]);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        // Initialize inView state with false values based on COMMUNITY length
        setInView(Array(COMMUNITY.length).fill(false));

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = itemRefs.current.findIndex(ref => ref === entry.target);
                    if (index !== -1) {
                        setInView(prev => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                        });
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const [videoInView, setVideoInView] = useState(false);
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const videoObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVideoInView(true);
            }
        }, { threshold: 0.3 });

        if (videoRef.current) {
            videoObserver.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                videoObserver.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <section id="community" className="pt-26 -mt-26" >
            <Container id="tokenomics" className="py-16 md:pt-17 md:pb-20" >
                <Title className="animate__animated animate__fadeIn">
                    Community, Not Just Coin
                </Title>
                <p className="mt-4 mb-8 text-base text-center text-white md:text-3xl animate__animated animate__fadeIn animate__delay-1">
                    Why $DRIP Is a <span className="text-secondary" >Cult</span>, Not a Fad
                </p>
                <div className="flex flex-col gap-10 my-13" >
                    <div className="grid grid-cols-1 gap-8 gap-x-5 lg:grid-cols-2 md:gap-y-10">
                        {COMMUNITY.map((item, index) => (
                            <div
                                className={`flex flex-col gap-5 px-5 py-6 border rounded-lg md:px-13 shadow-primary border-primary/20 bg-primary/10 ${inView[index] ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}
                                key={`community-${index + 1}`}
                                ref={(el) => { itemRefs.current[index] = el; }}
                                style={{ animationDelay: `${0.2 * index}s` }}
                            >
                                <Title type="heading" className="text-secondary" >{item.title}</Title>
                                <p className="text-lg text-white">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Title
                    type="heading"
                    className="italic text-left md:text-center animate__animated animate__fadeIn animate__delay-3"
                >
                    Result?<span className="text-secondary" > Viral cult</span> energy like you've never seen.
                </Title>
                <div
                    ref={videoRef}
                    className={`relative mt-6 md:mt-14 overflow-hidden border rounded-lg bg-primary/5 border-primary/20 max-w-[618px] mx-auto ${videoInView ? 'animate__animated animate__zoomIn' : 'opacity-0'}`}
                >
                    <div className="overflow-hidden rounded-lg aspect-video">
                        <Player
                            src={VideoThumbnail}
                            poster={Thumbnail}
                            className="w-full h-full"
                            controls={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Community