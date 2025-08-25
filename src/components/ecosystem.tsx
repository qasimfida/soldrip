import Title from "@/components/title"
import { Container } from "./container"
import jupiter from "../assets/community/jupiter.svg"
import deepfiGames from "../assets/community/deepfi-games.png"
import revshare from "../assets/community/revshare.svg"
import solana from "../assets/community/solana.svg"

const community = [
    {
        name: "Jupiter",
        image: jupiter
    },
    {
        name: "Deepfi Games",
        image: deepfiGames
    },

    {
        name: "Revshare",
        image: revshare
    },
    {
        name: "Solana",
        image: solana
    }
]

const Ecosystem = ({ description, title, highlight }: { description?: string, title?: string, highlight?: string }) => {
    return (
        <section id="ecosystem" className="pt-26 -mt-26" >
            <Container className="py-6 md:py-12" >
                <div className="flex flex-col gap-4">
                    <Title highlight={highlight}>
                        {title}
                    </Title>
                    {description && <p className="text-base font-normal text-center text-white md:text-xl">{description}</p>}
                </div>
                <div className="flex flex-wrap gap-4 justify-between items-center mt-10 md:mt-16 md:flex-nowrap">
                    {community.map((item) => (
                        <img src={item.image} alt={item.name} key={item.name} />
                    ))}
                </div>
            </Container >
        </section >
    )
}

export default Ecosystem