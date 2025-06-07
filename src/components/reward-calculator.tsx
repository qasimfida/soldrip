import { useEffect, useState } from 'react';
import type { RewardsCalculatorProps } from '@/types/reward-calculator';
import Title from './title';
import { Button } from './ui/button';



export const RewardsCalculator = ({ open, onClose }: RewardsCalculatorProps) => {
    const [tokenAmount, setTokenAmount] = useState<string>('');
    const [rewards, setRewards] = useState<number | null>(null);

    useEffect(() => {
        setRewards(null);
    }, [open]);

    const handleCalculate = () => {
        const amount = parseFloat(tokenAmount) || 0;
        const estimatedRewards = amount * 0.0001;
        setRewards(estimatedRewards);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70">
            <div className="relative flex flex-col gap-5 w-full max-w-[744px] border border-primary/20 bg-[#202738] rounded-xl shadow-primary overflow-hidden px-3 md:px-13 py-10 md:py-7">
                <div className="relative flex items-center justify-between ">
                    {rewards !== null ? <p className="w-full text-lg text-center text-white">
                        You will earn
                    </p> : <Title type="heading" className="text-3xl font-bold text-secondary">Rewards Calculator</Title>}
                    <div
                        className={`text-xl font-bold text-white transition-colors cursor-pointer hover:text-gray-300 absolute right-3 top-0`}
                        onClick={onClose}
                    >
                        x
                    </div>
                </div>
                {
                    rewards === null &&
                    <>
                        <p className="text-lg text-white">
                            Enter how many $DRIP tokens you own to estimate your daily $OL rewards
                        </p>

                        <label className="block text-xl font-semibold text-secondary">Token Owned</label>
                        <input
                            type="text"
                            placeholder="E.g 10000"
                            value={tokenAmount}
                            onChange={(e) => setTokenAmount(e.target.value)}
                            className="w-full h-13 px-4 border border-white/60 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]/50"
                        />
                    </>
                }
                {
                    rewards !== null && <>
                        <Title type="heading" className="text-3xl font-bold text-center text-gradient-primary">100 SOL</Title>
                        <p className="block text-xl font-semibold text-center text-white">Every 24 Hours</p>
                    </>
                }


                {
                    rewards === null &&
                    <Button
                        onClick={handleCalculate}
                        className="w-full text-xl font-semibold text-white transition-opacity bg-gradient-primary hover:opacity-90 shadow-primary"
                    >
                        Calculate Rewards
                    </Button>
                }
            </div>
        </div>
    );
}