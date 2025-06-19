import { Container } from '@/components/container'
import SolDripIcon from '@/assets/logo-xl.svg'
import CopyIcon from '@/assets/copy.svg'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { ScrollDownIcon } from "@/components/icons"
import { useEffect, useState } from 'react'
import { DRIP_TOKEN_ADDRESS } from '@/lib/helius-api'

const Hero = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);



  const scrollToContent = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleBuyNow = () => {
    window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${DRIP_TOKEN_ADDRESS}`, '_blank');
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(DRIP_TOKEN_ADDRESS);
    setIsCopied(true);
  }

  return (
    <div className='flex flex-col items-center justify-center h-auto min-h-[780px]'>
      <Container className='flex flex-col gap-10 py-13'>
        <div className='flex flex-col items-center justify-center gap-6 max-w-[786px] mx-auto'>
          <div className={`flex flex-col items-center justify-center ${isAnimated ? 'animate__animated animate__zoomIn animate__fast' : 'opacity-0'}`}>
            <img src={SolDripIcon} alt="SolDrip logo" />
          </div>
          <h1 className={`text-center text-gradient-primary text-6xl font-gugi font-bold uppercase md:text-[80px] leading-[100px] tracking-[3%] ${isAnimated ? 'animate__animated animate__fadeInUp animate__fast animate__delay-1' : 'opacity-0'}`}>
            Sol Drip
          </h1>
          <h2 className={`text-2xl text-center text-white md:text-3xl ${isAnimated ? 'animate__animated animate__fadeInUp animate__fast animate__delay-2' : 'opacity-0'}`}>
            Earn Passive <span className='text-secondary'> $SOL</span> Rewards by Holding
          </h2>
          <p className={`text-sm text-center text-gray-200 md:text-lg ${isAnimated ? 'animate__animated animate__fadeInUp animate__fast animate__delay-3' : 'opacity-0'}`}>
            Introducing a memecoin that has utility and air drops real $SOL into your wallet every five minutes while safeguarding holders from rugs. Backed by a community full of devotion, loyalty, humor, AND the power to move mountains.
          </p>
        </div>
        <div className={`relative flex flex-col items-center ${isAnimated ? 'animate__animated animate__fadeIn animate__delay-4' : 'opacity-0'}`}>
          <Button onClick={handleBuyNow} className='text-xl bg-gradient-primary animate__animated animate__pulse animate__infinite animate__slow' size='lg'>
            Buy Now <ArrowRightIcon className='!w-6 !h-6' />
          </Button>
          <div
            className="flex relative gap-6 items-center px-4 mt-7 max-w-full font-medium text-center rounded-full border h-13 border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base hover:animate__animated hover:animate__flash"

          >
            <div className='text-center w-[calc(100%-46px)]' >
              <span className='text-gradient-primary text-[10px]' >Contract Address</span>
              <span className='text-sm text-secondary line-clamp-1' >{DRIP_TOKEN_ADDRESS}</span>
            </div>
            <div className="relative">
              <img src={CopyIcon} onMouseEnter={() => { setIsCopied(false); setTooltip(true) }} onMouseLeave={() => setTimeout(() => setTooltip(false), 1000)} alt="Copy" onClick={handleCopy} />
              {tooltip && <div className='absolute -top-3 px-4 py-1 text-xs text-white rounded-full bg-black/80'>{isCopied ? "Copied" : "Copy"}</div>}
            </div>

          </div>
          <ScrollDownIcon className="relative right-0 left-0 -bottom-4 z-10 mx-auto transition-opacity cursor-pointer hover:opacity-80 animate__animated animate__bounce animate__infinite animate__slow" onClick={scrollToContent} />
        </div>
      </Container>
    </div>
  )
}

export default Hero