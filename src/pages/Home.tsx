import { useEffect } from 'react'
import Hero from '../components/hero'
import HowItWorks from '../components/how-it-works'
import WhyDrip from '../components/why-drip'
import Rewards from '../components/rewards'
import Community from '../components/community'
import Insurance from '../components/insurance'
import RoadMap from '../components/road-map'
import JoinUs from '../components/join-us'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const location = useLocation();

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
        <main>
            <Hero />
            <HowItWorks />
            <WhyDrip />
            <Rewards />
            <Community />
            <Insurance />
            <RoadMap />
            <JoinUs />
        </main>
    )
}

export default Home 