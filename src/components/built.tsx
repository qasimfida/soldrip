import { Container } from "@/components/container"
import Title from "@/components/title"
import { BUILT } from "@/constants/built"

const Built = () => {

    return (
        <section id="built" className="pt-26 -mt-26" >
            <Container className="my-20" >
                <div className="flex flex-wrap gap-10 justify-between md:gap-20 lg:flex-nowrap">
                    <div className="md:w-[35%] flex flex-col justify-center">
                        <Title className="text-left animate__animated animate__fadeIn shrink-0 md:w-[400px]" highlight="Built for " >
                            Builders
                        </Title>
                        <p className="mt-4 text-lg font-medium text-white/80 roboto animate__animated animate__fadeIn animate__delay-1">
                            $DRIP earns passive income for your project on fees generated from the Solana ecosystem.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:gap-8 lg:w-[60%]" >
                        {BUILT.map((item, index) => (
                            <div
                                key={`built-${index + 1}`}
                                className="flex flex-col items-center text-left  rounded-[24px] bg-gradient-primary p-[1px] w-full lg:h-full">
                                <div className="flex flex-col  p-8 rounded-[24px] bg-[#030014] h-full w-full">
                                    <p className="mt-4 text-xl font-bold text-left uppercase text-gradient-white md:text-2xl" >{item.title}</p>
                                    <p className="text-base text-white">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Built