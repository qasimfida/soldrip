
import Title from "@/components/title"
import { Container } from "./container"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"
import coingecko from "@/assets/social/coingecko.svg"
import CopyIcon from '@/assets/copy.svg'
import { useState } from "react"
import { useWallet } from "@/contexts/wallet"
import { getTotalSolReceived } from "@/lib/helius-api"
import { formatCurrency } from "@/lib/utils"
import PeopleCheering from '@/assets/videos/People Cheering.mp4'
import circles from '@/assets/circles.png'
import { Player } from "./player"
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;

const JoinUs = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [rewardsAmount, setRewardsAmount] = useState<number | null>(null)
    const { address, setAddress } = useWallet();
    const [tooltip, setTooltip] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(VITE_DRIP_TOKEN_ADDRESS);
        setIsCopied(true);
    }

    const handleCheckRewards = async () => {
        try {
            if (!address || address.length < 32) {
                setErrorMessage('Please enter a valid Solana wallet address');
                return;
            }

            setIsLoading(true);
            setErrorMessage(null);

            const res = await getTotalSolReceived(address)
            if ((res as any)?.error) {
                setErrorMessage((res as any)?.error?.message || 'Error fetching rewards data. Please try again.');
                return;
            }
            setRewardsAmount(res);
            setIsLoading(false);
        } catch (error) {
            console.log({ error })
            setErrorMessage((error as any)?.error?.message || 'Error fetching rewards data. Please try again.');
            setIsLoading(false);
        }
    };

    const handleResetRewards = () => {
        setRewardsAmount(null);
        setAddress('');
    };

    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="py-8 pr-8 pl-8 md:pl-15 bg-gradient-primary rounded-[40px] mt-20 mb-28" >
                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-20">
                    <div className="flex flex-col justify-center rounded-3xl w-full lg:w-[474px] flex-grow-0 h-auto">
                        <h4 className="!text-white text-3xl text-left md:text-[40px] font-bold uppercase mb-6" >
                            Ready to Join the
                            Rewards Revolution?
                        </h4>

                        {rewardsAmount === null ? (
                            <>
                                <p className="text-sm text-left text-white md:text-base">
                                    Enter your wallet address to see total $DRIP rewards paid in SOL!
                                </p>
                                <div className="relative mt-6 w-full h-15">
                                    <div className="px-5 w-full rounded-full h-15 bg-card/30">
                                        <input
                                            type="text"
                                            placeholder="Enter your wallet address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="mx-auto w-full max-w-full h-full text-left text-white rounded-lg border-0 outline-none placeholder:text-muted"
                                        />
                                    </div>
                                    <img src={CopyIcon} className="absolute right-5 top-1/2 -translate-y-1/2" onMouseEnter={() => { setIsCopied(false); setTooltip(true) }} onMouseLeave={() => setTimeout(() => setTooltip(false), 1000)} alt="Copy" onClick={handleCopy} />
                                    {tooltip && <div className='absolute right-0 -top-3 px-4 py-1 text-xs text-white rounded-full bg-black/80'>{isCopied ? "Copied" : "Copy"}</div>}
                                    {errorMessage && (
                                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                                    )}
                                </div>
                                <Button
                                    disabled={isLoading}
                                    onClick={handleCheckRewards}
                                    className="inline-block px-8 mt-6 w-[218px] uppercase text-xl btn-white font-semibold rounded-full bg-none shadow-primary bg-white hover:bg-white/80 "
                                ><span className="text-gradient-primary">

                                        {isLoading ? (
                                            <span className="flex items-center">
                                                <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Checking...
                                            </span>
                                        ) : (
                                            'Check Rewards'
                                        )}
                                    </span>
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-5 items-center w-full">
                                <div className="flex flex-col items-center p-8 w-full max-w-md rounded-lg border border-primary/20 bg-primary/10">
                                    <p className="mb-2 text-lg text-white">Total Rewards Earned</p>
                                    <Title type="heading" className="text-4xl font-bold md:text-5xl text-gradient-primary">
                                        {formatCurrency(rewardsAmount)} SOL
                                    </Title>
                                </div>

                                <p className="mt-2 text-sm text-center text-gray-300">
                                    For wallet: {address.slice(0, 6)}...{address.slice(-6)}
                                </p>

                                <Button
                                    size="lg"
                                    onClick={handleResetRewards}
                                    className="px-8 mt-4 text-xl font-semibold bg-gradient-secondary md:px-12 shadow-primary"
                                >
                                    Check Another Wallet
                                </Button>
                            </div>
                        )}

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