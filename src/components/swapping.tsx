import { Container } from "./container"
import { SWAPPING_STEPS } from "../constants/swapping";

const Swapping = () => {
  return (
    <section id="swapping" className="pt-26 -mt-26">
      <div className="">
        <Container className="py-11 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2  max-w-[884px] mx-auto">
            <div className="flex flex-col gap-4 md:col-span-2">
              <h1 className="mb-6 text-4xl font-bold  uppercase text-uppercase  leading-13 md:text-[40px]">
                SWAPPING<span className="ml-2 text-gradient-primary">IS SIMPLE</span>
              </h1>
              <div className="flex flex-col gap-6">
                {SWAPPING_STEPS.map((step, idx) => (
                  <p className="flex items-center text-sm font-normal text-white md:text-2xl" key={`swapping-step-${idx + 1}`}>
                    <span className="mr-2 font-normal text-white">{idx + 1}.</span>{step}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <div className=" bg-[#1A123A] rounded-[16px] p-4 md:p-6 text-white text-base md:text-2xl leading-6a h-full mad:max-h-[116px]">
                  This transaction is routed through Jupiter Exchange for best rates and liquidity.<br />
                  We do not custody your funds.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Swapping;
