import Title from "@/components/title"
import BoxIcon from "./icons/box-icon"

const Insurance = () => {
    return (
        <section id="insurance" className="pt-26 -mt-26" >
            <div className="bg-card">
                <div className="px-6 py-11 md:py-18" >
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <Title className="text-left">
                                Rug Insurance
                            </Title>
                            <Title type="heading" className="text-2xl md:text-[40px] font-normal" >
                                How $DRIP Protects Every Holder
                            </Title>
                            <p className="text-base font-normal text-left text-white md:text-3xl">Other coins leave their faithful holding bags if the devs disappear. $DRIP bakes in "Rug Insurance"—the treasury wallet is always growing from fees and activity, so if disaster strikes, holders still get paid.</p>
                            <p className="text-[22px] text-left text-secondary md:text-2xl font-bold">It's a memecoin built for every twist and turn of crypto fate.</p>
                        </div>
                        <div className="flex flex-col items-center gap-5 p-[30px] md:px-10 border rounded-lg shadow-primary border-primary/20 bg-primary/10">
                            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#44426D] text-secondary">
                                <BoxIcon  />
                            </div>
                            <Title type="heading" >The treasury never sleeps</Title>
                            <p className="text-lg text-white">Even if volume drops, or the team walks, the vault keeps filling—and you keep getting paid. In the end, those other coins might wilt, but $DRIP is built for every storm. Rain or shine, every holder wins.</p>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default Insurance