import { Container } from "./container"
import Title from "./title"
import VideoThumbnail from "@/assets/videos/How It Works.mp4"
import Thumbnail from "@/assets/thumbnails/How It Works.png"

const HowItWorks = () => {
  return (
    <Container size="md" id="how-it-works" className="py-16" >
        <Title>
            How It Works
        </Title>
        <div className="relative mt-4 overflow-hidden border rounded-lg bg-primary/5 border-primary/20">
            <div className="aspect-video">
              <video 
                className="object-cover w-full h-full"
                controls
                src={VideoThumbnail}
                poster={Thumbnail}
              >
                <source src="/assets/soldrip-explainer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
    </Container>
  )
}

export default HowItWorks