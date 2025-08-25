
import { Container } from "./container"
import { Button } from "./ui/button"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"
import coingecko from "@/assets/social/coingecko.svg"
import PeopleCheering from '@/assets/videos/People Cheering.mp4'
import circles from '@/assets/circles.png'
import { Player } from "./player"
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;

const JoinUs = () => {

    const handleBuyNow = () => {
        window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${VITE_DRIP_TOKEN_ADDRESS}`, '_blank');
    }

    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="py-8 pr-8 pl-8 md:pl-15 bg-gradient-primary rounded-[40px] mt-20 mb-28" >
                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-20">
                    <div className="flex flex-col justify-center rounded-3xl w-full lg:w-[474px] flex-grow-0 h-auto">
                        <h4 className="!text-white text-3xl text-left md:text-[40px] font-bold uppercase mb-6" >
                            Ready to Join the
                            Rewards Revolution?
                        </h4>
                        <Button
                            onClick={handleBuyNow}
                            className="inline-block px-8 mt-6 w-max uppercase text-xl btn-white font-semibold rounded-full bg-none shadow-primary bg-white hover:bg-white/80 "
                        >
                            <span className="text-gradient-primary">
                                Swap $SOL for DRIP Now
                             </span>
                        </Button>

                        <div className="flex gap-4 mt-10">
                            <div className="flex justify-center">
                                <a href="https://x.com/Sol_drip01" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={x} alt="x" />
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <a href="https://t.me/SolDrip_Rewards" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={telegram} alt="t telegram" />
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <a href="https://dexscreener.com/solana/egezjah1zicivyss1vatrtnvewpxngjwxfnyng9n9frs" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={dex} alt="dex" />
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <a href="https://www.dextools.io/app/en/solana/pair-explorer/Egezjah1zicivYSS1VatRtnvewpxNgJwxFNyNg9N9fRs?t=1748369323068" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={net} alt="net" />
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <a href="https://www.coingecko.com/en/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={coingecko} alt="coingecko" />
                                </a>
                            </div>
                            <div className="flex justify-center">
                                <a href="https://moontok.io/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative flex-col justify-center items-center w-full h-10 rounded-lg aspect-square">
                                    <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                    <img src={rabbit} alt="rabbit" className="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex relative flex-col flex-grow justify-center items-center w-full">
                        <div className="hidden absolute -left-10 top-1/2 w-full max-h-full -translate-y-1/2 md:block">
                            <img src={circles} alt="circles" className="max-w-full max-h-full md:w-auto w-[300px]" />
                        </div>
                        <div className="overflow-hidden w-full max-w-xs rounded-2xl shadow-lg md:max-w-md lg:max-w-lg aspect-square">
                            <Player
                                src={PeopleCheering}
                                controls={true}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>

            </Container>
        </section>
    )
}

export default JoinUs