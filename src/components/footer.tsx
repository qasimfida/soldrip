import { NAVIGATION } from "@/constants/navigation"
import { Container } from "./container"
import logo from "@/assets/logo.svg"
import type { Navigation } from "@/types/navigations"
import { Link, useLocation } from "react-router-dom"
import x from "@/assets/social/x.svg"
import telegram from "@/assets/social/telegram.svg"
import dex from "@/assets/social/dex.svg"
import net from "@/assets/social/net.svg"
import rabbit from "@/assets/social/rabbit.svg"
import coingecko from "@/assets/social/coingecko.svg"

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
                    <div className="flex flex-col gap-10 justify-between items-center pb-4 md:flex-row">
                        <div className="flex flex-col justify-start w-full md:justify-center md:w-auto">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-[155px]" />
                            </Link>
                            <p className="text-xl text-white roboto">Not Financial Advice. DYOR. Meme responsibly.</p>
                        </div>
                        <div className="flex flex-wrap gap-7 justify-between items-center w-full md:flex-nowrap md:justify-center md:w-auto">
                            {NAVIGATION.map((item: Navigation) => (
                                <Link
                                    to={item.href}
                                    key={item.label}
                                    className="text-xl text-[#EAECF0] roboto transition-colors hover:text-primary"
                                    onClick={(e) => handleNavClick(item.href, e)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                to={"/"}
                                className="text-xl text-[#EAECF0] roboto transition-colors hover:text-primary"
                            >
                                Help
                            </Link>
                            <Link
                                to={"/"}
                                className="text-xl text-[#EAECF0] roboto transition-colors hover:text-primary"
                            >
                                Privacy
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-between items-center px-4 pt-8 pb-3 mt-6 sm:flex-row md:gap-4">
                    <p className="text-center text-[#F3F3F5] roboto " >© 2025 Sol Drip. All rights reserved.</p>
                    <div className="flex gap-4">
                        <div className="flex justify-center">
                            <a href="https://x.com/Sol_drip01" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={x} alt="x" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="https://t.me/SolDrip_Rewards" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={telegram} alt="t telegram" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="https://dexscreener.com/solana/egezjah1zicivyss1vatrtnvewpxngjwxfnyng9n9frs" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={dex} alt="dex" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="https://www.dextools.io/app/en/solana/pair-explorer/Egezjah1zicivYSS1VatRtnvewpxNgJwxFNyNg9N9fRs?t=1748369323068" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={net} alt="net" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="https://www.coingecko.com/en/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={coingecko} alt="coingecko" />
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="https://moontok.io/coins/sol-drip" target="_blank" rel="noopener noreferrer" className="flex overflow-hidden relative flex-col justify-center items-center w-full h-10 rounded-lg aspect-square">
                                <div className="absolute top-0 right-0 blur-[3px] h-full" />
                                <img src={rabbit} alt="rabbit" className="" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer