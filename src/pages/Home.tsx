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
import Ecosystem from '@/components/ecosystem'
import { WHY_DRIP } from '@/constants/why-drip'
import Footer from '@/components/footer'
import Drop from "@/assets/bg-gradient.png"
import { Header } from '@/components/header'


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
        <>
            <Header />
            <main className="min-h-screen text-white">
                <Hero title="Finally… " gradientText="A Memecoin That Pays You to Hold" hasAddress description="Tired of chasing the next pump-and-dump? With Sol Drip, you earn real $SOL at steady intervals — rewards fueled by actual trading volume, not empty promises. Built for long-term holders with rug-pull protection, a die-hard community, and a growing ecosystem that drives demand and price upward." buttonText="Swap $SOL for DRIP Now" />
                <HowItWorks />
                <div className="flex absolute z-0 justify-center items-center min-w-full">
                    <img src={Drop} alt="background" className="block object-cover min-w-full" />
                </div>
                <div className="relative z-10">
                    <Ecosystem description="We continuously forge relationships in the web3 community" title="growing ecosystem" highlight="part of a " />
                    <WhyDrip options={WHY_DRIP} title="Drip" highlight="Why" description="Pockets stay full, even when the market flushes" />
                    <Rewards />
                    <Community />
                    <RoadMap />
                    <Insurance />
                    <Built />
                    <JoinUs />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home