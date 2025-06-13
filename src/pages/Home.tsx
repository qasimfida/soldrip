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
import DistributionFormula from '@/components/distribution-formula'
import { useWallet } from '@/contexts/wallet'

const Home = () => {
    const location = useLocation();
    const { address, info } = useWallet();
    console.log({ address, info });
    // Handle scrolling to section when the component mounts or hash changes
    useEffect(() => {
        // Check if there's a hash
        if (location.hash) {
            // Get the element with the id matching the hash
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Wait a bit for the DOM to fully render
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            // If no hash, scroll to top
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen text-white bg-background">
            <Hero />
            <HowItWorks />
            <WhyDrip />
            <Rewards />
            <DistributionFormula />
            <Community />
            <Insurance />
            <RoadMap />
            <JoinUs />
        </div>
    )
}

export default Home