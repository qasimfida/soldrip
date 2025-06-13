import { useEffect, useState } from 'react';
import type { RewardsCalculatorProps } from '@/types/reward-calculator';
import Title from './title';
import { Button } from './ui/button';
import { calculateRewards, getAllTokenHolders, getTokenVolume } from '@/lib/helius-api';
import { formatCurrency } from '@/lib/utils';

export const RewardsCalculator = ({ open, onClose }: RewardsCalculatorProps) => {
    const [tokenAmount, setTokenAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rewards, setRewards] = useState<{
        daily: number;
    } | null>(null);

    useEffect(() => {
        // Reset state when modal opens/closes
        if (!open) {
            setTokenAmount('');
            setRewards(null);
            setError(null);
        }
    }, [open]);

    const handleCalculate = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const amount = parseFloat(tokenAmount.replace(/,/g, '')) || 0;

            // Validate minimum token requirement
            if (amount < 100000) {
                setError('Minimum requirement is 100,000 $DRIP tokens');
                setIsLoading(false);
                return;
            }

            // Get current token trading volume and all holders
            const [volumeData, allHolders] = await Promise.all([
                getTokenVolume(),
                getAllTokenHolders()
            ]);

            console.log({ volumeData, allHolders });

            if (!volumeData) {
                throw new Error('Unable to fetch token volume data');
            }

            // Calculate estimated rewards
            const rewardData = calculateRewards(amount, volumeData.volumeUsd24h, allHolders);

            setRewards({
                daily: rewardData.dailyRewards,
            });

            setIsLoading(false);
        } catch (err) {
            console.error('Error calculating rewards:', err);
            setError('Error calculating rewards. Please try again.');
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70">
            <div className="relative flex flex-col gap-5 w-auto max-w-[744px] border border-primary/20 bg-[#202738] rounded-xl shadow-primary overflow-hidden px-3 md:px-13 py-10 md:py-7">
                <div className="relative flex items-center justify-between">
                    {rewards !== null ? (
                        <p className="w-full text-lg text-center text-white">
                            You will earn
                        </p>
                    ) : (
                        <Title type="heading" className="text-3xl font-bold text-secondary">
                            Rewards Calculator
                        </Title>
                    )}
                    <div
                        className="absolute top-0 text-xl font-bold text-white transition-colors cursor-pointer hover:text-gray-300 right-3"
                        onClick={onClose}
                    >
                        x
                    </div>
                </div>

                {rewards === null ? (
                    <>
                        <p className="text-lg text-white">
                            Enter how many $DRIP tokens you own to estimate your $SOL rewards
                        </p>

                        <label className="block text-xl font-semibold text-secondary">
                            Token Owned
                        </label>
                        <input
                            type="text"
                            placeholder="E.g 100,000"
                            value={tokenAmount}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9,]/g, '');
                                setTokenAmount(value);
                            }}
                            className="w-full h-13 px-4 border border-white/60 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]/50"
                        />

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <Button
                            onClick={handleCalculate}
                            disabled={isLoading}
                            className="w-full text-xl font-semibold text-white transition-opacity bg-gradient-primary hover:opacity-90 shadow-primary"
                        >
                            {isLoading ? 'Calculating...' : 'Calculate Rewards'}
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col items-center justify-center">
                                <Title className="text-xl font-bold text-center text-gradient-primary">
                                    {formatCurrency(rewards.daily)} SOL
                                </Title>
                            </div>
                        </div>

                        <p className="text-xl text-center text-white ">
                            Every 24 Hours
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}