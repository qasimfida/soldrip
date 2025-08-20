import { Container } from "./container"
import Video from "@/assets/videos/How It Works.mp4"
import logo from "@/assets/logo-xl.svg"
import { useRef, useState } from "react"
import PlayIcon from "./icons/play-icon"

const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    console.log("playing")
    setShowOverlay(false);
    videoRef.current?.play();
  };

  const handleVideoPlay = () => {
    setShowOverlay(false);
  };

  const handleVideoEnded = () => {
    setShowOverlay(true);
  };

  return (
    <section id="how-it-works" className="pt-26 -mt-26"   >
      <Container size="md" className="pt-8 pb-12" >
        <div className="flex justify-center">
          <div className="inline-flex overflow-hidden relative justify-center items-center mt-4 w-full secondary-gradient-border">
            <div className="secondary-gradient-border-inner">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="object-cover w-full h-full rounded-[52px]"
                  controls
                  src={Video}
                  onPlay={handleVideoPlay}
                  onEnded={handleVideoEnded}
                >
                  <source src="/assets/soldrip-explainer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {showOverlay && (
                  <div className="flex absolute inset-0 z-10 flex-col gap-3 items-center p-4 md:p-6 md:gap-6 video-bg rounded-[24px]">
                    <p className="w-full text-base text-left text-white md:text-2xl roboto">
                      How It Works
                    </p>
                    <div className="bg-background md:h-[178px] md:w-[178px] h-17 w-17 mt-0 md:mt-12 rounded-full flex justify-center items-center">
                      <img src={logo} alt="Thumbnail" className="object-cover md:w-[140px] md:h-[140px] w-[50px] h-[50px]" />
                    </div>
                    <div
                      onClick={handlePlay}
                      className="flex relative justify-center items-center md:h-[88px] md:w-[88px] h-10 w-10 cursor-pointer">
                      <div className="absolute rounded-full ripple h-16 w-16 md:h-[88px] md:w-[88px]" />
                      <div className="absolute w-14 h-14 rounded-full md:w-18 md:h-18 ripple-inner" />
                      <button
                        className="flex justify-center items-center w-10 h-10 rounded-full shadow-lg transition cursor-pointer md:w-14 md:h-14 play-button bg-gradient-primary hover:bg-white"
                        aria-label="Play video"
                      >
                        <PlayIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HowItWorks