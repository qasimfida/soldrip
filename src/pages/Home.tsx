import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import WhyDrip from '@/components/why-drip'
import Rewards from '@/components/rewards'
import Community from '@/components/community'
import Insurance from '@/components/insurance'
import RoadMap from '@/components/road-map'
import JoinUs from '@/components/join-us'
import Built from '@/components/built'

const Home = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen text-white bg-background">
            <Hero />
            <HowItWorks />
            <WhyDrip />
            <Rewards />
            <Community />
            <Insurance />
            <Built />
            <RoadMap />
            <JoinUs />
        </div>
    )
}

export default Home