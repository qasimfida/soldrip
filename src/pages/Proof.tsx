import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Hero from '@/components/hero'
import Swapping from '@/components/swapping'
import SwapeWithConfidence from '@/components/swapping-with-confidence'
import logo from '@/assets/logo-xl.svg'
import { Header } from '@/components/header'

const Proof = () => {
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
            <Header hasNavigation={false} />
            <main className="relative min-h-screen text-white">
                <Hero title="utility " gradientText="drives community" description="Secure swap via Jupiter Exchange-the #1 DEX aggregator on Solana." footer="Secure swap via Jupiter Exchange-the #1 DEX aggregator on Solana." buttonText="Swap $SOL for DRIP Now" />
                <Swapping />
                <SwapeWithConfidence />
                <div className="flex flex-col mt-5 mb-10 md:mb-20">
                    <img src={logo} alt="" className="max-w-[364px] w-full mx-auto" />
                    <div className="flex flex-col mt-5">
                        <h4 className=" text-3xl text-center md:text-[64px] font-bold uppercase " >
                            sol <span className='text-gradient-primary-linear' >drip</span>
                        </h4>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Proof