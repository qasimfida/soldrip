import { REWARDS, REWARDS_EVERY_5_MINUTES } from "@/constants/rewards"
import { Container } from "@/components/container"
import Title from "@/components/title"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, Loader2 } from "lucide-react"
import Logo from "@/assets/logo-circle.svg"
/* COMMENTED CODE WILL BE ADDED BACK LATER */
// import RewardsCalculator from "./reward-calculator"
import { useState } from "react"
import { formatCurrency } from "@/lib/utils"
import { useWallet } from "@/contexts/wallet"
import { getTotalSolReceived } from '@/lib/helius-api';
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;


const Rewards = () => {
    // const [openCalculator, setOpenCalculator] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [rewardsAmount, setRewardsAmount] = useState<number | null>(null)
    const { address, setAddress } = useWallet();

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
        <section id="tokenomics" className="pt-26 -mt-26" >
            <div className="bg-card">
                <Container id="tokenomics" className="py-12 md:py-24" >
                    <Title>
                        Tokenomics and Rewards
                    </Title>
                    <p className="mt-4 mb-8 text-base text-center text-white md:text-3xl">Built for <span className="text-secondary" >Diamond Hands</span></p>
                    <div className="flex flex-col gap-8 justify-center items-center md:flex-row">
                        {/* <Button size="lg" className="px-7 text-xl font-semibold bg-gradient-primary-linear shadow-primary" onClick={() => setOpenCalculator(true)}>Rewards Calculator</Button> */}
                        <Button size="lg" className="px-7 text-xl font-semibold bg-gradient-primary-linear shadow-primary" onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}>Token Details</Button>
                        <Button
                            size="lg"
                            className="px-7 text-xl font-semibold bg-gradient-secondary shadow-primary"
                            onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}
                        >
                            Distribution History
                        </Button>
                    </div>
                    <Button
                        size="lg"
                        className="flex px-7 mx-auto text-xl font-semibold mt-13 bg-gradient-danger shadow-primary"
                        onClick={() => window.open(`http://revshare.dev/token-landing/${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')}
                    >
                        Rewards and Tokenomics
                    </Button>

                    <div className="flex flex-col gap-10 mt-14" >
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:gap-y-6">
                            {REWARDS.map((item, index) => (
                                <div className={`flex flex-col items-center gap-5 p-[30px] animate__animated  border rounded-lg shadow-primary border-primary/20 bg-primary/10 animate__fadeInLeft animate__delay-${index + 1}s`} key={`rewards-${index + 1}`} >
                                    <Title type="heading" className={cn("text-[50px] md:text-[50px] font-bold ", `${item.color}`)} >{item.value}</Title>
                                    <div className="flex w-[186px] h-6">
                                        <div className="w-2/5 h-full bg-primary"></div>
                                        <div className="w-1/3 h-full bg-secondary"></div>
                                        <div className="w-1/4 h-full bg-destructive"></div>
                                    </div>
                                    <Title type="heading" className="font-bold" >{item.title}</Title>
                                    <p className="text-lg text-gray-200">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between animate__animated animate__fadeInUp animate__delay-3s  gap-5 px-3 py-5 md:px-[60px] md:py-[30px] border rounded-lg shadow-primary border-primary/20 bg-primary/10">
                            <div>
                                <Title type="heading" className="text-[28px] md:text-3xl font-bold mb-4 text-secondary" >Rewards Every 5 Minutes</Title>
                                <div className="flex flex-col gap-4">
                                    {REWARDS_EVERY_5_MINUTES.map((item, index) => (
                                        <p className="flex items-center text-sm text-white md:text-lg" key={`rewards-every-5-minutes-${index + 1}`} > <span className="text-secondary" ><ChevronRight className="mr-1 h-6" /></span>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-center items-center" >
                                <img src={Logo} alt="rewards" className="w-[164px] h-[164px] md:w-[200px] md:h-[200px]" />
                            </div>
                        </div>
                        <div className=" animate__animated animate__fadeInUp animate__delay-4s flex flex-col items-center gap-5 px-6 py-8 md:px-[60px] md:py-[30px] border rounded-lg shadow-primary border-primary/20 bg-primary/10 ">
                            <Title type="heading" className="mb-4 text-3xl font-bold md:text-3xl text-secondary">
                                Check My Rewards
                            </Title>

                            {rewardsAmount === null ? (
                                <>
                                    <p className="flex items-center text-sm text-white md:text-lg">
                                        Enter your wallet address to see total $DRIP rewards paid in SOL!
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="Enter your wallet address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="px-4 mx-auto max-w-full text-center rounded-lg border w-2xl border-white/60 bg-card h-13 placeholder:text-secondary text-secondary"
                                    />

                                    {errorMessage && (
                                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                                    )}

                                    <Button
                                        size="lg"
                                        disabled={isLoading}
                                        onClick={handleCheckRewards}
                                        className="px-8 text-xl font-semibold bg-gradient-primary md:px-12 shadow-primary"
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
                </Container>
                {/* {
                    openCalculator &&
                    <RewardsCalculator open={openCalculator} onClose={() => setOpenCalculator(false)} />
                } */}
            </div>
        </section>
    )
}

export default Rewards