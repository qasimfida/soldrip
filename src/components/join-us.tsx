import Title from "@/components/title"
import { Container } from "./container"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"

const JoinUs = () => {
    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="pt-16 pb-11 md:pb-27 md:pt-28" >
                <Title>
                    Ready to Join the
                </Title>
                <Title className="text-white">Rewards Revolution?</Title>
                <div className="flex flex-col items-center gap-8">
                    <Button size="lg" className="inline-flex mx-auto mt-10 text-xl bg-gradient-primary" >Buy Now <ArrowRight className='!w-6 !h-6' />   </Button>
                    <input readOnly className="flex items-center justify-center h-12 max-w-full px-3 mt-2 text-sm font-medium text-center border rounded-lg border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base" value="w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV" />

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-14 mt-13 md:mt-16">
                    <div className="flex justify-center">
                        <div className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={x} alt="x" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={telegram} alt="t telegram" />


                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={dex} alt="dex" />


                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={net} alt="net" />


                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="aspect-square w-full max-w-[170px] relative rounded-lg p-4  overflow-hidden flex flex-col items-center justify-center">
                            <div className="absolute top-0 right-0 blur-[3px] w-full h-full bg-primary/10 border border-primary/10" />
                            <img src={rabbit} alt="rabbit" className="w-13 h-13" />


                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default JoinUs