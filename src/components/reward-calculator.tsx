import { useEffect, useState } from 'react';
import { getAllTokenHolders, getAccountInfo, getTokenSolVolume, getTotalDistributedAmount } from '@/lib/helius-api';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';
import Title from './title';
const DRIP_TOKEN_ADDRESS = import.meta.env.VITE_DRIP_TOKEN_ADDRESS

interface RewardsCalculatorProps {
    open: boolean;
    onClose?: () => void;
}

const RewardsCalculator = ({ open, onClose }: RewardsCalculatorProps) => {
    const [rewards, setRewards] = useState<{ daily: number; dailyUSD: number; dailySOL: number } | null>(null);
    const [dripInput, setDripInput] = useState<number | null>(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dripDecimals, setDripDecimals] = useState<number>(9);
    useEffect(() => {
        if (open) {
            setRewards(null);
            setDripInput(0);
            setError(null);
        }
    }, [open]);
    useEffect(() => {
        async function fetchDecimals() {
            try {
                const response = await fetch('https://api.helius.xyz/v0/token-metadata?api-key=782d4993-d148-432a-b92a-aa23f59d0077', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mintAccounts: [DRIP_TOKEN_ADDRESS], includeOffChain: true })
                });
                const data = await response.json();
                const decimals = data?.[0]?.onChainAccountInfo?.accountInfo?.data?.parsed?.info?.decimals;
                if (typeof decimals === 'number') setDripDecimals(decimals);
            } catch { /* ignore error */ }
        }
        fetchDecimals();
        setRewards(null);
    }, []);

    const getDripSolPrice = async () => {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sol-drip&vs_currencies=usd');
            const data = await res.json();
            return data['sol-drip']?.usd || 0;
        } catch {
            return 0;
        }
    };

    const getSolPrice = async () => {
        try {
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const data = await res.json();
            return data['solana']?.usd || 0;
        } catch {
            return 0;
        }
    };

    const calculateRewardsInSOL = async () => {
        if (!dripInput || dripInput <= 0) {
            setError("Please enter a valid token amount");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const [, volumeRaw, holdersArr] = await Promise.all([
                getAccountInfo(DRIP_TOKEN_ADDRESS),
                getTokenSolVolume(),
                getAllTokenHolders()
            ]);

            const DRIP_DECIMALS = Math.pow(10, dripDecimals);
            const distributedRaw = await getTotalDistributedAmount(volumeRaw);
            const distributed = distributedRaw / DRIP_DECIMALS;
            const sumOfSqrtBalances = holdersArr.reduce((sum, holder) => sum + Math.sqrt(holder.amount / DRIP_DECIMALS), 0);
            const individualShare = sumOfSqrtBalances > 0
                ? (Math.sqrt((dripInput || 0)) / Math.sqrt(DRIP_DECIMALS)) / sumOfSqrtBalances * distributed
                : 0;
            const dripSolPrice = await getDripSolPrice();
            const solPrice = await getSolPrice();
            const individualShareUSD = individualShare * dripSolPrice;
            const individualShareSOL = solPrice > 0 ? individualShareUSD / solPrice : 0;
            setRewards({
                daily: individualShare,
                dailyUSD: individualShareUSD,
                dailySOL: individualShareSOL,
            });
        } catch (error) {
            console.error("Error calculating rewards:", error);
            setError("An error occurred while calculating rewards");
        } finally {
            setIsLoading(false);
        }
    };

    if (!open) return null;
    return (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-6 bg-black/70">
            <div className="relative flex flex-col gap-5 w-auto max-w-[744px] border border-primary/20 bg-[#202738] rounded-xl shadow-primary overflow-hidden px-3 md:px-13 py-10 md:py-7">
                <div className="flex relative justify-between items-center">
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
                        className="absolute top-0 right-3 text-xl font-bold text-white transition-colors cursor-pointer hover:text-gray-300"
                        onClick={onClose}
                    >
                        x
                    </div>
                </div>
                {
                    rewards === null ? (
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
                                value={dripInput?.toString() || ''}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9,]/g, '');
                                    setDripInput(value ? Number(value) : 0);
                                }}
                                className="w-full h-13 px-4 border border-white/60 rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]/50"
                            />

                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            <Button
                                onClick={calculateRewardsInSOL}
                                disabled={isLoading}
                                className="w-full text-xl font-semibold text-white transition-opacity bg-gradient-primary hover:opacity-90 shadow-primary"
                            >
                                {isLoading ? 'Calculating...' : 'Calculate Rewards'}
                            </Button>
                        </>

                    ) : (
                        <div className="flex flex-col gap-4 items-center py-4">
                            <div className="grid gap-4 w-full">
                                <div className="flex flex-col justify-center items-center">
                                    <Title className="text-xl font-bold text-center text-gradient-primary">
                                        {formatCurrency(rewards.dailySOL)} SOL
                                    </Title>
                                </div>
                            </div>

                            <p className="text-xl text-center text-white">
                                Every 24 Hours
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RewardsCalculator;
