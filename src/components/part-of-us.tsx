
import { Container } from "./container"
import { Button } from "./ui/button"

const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;

const PartOfUs = () => {

    const handleClick = async () => {
        window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${VITE_DRIP_TOKEN_ADDRESS}`, '_blank')
    };

    return (
        <section id="features" className="pt-26 -mt-26" >
            <Container className="px-5 py-8 md:p-15 bg-gradient-primary rounded-[40px]" >
                <div className="flex flex-col">
                    <h4 className="!text-white text-3xl text-center md:text-[40px] font-bold uppercase" >
                        be part of the proof
                    </h4>
                    <p className="my-6 text-sm text-center text-white md:text-base">
                        Try DRIP for yourself and experience adaptive blockchain rewards firsthand.
                    </p>
                    <Button
                        onClick={handleClick}
                        className="inline-block px-8 mx-auto text-xl font-semibold uppercase bg-white bg-none rounded-full w-max-content btn-white shadow-primary hover:bg-white/80"
                    ><span className="text-gradient-primary">
                            Swap $SOL for DRIP Now
                        </span>
                    </Button>
                </div>
            </Container>
        </section>
    )
}

export default PartOfUs