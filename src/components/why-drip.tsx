import { WHY_DRIP } from "@/constants/why-drip"
import Title from "@/components/title"

const WhyDrip = () => {
  return (
    <section id="features" className="pt-26 -mt-26" >  
        <div className="px-6 pb-0 md:pb-5" >
            <Title>
                Why Drip?
            </Title> 
            <p className="mt-4 text-base text-center text-white md:text-3xl">Because Every 5 Minutes, Your Wallet Gets <span  className="text-secondary" >Wetter</span></p>
            <div className="grid grid-cols-1 gap-8 py-16 md:py-20 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 gap-x-6">
                {
                    WHY_DRIP.map((item, index) => (
                        <div className="flex flex-col gap-5 px-3 py-6 border rounded-lg md:py-8 md:px-5 shadow-primary border-primary/20 bg-primary/10" key={`why-drip-${index+1}`} >
                            <div className="flex gap-6 ">
                                <div className="flex items-center justify-center w-8 h-8 p-1 text-white rounded-full shrink-0 bg-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <Title type="heading">{item.title}</Title>
                            </div>
                            <p className="text-lg text-white">{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  ) 
}

export default WhyDrip