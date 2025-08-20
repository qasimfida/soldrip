import { Container } from '@/components/container'
import CopyIcon from '@/assets/copy.svg'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
const { VITE_DRIP_TOKEN_ADDRESS } = import.meta.env;
interface HeroProps {
  title: string;
  gradientText?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  hasAddress?: boolean;
  footer?: string;
}
const Hero = ({ title, gradientText, description, buttonText, onClick, hasAddress, footer }: HeroProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleBuyNow = () => {
    window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-${VITE_DRIP_TOKEN_ADDRESS}`, '_blank');
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(VITE_DRIP_TOKEN_ADDRESS);
    setIsCopied(true);
  }

  return (
    <div className='flex relative flex-col justify-center items-center h-auto'>
      <Container className='flex flex-col  md:pt-[180px] pt-16' size='md'>
        <div className='flex flex-col items-center justify-center max-w-[884px] mx-auto'>
          <h1 className={`mb-6 text-4xl font-bold text-center uppercase text-uppercase font-gugi md:text-[56px] ${isAnimated ? 'animate__animated animate__fadeInUp animate__fast animate__delay-2' : 'opacity-0'}`}>
            {title}<span className='text-gradient-primary'>{gradientText}</span>
          </h1>
          <p className={`text-base text-center text-white md:text-[20px] max-w-[884px] ${isAnimated ? 'animate__animated animate__fadeInUp animate__fast animate__delay-2' : 'opacity-0'}`}>
            {description}
          </p>
        </div>
        <div className={`relative flex flex-col items-center ${isAnimated ? 'animate__animated animate__fadeIn animate__delay-4' : 'opacity-0'}`}>
          <Button onClick={onClick || handleBuyNow} className='px-8 my-8 font-semibold uppercase rounded-full bg-gradient-primary'>
            {buttonText}
          </Button>
          {hasAddress && (
            <div className="h-16 gradient-border">
              <div className="flex relative items-center max-w-full font-medium leading-4 text-center gradient-border-inner gradient-border text-secondary md:text-base hover:animate__animated hover:animate__flash">
                <span className='text-gradient-primary text-[10px] inline-block mb-1 roboto' >Contract Address</span>
                <div className="flex relative gap-3">
                  <span className='text-xs text-white line-clamp-1 roboto-500' >{VITE_DRIP_TOKEN_ADDRESS}</span>
                  <img src={CopyIcon} onMouseEnter={() => { setIsCopied(false); setTooltip(true) }} onMouseLeave={() => setTimeout(() => setTooltip(false), 1000)} alt="Copy" onClick={handleCopy} />
                  {tooltip && <div className='absolute -top-3 px-4 py-1 text-xs text-white rounded-full bg-black/80'>{isCopied ? "Copied" : "Copy"}</div>}
                </div>
              </div>
            </div>
          )}
          {
            footer && <p className='text-xl text-center text-white md:text-2xl'>
              {footer}
            </p>
          }
        </div>
      </Container>
    </div>
  )
}

export default Hero