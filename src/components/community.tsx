import { COMMUNITY } from "@/constants/community"
import { Container } from "@/components/container"
import Title from "@/components/title"
import VideoThumbnail from "@/assets/videos/People Cheering.mp4"
import Thumbnail from "@/assets/thumbnails/People Cheering.png"
import { Player } from '@/components/player'

const Community = () => {
    return (
        <section id="community" className="pt-26 -mt-26" >
            <Container id="tokenomics" className="py-16 md:pt-17 md:pb-20" >
                <Title>
                    Community, Not Just Coin
                </Title>
                <p className="mt-4 mb-8 text-base text-center text-white md:text-3xl">Why $DRIP Is a <span className="text-secondary" >Cult</span>, Not a Fad</p>
                <div className="flex flex-col gap-10 my-13" >
                    <div className="grid grid-cols-1 gap-8 gap-x-5 lg:grid-cols-2 md:gap-y-10">
                        {COMMUNITY.map((item, index) => (
                            <div className="flex flex-col gap-5 px-5 py-6 border rounded-lg md:px-13 shadow-primary border-primary/20 bg-primary/10" key={`community-${index + 1}`} >
                                <Title type="heading" className="text-secondary " >{item.title}</Title>
                                <p className="text-lg text-white">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Title type="heading" className="italic text-left md:text-center " >Result?<span className="text-secondary" > Viral cult</span> energy like you've never seen.</Title>
                <div className="relative mt-6 md:mt-14 overflow-hidden border rounded-lg bg-primary/5 border-primary/20 max-w-[618px] mx-auto ">
                    <div className="overflow-hidden rounded-lg aspect-video">
                        <Player
                            src={VideoThumbnail}
                            poster={Thumbnail}
                            className="w-full h-full"
                            controls={false}
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Community