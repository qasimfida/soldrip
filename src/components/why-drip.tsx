
import Title from "@/components/title"
import 'animate.css'
import Background from "@/assets/card-bg.svg"
import { Container } from "./container"
import type { WhyDripProps } from "@/types/why-drip"

const WhyDrip = ({ options, title, highlight, description }: WhyDripProps) => {
    return (
        <section id="features" className="overflow-hidden pt-26 -mt-26">
            <Container className="relative z-10 pt-12 pb-[120px]" >
                <div className="flex flex-col gap-4">
                    <Title highlight={highlight}>
                        {title}
                    </Title>
                    <p className="text-base font-normal text-center text-white md:text-xl">{description}</p>
                </div>
                <div className="grid grid-cols-1 gap-8 justify-between items-center mt-12 md:grid-cols-3 md:mt-16 md:flex-nowrap">
                    {options.map((item) => {
                        const Icon = item.icon
                        return (
                            <div className="relative h-full" key={item.name} >
                                <div className="flex relative z-10 flex-col gap-4 items-center h-full">
                                    <div className="h-[68px] w-[68px] absolute top-1   shrink-0 bg-gradient-primary rounded-full flex items-center justify-center">
                                        {typeof Icon === 'function' ? <Icon /> : Icon}
                                    </div>
                                    <div className="overflow-hidden relative mt-12  rounded-2xl h-[208px] w-[380px] ">
                                        <img src={Background} alt="background" className="object-cover absolute bottom-0 left-0 z-0 w-full h-full" />
                                        <div className="relative z-10 p-4 pt-14 pb-8 h-full">
                                            <Title highlight="Why" type="heading" className="mb-2 text-center uppercase md:text-2xl">
                                                Drip
                                            </Title>
                                            <p className=" text-center text-[#F3F3F5] roboto text-lg">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

export default WhyDrip