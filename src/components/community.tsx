import { Container } from "@/components/container"
import Title from "@/components/title"
import Icon1 from '@/assets/icons/1.png';
import Icon2 from '@/assets/icons/2.png';
import Icon3 from '@/assets/icons/3.png';
import Icon4 from '@/assets/icons/4.png';
import background1 from '@/assets/backgrounds/community-1.png';
import background2 from '@/assets/backgrounds/community-2.png';

const Community = () => {
    // Removed inView state and itemRefs logic

    return (
        <section id="community" className="pt-26 -mt-26" >
            <Container id="tokenomics" className="py-16  md:py-[120px]" >
                <Title className="animate__animated animate__fadeIn" highlight="Community, Not ">
                    Just Coin
                </Title>
                <p className="mt-4 text-base text-center text-white mb-17 md:text-3xl animate__animated animate__fadeIn animate__delay-1">
                    We don’t build projects. We live them.
                </p>

                <div className="flex flex-wrap gap-6 mt-10 md:flex-nowrap">
                    <div className="w-full lg:w-[40%] rounded-xl p-10 flex flex-col justify-between relative">
                        <img src={background1} alt="background" className="absolute top-0 left-0 z-0 w-full h-full" />
                        <div className="z-10" >
                            <h3 className="mb-2 font-bold text-white text-[30px]">PERMISSIONLESS</h3>
                            <p className="text-lg font-medium text-white/80 roboto">The $DRIP Army doesn't ask for permission. We flex $DRIP everywhere degens gather.</p>
                        </div>
                        <img src={Icon1} alt="Permissionless Icon" className="z-10 mt-6 w-10 h-10" />
                    </div>
                    <div className="w-full lg:w-[60%] rounded-xl p-10 flex flex-col justify-between relative">
                        <img src={background2} alt="background" className="absolute top-0 left-0 z-0 w-full h-full" />
                        <div className="z-10" >
                            <h3 className="mb-2 font-bold text-white text-[30px]">$DRIP ECOSYSTEM: PLAY. EARN. DOMINATE.</h3>
                            <p className="text-lg font-medium text-white/80 roboto">A rapidly growing network of online games and DeFi tools that reward users in $DRIP</p>
                        </div>
                        <img src={Icon2} alt="Ecosystem Icon" className="z-10 mt-6 w-10 h-10" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 md:flex-nowrap">
                    <div className="w-full lg:w-[60%] rounded-xl p-10 flex flex-col justify-between relative">
                        <img src={background2} alt="background" className="absolute top-0 left-0 z-0 w-full h-full" />
                        <div className="z-10" >
                            <h3 className="mb-2 font-bold text-white text-[30px]">NOT A PROJECT, A LIFESTYLE.</h3>
                            <p className="text-lg font-medium text-white/80 roboto">Community-led live roundtables, contests, quests, and awards. We’re not here to launch. We’re here to stay.</p>
                        </div>
                        <img src={Icon3} alt="Lifestyle Icon" className="z-10 mt-6 w-10 h-10" />
                    </div>
                    <div className="w-full lg:w-[40%] rounded-xl p-10 flex flex-col justify-between relative">
                        <img src={background1} alt="background" className="absolute top-0 left-0 z-0 w-full h-full" />
                        <div className="z-10" >
                            <h3 className="mb-2 font-bold text-white text-[30px]">GRASSROOTS WINS</h3>
                            <p className="text-lg font-medium text-white/80 roboto">Real community does the marketing. IRL meetups, sticker raids, shill storms: if there's a meme, the DRIP Army is there.</p>
                        </div>
                        <img src={Icon4} alt="Grassroots Icon" className="z-10 mt-6 w-10 h-10" />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Community