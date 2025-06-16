import { NAVIGATION } from "@/constants/navigation"
import { Container } from "./container"
import logo from "@/assets/logo.svg"
import type { Navigation } from "@/types/navigations"
import { Link, useLocation } from "react-router-dom"

const Footer = () => {
    const location = useLocation();

    const handleNavClick = (href: string, event: React.MouseEvent) => {
        if (href.startsWith('/#') && location.pathname === '/') {
            event.preventDefault();
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (href === '/' && location.pathname === '/') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="pb-9">
            <Container>
                <div className="px-4 border-b border-gray-200" >
                    <div className="flex flex-col items-center justify-between gap-10 pb-4 md:flex-row">
                        <div className="flex items-center justify-start w-full md:justify-center md:w-auto">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-[155px]" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-around w-full md:justify-center gap-7 md:w-auto">
                            {NAVIGATION.map((item: Navigation) => (
                                <Link
                                    to={item.href}
                                    key={item.label}
                                    className="text-lg text-white transition-colors hover:text-primary"
                                    onClick={(e) => handleNavClick(item.href, e)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-3 p-4 mt-6 md:gap-4">
                    <p className="text-center text-white " >Not Financial Advice. DYOR. Meme responsibly. $DRIP by. $DRIP hard. See you in the next shill war.</p>
                    <p className="font-light text-center text-gray-200 " >© 2025 SOL DRIP. All rights reserved.</p>
                </div>
            </Container>
        </div>
    )
}

export default Footer