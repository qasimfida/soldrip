import Title from "@/components/title"
import { Container } from "./container"
import sleep from "@/assets/icons/sleep.png"

const Insurance = () => {
    return (
        <section id="insurance" className="pt-26 -mt-26" >
            <div className="insurance-bg">
                <Container className="py-16 md:py-[100px]" >
                    <div className="grid grid-cols-1 gap-10 md:gap-20 md:grid-cols-2">
                        <div className="flex flex-col justify-center">
                            <Title className="text-left" highlight="Rug ">
                                Insurance
                            </Title>

                            <p className="mb-6 text-xl font-normal text-white roboto" >
                                How $DRIP Protects Every Holder
                            </p>
                            <p className="mb-6 text-xl font-normal text-white roboto" >
                                Other coins leave their faithful holding bags if the devs disappear. $DRIP bakes in "Rug Insurance"—the treasury wallet is always growing from fees and activity, so if disaster strikes, holders still get paid.
                            </p>
                            <p className="text-xl font-normal text-gradient-primary roboto" >It's a memecoin built for every twist and turn of crypto fate.</p>
                        </div>
                        <div className="flex flex-col gap-3 p-8 text-center gradient-bottom-left-border gradient-primary-dark">
                            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-primary">
                                <img src={sleep} alt="insurance" />
                            </div>
                            <Title type="heading" className="text-left text-white" >The treasury never sleeps</Title>
                            <p className="text-lg text-left text-white">Even if volume drops, or the team walks, the vault keeps filling—and you keep getting paid. In the end, those other coins might wilt, but $DRIP is built for every storm. Rain or shine, every holder wins.</p>
                        </div>
                    </div>
                </Container >
            </div >
        </section >
    )
}

export default Insurance