import { REWARDS, REWARDS_EVERY_5_MINUTES } from "@/constants/rewards"
import { Container } from "@/components/container"
import Title from "@/components/title"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Logo from "@/assets/logo-circle.svg"

const Rewards = () => {
    return (
        <section id="tokenomics" className="pt-26 -mt-26" >
            <div className="bg-card">
                <Container id="tokenomics" className="py-12 md:py-24" >
                    <Title>
                        Tokenomics and Rewards
                    </Title>
                    <p className="mt-4 mb-8 text-base text-center text-white md:text-3xl">Built for <span className="text-secondary" >Diamond Hands</span></p>
                    <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                        <Button size="lg" className="text-xl font-semibold bg-gradient-primary-linear px-7 shadow-primary " >Rewards Calculator</Button>
                        <Button size="lg" className="text-xl font-semibold bg-gradient-secondary px-7 shadow-primary " >Distribution History </Button>
                    </div>
                    <div className="flex flex-col gap-10 mt-14" >
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 md:gap-y-6">
                            {REWARDS.map((item, index) => (
                                <div className="flex flex-col items-center gap-5 p-[30px] border rounded-lg shadow-primary border-primary/20 bg-primary/10" key={`rewards-${index + 1}`} >
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
                        <div className="flex flex-col md:flex-row md:justify-between  gap-5 px-3 py-5 md:px-[60px] md:py-[30px] border rounded-lg shadow-primary border-primary/20 bg-primary/10">
                            <div>
                                <Title type="heading" className="text-[28px] md:text-3xl font-bold mb-4 text-secondary" >Rewards Every 5 Minutes</Title>
                                <div className="flex flex-col gap-4">
                                    {REWARDS_EVERY_5_MINUTES.map((item, index) => (
                                        <p className="flex items-center text-sm text-white md:text-lg" key={`rewards-every-5-minutes-${index + 1}`} > <span className="text-secondary" ><ChevronRight className="h-6 mr-1" /></span>{item}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center" >
                                <img src={Logo} alt="rewards" className="w-[164px] h-[164px] md:w-[200px] md:h-[200px]" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5 px-6 py-8 md:px-[60px] md:py-[30px] border rounded-lg shadow-primary border-primary/20 bg-primary/10 ">
                            <Title type="heading" className="mb-4 text-3xl font-bold md:text-3xl text-secondary" >Check My Rewards</Title>
                            <p className="flex items-center text-sm text-white md:text-lg "> Enter your waller address to see total $DRIP rewards paid in SOL!
                            </p>
                            <input type="text" placeholder="Enter your wallet address" className="max-w-full px-4 mx-auto text-center border rounded-lg w-2xl border-white/60 bg-card h-13 placeholder:text-secondary text-secondary" />
                            <Button size="lg" className="px-8 text-xl font-semibold bg-gradient-primary md:px-12 shadow-primary " >Check Rewards</Button>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default Rewards