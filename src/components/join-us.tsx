import Title from "@/components/title"
import { Container } from "./container"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"
import { useWallet } from "@/contexts/wallet"
import { DRIP_TOKEN_ADDRESS } from "@/lib/helius-api"

const JoinUs = () => {
    const { address, setAddress } = useWallet();

    const handleBuyNow = () => {
        window.open(`https://revshare.dev/token/${DRIP_TOKEN_ADDRESS}`, '_blank');
    }
    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="pt-16 pb-11 md:pb-27 md:pt-28" >
                <Title>
                    Ready to Join the
                </Title>
                <Title className="text-white">Rewards Revolution?</Title>
                <div className="flex flex-col items-center gap-8">
                    <Button onClick={handleBuyNow} size="lg" className="inline-flex mx-auto mt-10 text-xl bg-gradient-primary" >Buy Now <ArrowRight className='!w-6 !h-6' />   </Button>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="flex items-center justify-center h-12 max-w-full px-3 mt-2 text-sm font-medium text-center border rounded-lg border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base" />

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-14 mt-13 md:mt-16">
                    <div className="flex justify-center">
                        <a href="https://x.com/Sol_drip01" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={x} alt="x" />
                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="https://t.me/SolDrip_Rewards" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={telegram} alt="t telegram" />


                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="https://dexscreener.com/solana/egezjah1zicivyss1vatrtnvewpxngjwxfnyng9n9frs" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={dex} alt="dex" />


                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="https://www.dextools.io/app/en/solana/pair-explorer/Egezjah1zicivYSS1VatRtnvewpxNgJwxFNyNg9N9fRs?t=1748369323068" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={net} alt="net" />


                        </a>
                    </div>
                    <div className="flex justify-center">
                        <a href="https://moontok.io/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex flex-col items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={rabbit} alt="rabbit" className="w-13 h-13" />


                        </a>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default JoinUs