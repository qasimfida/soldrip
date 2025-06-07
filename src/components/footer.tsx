import { NAVIGATION } from "@/constants/navigation"
import { Container } from "./container"
import logo from "@/assets/logo.svg"
import type { Navigation } from "@/types/navigations"

const Footer = () => {
    return (
        <div className="pb-9">
            <Container>
                <div className="px-4 border-b border-gray-200" >
                    <div className="flex flex-col items-center justify-between gap-10 pb-4 md:flex-row">
                        <div className="flex items-center justify-start w-full md:justify-center md:w-auto"> <img src={logo} alt="logo" className="w-[155px]" /> </div>
                        <div className="flex items-center justify-around w-full md:justify-center gap-7 md:w-auto">
                            {NAVIGATION.map((item: Navigation) => (
                                <a href={item.href} key={item.label} className="text-lg text-white transition-colors hover:text-primary">
                                    {item.label}
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-3 p-4 mt-6 md:gap-4">
                    <p className="text-center text-white " >Not Financial Advice. DYOR. Meme responsibly. $DRIP by. $DRIP hard. See you in the next shill war.</p>
                    <p className="font-light text-center text-gray-200 " >© 2025 SOL DRIP. All rights reserved.</p>
                </div>
            </Container>
        </div>
    )
}

export default Footer