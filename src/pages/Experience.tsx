import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '@/components/hero'
import WhyDrip from '@/components/why-drip'
import Ecosystem from '@/components/ecosystem'
import { WHY_DRIP_EXPERIENCE } from '@/constants/why-drip'
import PartOfUs from '@/components/part-of-us'
import logo from '@/assets/logo-xl.svg'


const Experience = () => {
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
        <main className="relative min-h-screen text-white">
            <Hero title="Experience Utility " gradientText="in Motion" description="A live, on-chain experiment testing how blockchain rewards can drive lasting community engagement." footer="Secure swap powered by Jupiter Exchange" buttonText="Swap $SOL for DRIP Now" />
            <div className="pt-8 pb-5">
                <Ecosystem description="" title="growing ecosystem" highlight="part of a " />
            </div>
            <WhyDrip options={WHY_DRIP_EXPERIENCE} title="it works" highlight="Why " description="The more you hold, the more you earn. The more you earn, the more you hold. Welcome to the virtuous cycle." />
            <PartOfUs />
            <div className="flex flex-col mt-5 mb-10 md:mb-20">
                <img src={logo} alt="" className="max-w-[364px] w-full mx-auto" />
                <div className="flex flex-col mt-5">
                    <h4 className=" text-3xl text-center md:text-[64px] font-bold uppercase " >
                        sol <span className='text-gradient-primary-linear' >drip</span>
                    </h4>
                </div>
            </div>
        </main>
    )
}

export default Experience 