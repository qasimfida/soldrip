import { Container } from "./container";

const SwapeWithConfidence = () => {
    return (
        <section id="swapping-confidence" className="mb-16 md:mb-20 pt-26 -mt-26">
            <Container className="py-11 md:py-18">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1067px] mx-auto items-center">

                    <div className="flex flex-col gap-5">
                        <h1 className=" font-bold  uppercase text-uppercase text-xl leading-13 md:text-[32px]">
                            <span className="text-gradient-primary">SWAP WITH</span> CONFIDENCE
                        </h1>

                        <p className="text-2xl font-normal leading-8 text-white">
                            This swap is powered by Jupiter Exchange, ensuring you get the best available price for DRIP on Solana.
                        </p>
                        <p className="text-2xl font-normal leading-8 text-white">
                            You control your wallet—we never touch your funds.
                        </p>
                        <div className="bg-[#3B2A5A] rounded-xl p-6 text-white text-base md:text-xl mt-4">
                            Try starting with 1-5 SOL to see how the DRIP ecosystem mechanics work. Even small amounts make a visible impact on our market and
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SwapeWithConfidence;
