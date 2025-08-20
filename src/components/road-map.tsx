import Circle from '@/components/icons/circle';
import CircleHighlight from '@/components/icons/circle-highlight';
import Marker from '@/components/icons/marker';
import MarkerWave from './icons/marker-wave';
import { Container } from './container';
import Title from './title';
import Drop from "@/assets/bg-gradient.png"
import Loop from "@/assets/loop.png"

const RoadMap = () => {
    return (
        <section id="roadmap" className="flex overflow-hidden relative flex-col justify-center items-center py-10 w-full lg:py-20 bg-card/30">
            <div className="flex absolute z-0 justify-center items-center min-w-full">
                <img src={Drop} alt="background" className="block object-cover top-0 min-w-full" />
            </div>
            <div className="flex absolute z-0 justify-center items-center w-full max-h-[800px] max-w-[400px] h-full -right-10 overflow-hidden">
                <img src={Loop} alt="background" className="block max-h-full" />
            </div>
            <Container className="relative">
                <Title highlight="Road">map</Title>
                <p className="text-xl font-normal text-center text-white mb-17" >
                    Forget the roadmap. This is a movement.
                </p>

                <div className="flex relative flex-col gap-10 justify-center items-end lg:block lg:gap-0">
                    <div className="block absolute left-6 mx-auto w-1 h-full rounded-2xl lg:hidden bg-gradient-primary">

                    </div>
                    <div
                        className={`relative inline-flex rounded-3xl flex-col  w-[calc(100%-60px)] lg:w-[314px] bg-gradient-see-green p-[1px] order-1`}
                    >
                        <div className="block absolute -left-[58px] top-1/2 -translate-y-1/2 lg:hidden"><Circle className="h-8" /></div>
                        <div className="p-5 w-full h-full rounded-3xl bg-background lg:p-8">
                            <h3 className="mb-3 text-lg font-semibold text-white lg:text-2xl">PHASE 1</h3>
                            <ul className="pl-4 space-y-2 text-sm list-disc text-white roboto lg:text-base">
                                <li>Launch on REVSHARE</li>
                                <li>Achieve a $100,000 market cap</li>
                                <li>Grow our community to 1,000 members</li>
                                <li>Secure listings on token screeners and websites</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={`relative lg:left-[200px] lg:top-[41px] inline-flex rounded-3xl flex-col order-3  w-[calc(100%-60px)] lg:w-[314px] bg-gradient-peach p-[1px]`}
                    >
                        <div className="block absolute -left-[58px] top-1/2 -translate-y-1/2 lg:hidden"><Circle className="h-8" /></div>
                        <div className="p-5 w-full h-full rounded-3xl bg-background lg:p-8">
                            <h3 className="mb-3 text-lg font-semibold text-white lg:text-2xl">PHASE 3</h3>
                            <ul className="pl-4 space-y-2 text-sm list-disc text-white roboto lg:text-base">
                                <li>Achieve a $100M market cap</li>
                                <li>Add additional CEX listing</li>
                                <li>Open a merch store</li>
                                <li>Continue to launch platforms within our ecosystem to reward DRIP</li>
                                <li>Expand our partnerships</li>
                            </ul>
                        </div>
                    </div>

                    <MarkerWave className="hidden w-full h-full pointer-events-none lg:block" />

                    <div
                        className={` relative inline-flex rounded-3xl lg:-top-[64px] order-2  w-[calc(100%-60px)] lg:left-[160px] lg:w-[314px] bg-gradient-blue p-[1px] `}
                    >
                        <div className="block absolute -left-[66px] top-1/4 -translate-y-1/2 lg:hidden"><Marker className="w-16" /></div>
                        <div className="block absolute -left-[58px] top-1/2 -translate-y-1/2 lg:hidden"><CircleHighlight className="h-8" /></div>
                        <div className="p-5 w-full h-full rounded-3xl bg-background lg:p-8">
                            <h3 className="mb-3 text-lg font-semibold text-white lg:text-2xl">PHASE 2</h3>
                            <ul className="pl-4 space-y-2 text-sm list-disc text-white roboto lg:text-base">
                                <li>Establish an ecosystem of gaming and utility apps powered by $DRIP</li>
                                <li>Achieve a $1M market cap</li>
                                <li>Secure DeFi partnerships to reward $DRIP</li>
                                <li>Get our first CEX listing</li>
                            </ul>
                        </div>
                    </div>
                    <div
                        className={`relative inline-flex rounded-3xl lg:left-[calc(100%-688px)] order-5  w-[calc(100%-60px)] lg:w-[314px] bg-gradient-see-green p-[1px]`}
                    >
                        <div className="block absolute -left-[58px] top-1/2 -translate-y-1/2 lg:hidden"> <Circle className="h-8" /></div>
                        <div className="p-5 w-full h-full rounded-3xl bg-background lg:p-8">
                            <h3 className="mb-3 text-lg font-semibold text-white lg:text-2xl">PHASE 4</h3>
                            <ul className="pl-4 space-y-2 text-sm list-disc text-white roboto lg:text-base">
                                <li>Use our ecosystem and community to reach a $1B+ market cap</li>
                                <li>Expand our CEX listing to the majors</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </Container>
        </section>
    );
};

export default RoadMap;