import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useWallet } from '@/contexts/wallet';

const JoinUs = () => {
    const { address, setAddress } = useWallet();

    const handleBuyNow = () => {
        window.open(`https://jup.ag/swap/So11111111111111111111111111111111111111112-w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV`, '_blank');
    }

    return (
        <div id="join-us" className='relative flex flex-col justify-center py-20 bg-no-repeat bg-cover md:py-30 bg-join-us'>
            <div className='flex flex-col items-center justify-center max-w-5xl gap-6 mx-auto'>
                <h2 className='text-4xl text-center md:text-5xl text-gradient-primary'>Join Our Community</h2>
                <p className='text-lg text-center'>Stay up to date with the latest news and announcements from SolDrip.</p>
                <input
                    className="flex items-center justify-center h-12 max-w-full px-3 mt-2 text-sm font-medium text-center border rounded-lg border-primary/20 w-md bg-primary/10 md:h-13 text-secondary md:text-base hover:animate__animated hover:animate__flash"
                    value={address || ''}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter wallet address"
                />
                <Button onClick={handleBuyNow} size="lg" className="inline-flex mx-auto mt-10 text-xl bg-gradient-primary" >Buy Now <ArrowRight className='!w-6 !h-6' />   </Button>
            </div>
        </div>
    );
};

export default JoinUs;