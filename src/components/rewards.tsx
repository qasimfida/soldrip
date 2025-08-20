import { REWARDS, REWARDS_EVERY_5_MINUTES } from "@/constants/rewards"
import { Container } from "@/components/container"
import Title from "@/components/title"
import { Button } from "./ui/button"
import { ChevronRight, Loader2 } from "lucide-react"
/* COMMENTED CODE WILL BE ADDED BACK LATER */
// import RewardsCalculator from "./reward-calculator"
import { useState } from "react"
import { formatCurrency } from "@/lib/utils"
import { useWallet } from "@/contexts/wallet"
import { getTotalSolReceived } from '@/lib/helius-api';
import CopyIcon from '@/assets/copy.svg'
import Loop from "@/assets/loop.png"
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;



const Rewards = () => {
    // const [openCalculator, setOpenCalculator] = useState(false)
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
        <section id="tokenomics" className="relative pt-26 -mt-26" >
            <div className="flex absolute z-0 justify-center items-center w-full max-h-[800px] max-w-[400px] h-full rotate-180 -top-[276px] -left-[120px] overflow-hidden">
                <img src={Loop} alt="background" className="block max-h-full" />
            </div>
            <div className="bg-[#1A123A80]">
                <Container id="tokenomics" className="py-12 md:py-24" >
                    <Title highlight="Tokenomics and " >
                        Rewards
                    </Title>
                    <p className="text-base font-normal text-center text-white md:text-xl">Pockets stay full, even when the market flushes</p>
                    <div className="flex flex-wrap gap-8 justify-center items-center my-10 md:flex-row">
                        {/* <Button size="lg" className="px-5 text-xl font-semibold bg-gradient-primary-linear shadow-primary" onClick={() => setOpenCalculator(true)}>Rewards Calculator</Button> */}
                        <Button
                            className="px-5 text-base rounded-full bg-gradient-primary-dark shadow-primary"
                            onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}
                        >
                            Token Details
                        </Button>
                        <Button
                            className="px-5 text-base rounded-full bg-gradient-secondary-dark shadow-primary"
                            onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}
                        >
                            Distribution History
                        </Button>
                        <Button
                            className="px-5 text-base rounded-full bg-gradient-danger-dark shadow-primary"
                            onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}
                        >
                            Rewards & Tokenomics
                        </Button>
                    </div>

                    <div className="flex flex-col gap-10 mt-14" >
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:gap-y-6">
                            {REWARDS.map((item, index) => (
                                <div className={`flex flex-col items-center gap-5 animate__animated  rounded-lg  animate__fadeInLeft animate__delay-${index + 1}s`} key={`rewards-${index + 1}`} >
                                    <img src={item.img} alt={item.title} className="w-full" />
                                    {/* <Title type="heading" className={cn("text-[50px] md:text-[50px] font-bold ", `${item.color}`)} >{item.value}</Title>
                                    <div className="flex w-[186px] h-6">
                                        <div className="w-2/5 h-full bg-primary"></div>
                                        <div className="w-1/3 h-full bg-secondary"></div>
                                        <div className="w-1/4 h-full bg-destructive"></div>
                                    </div>
                                    <Title type="heading" className="font-bold" >{item.title}</Title>
                                    <p className="text-lg text-gray-200">{item.description}</p> */}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-10 md:gap-0 md:flex-row md:justify-between items-center animate__animated animate__fadeInUp animate__delay-3s mt-[60px]">
                            <div className="h-min-content">
                                <Title type="heading" className="" highlight="Rewards on a" >Rhythm</Title>
                                <div className="flex flex-col pt-1">
                                    {REWARDS_EVERY_5_MINUTES.map((item, index) => (
                                        <p className="flex items-center text-lg leading-10 text-white" key={`rewards-every-5-minutes-${index + 1}`} > <span className="text-secondary" ><ChevronRight className="mr-1 h-6" /></span>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center  rounded-[24px] bg-gradient-primary py-[2px] max-w-[544px] w-full h-auto">
                                <div className="inline-flex flex-col items-center p-10 rounded-[24px] bg-[#030014] h-[calc(100%-2px)] w-[calc(100%-2px)]  max-w-[calc(100%-2px)] max-h-[calc(100%-2px)]">
                                    <Title type="heading" className="" highlight="Check My " >
                                        Rewards
                                    </Title>

                                    {rewardsAmount === null ? (
                                        <>
                                            <p className="flex items-center text-sm text-white md:text-base">
                                                Enter your wallet address to see total $DRIP rewards paid in SOL!
                                            </p>
                                            <div className="relative mt-8 mb-10 w-full h-15 gradient-border p-[1px]">
                                                <div className="w-full h-15 gradient-border-inner">
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
                                                className="block right-0 left-0 px-8 mx-auto text-xl font-semibold rounded-full bg-gradient-primary md:px-12 shadow-primary"
                                            >
                                                {isLoading ? (
                                                    <span className="flex items-center">
                                                        <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Checking...
                                                    </span>
                                                ) : (
                                                    'Check Rewards'
                                                )}
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
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
                {/* {
                    openCalculator &&
                    <RewardsCalculator open={openCalculator} onClose={() => setOpenCalculator(false)} />
                } */}
            </div>
        </section >
    )
}

export default Rewards