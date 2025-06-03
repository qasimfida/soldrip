import { Container } from '@/components/container'
import SolDripIcon from '@/assets/logo-xl.svg'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { ScrollDownIcon } from "@/components/icons"

const Hero = () => {
  const scrollToContent = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-auto min-h-[780px]'>
      <Container className='flex flex-col gap-10 py-13'>
        <div className='flex flex-col items-center justify-center gap-6 max-w-[786px] mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <img src={SolDripIcon} alt="SolDrip logo" />
          </div>
          <h1 className='text-center text-gradient-primary text-6xl font-gugi font-bold uppercase md:text-[80px] leading-[100px] tracking-[3%]'>
            Sol Drip
          </h1>
          <h2 className='text-2xl text-center text-white md:text-3xl'>
            Earn Passive <span className='text-secondary'> $SOL</span> Rewards by Holding
          </h2>
          <p className='text-sm text-center text-gray-200 md:text-lg'>
          Introducing a memecoin that has utility and air drops real $SOL into your wallet every five minutes while safeguarding holders from rugs. Backed by a community full of devotion, loyalty, humor, AND the power to move mountains.
          </p>
        </div>
        <div className='relative flex flex-col items-center'>
          <Button className='text-xl bg-gradient-primary' size='lg'>Buy Now <ArrowRightIcon className='!w-6 !h-6' /></Button>
          <ScrollDownIcon  className="relative left-0 right-0 z-10 mx-auto transition-opacity cursor-pointer -bottom-3 hover:opacity-80 animate-bounce" onClick={scrollToContent} />
          <input readOnly className="flex items-center justify-center h-12 max-w-full px-3 mt-2 text-sm font-medium text-center border rounded-lg border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base" value="w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV" />
        </div>
      </Container>
    </div>
  )
}

export default Hero