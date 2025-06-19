import { Container } from "@/components/container"
import Title from "@/components/title"
import { BUILT } from "@/constants/built"

const Built = () => {

    return (
        <section id="built" className="pt-26 -mt-26" >
            <Container className="pb-12 md:pb-16" >
                <Title className="animate__animated animate__fadeIn">
                    Built for Builders
                </Title>
                <p className="mt-4 mb-8 text-base text-center text-white md:text-3xl animate__animated animate__fadeIn animate__delay-1">
                    $DRIP earns passive income for your project
                </p>
                <div className="flex flex-wrap gap-8 justify-center md:flex-nowrap md:gap-10 my-13" >
                    {BUILT.map((item, index) => (
                        <div
                            className={`flex flex-col gap-5 px-5 py-6 rounded-lg border max-w-[400px] md:px-13 shadow-primary border-primary/20 bg-primary/10`}
                            key={`built-${index + 1}`}
                        >
                            <p className="mt-4 text-base text-center text-white md:text-3xl" >{item.title}</p>
                            <p className="text-lg text-gray-100">{item.description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Built