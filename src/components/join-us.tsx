
import Title from "@/components/title"
import { Container } from "./container"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"
import coingecko from "@/assets/social/coingecko.svg"
import CopyIcon from '@/assets/copy.svg'
import { useState } from "react"
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;

const JoinUs = () => {
    const [tooltip, setTooltip] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(VITE_DRIP_TOKEN_ADDRESS);
        setIsCopied(true);
    }

    const handleBuyNow = () => {
        window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${VITE_DRIP_TOKEN_ADDRESS}`, '_blank');
    }
    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="pt-16 pb-11 md:pb-27 md:pt-28" >
                <Title>
                    Ready to Join the
                </Title>
                <Title className="text-white">Rewards Revolution?</Title>
                <div className="flex flex-col gap-8 items-center">
                    <Button onClick={handleBuyNow} size="lg" className="inline-flex mx-auto mt-10 text-xl bg-gradient-primary" >Buy Now <ArrowRight className='!w-6 !h-6' />   </Button>
                    <div
                        className="flex relative gap-6 items-center px-4 mt-2 max-w-full font-medium text-center rounded-full border h-13 border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base hover:animate__animated hover:animate__flash"

                    >
                        <div className='text-center w-[calc(100%-46px)]' >
                            <span className='text-gradient-primary text-[10px]' >Contract Address</span>
                            <span className='text-sm text-secondary line-clamp-1' >{VITE_DRIP_TOKEN_ADDRESS}</span>
                        </div>
                        <div className="relative">
                            <img src={CopyIcon} onMouseEnter={() => { setIsCopied(false); setTooltip(true) }} onMouseLeave={() => setTimeout(() => setTooltip(false), 1000)} alt="Copy" onClick={handleCopy} />
                            {tooltip && <div className='absolute -top-3 px-4 py-1 text-xs text-white rounded-full bg-black/80'>{isCopied ? "Copied" : "Copy"}</div>}
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-2 gap-14 md:grid-cols-3 lg:grid-cols-6 mt-13 md:mt-16">
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
                        <a href="https://www.coingecko.com/en/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={coingecko} alt="coingecko" />
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