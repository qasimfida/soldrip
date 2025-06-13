// Helius API configuration
const HELIUS_API_KEY = '782d4993-d148-432a-b92a-aa23f59d0077';
const BASE_URL = 'https://mainnet.helius-rpc.com';

// Token constants
export const DRIP_TOKEN_ADDRESS = 'w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV';
const MIN_TOKEN_THRESHOLD = 100000; // Minimum tokens for rewards

// Interface for token holder data
export interface TokenHolderData {
    address: string;
    amount: number;
    amountUsd: number;
}

export interface TokenSupply {
    circulating: number;
    total: number;
}

interface HeliusApiResponse<T> {
    jsonrpc: string;
    id: string;
    result: T;
}

interface TokenAccount {
    address: string;
    amount: number;
}

interface TokenAccountsResult {
    token_accounts: TokenAccount[];
    cursor: string | null;
}

interface TokenVolumeResult {
    volume: number;
    volumeUsd: number;
}

// Interface for token volume data  
export interface TokenVolumeData {
    volume24h: number;
    volumeUsd24h: number;
}

// Interface for reward calculation
export interface RewardCalculation {
    dailyRewards: number;
}

export interface HeliusEnhancedTransaction {
    signature: string;
    nativeTransfers?: {
        toUserAccount?: string;
        amount: number;
    }[];
}

/**
 * Get all token holders for the DRIP token
 */
export async function getAllTokenHolders(): Promise<TokenHolderData[]> {
    try {
        let allHolders: TokenHolderData[] = [];
        let cursor: string | null = null;

        do {
            const response: Response = await fetch(`${BASE_URL}/?api-key=${HELIUS_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: '1',
                    method: 'getTokenAccounts',
                    params: {
                        mint: DRIP_TOKEN_ADDRESS,
                        cursor: cursor
                    },
                }),
            });

            const data: HeliusApiResponse<TokenAccountsResult> = await response.json();

            if (!data.result || !data.result.token_accounts) {
                break;
            }

            const holders = data.result.token_accounts.map((holder: TokenAccount) => ({
                address: holder.address,
                amount: holder.amount,
                amountUsd: 0 // We don't need USD amount for this calculation
            }));

            allHolders = allHolders.concat(holders);
            cursor = data.result.cursor;

        } while (cursor);

        return allHolders;
    } catch (error) {
        console.error('Error fetching token holders:', error);
        return [];
    }
}

/**
 * Get token supply for a specific wallet address
 */
export async function getAccountInfo(address: string): Promise<TokenSupply | null> {
    try {
        const response = await fetch(`${BASE_URL}/?api-key=${HELIUS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                jsonrpc: '2.0',
                id: '1',
                method: 'getTokenSupply',
                params: [address]
            })

        });

        const data = await response.json();

        if (!data.result) {
            return null;
        }

        return {
            circulating: data.result.circulating_supply,
            total: data.result.total_supply,
        }
    } catch (error) {
        console.error('Error fetching token supply:', error);
        return null;
    }
}

/**
 * Get token balance for a specific wallet address
 */
export async function getTokenBalance(walletAddress: string): Promise<TokenHolderData | null> {
    try {
        const response = await fetch(`${BASE_URL}/?api-key=${HELIUS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: '1',
                method: 'getTokenAccounts',
                params: {
                    wallet: walletAddress,
                },
            }),
        });
        const data = await response.json();

        if (!data.result) {
            return null;
        }

        // Find DRIP token in accounts
        const dripAccount = data.result.find(
            (account: { mint: string }) => account.mint === DRIP_TOKEN_ADDRESS
        );

        if (!dripAccount) {
            return null;
        }

        // Get token price for USD conversion
        const priceData = await getTokenPrice();
        const amountUsd = dripAccount.amount * (priceData?.price || 0);

        return {
            address: walletAddress,
            amount: dripAccount.amount,
            amountUsd: amountUsd,
        };
    } catch (error) {
        console.error('Error fetching token balance:', error);
        return null;
    }
}

/**
 * Get the current price of DRIP token
 */
export async function getTokenPrice(): Promise<{ price: number } | null> {
    try {
        const response = await fetch(`${BASE_URL}/?api-key=${HELIUS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: '1',
                method: 'getTokenPrice',
                params: {
                    mint: DRIP_TOKEN_ADDRESS,
                },
            }),
        });

        const data = await response.json();

        if (!data.result) {
            return null;
        }

        return {
            price: data.result.price || 0,
        };
    } catch (error) {
        console.error('Error fetching token price:', error);
        return null;
    }
}

/**
 * Get DRIP token 24h trading volume
 */
export async function getTokenVolume(): Promise<TokenVolumeData | null> {
    try {
        const response = await fetch(`${BASE_URL}/?api-key=${HELIUS_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"jsonrpc":"2.0","id":"1","method":"getTokenAccountBalance","params":["3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa"]}'
        });

        const data: HeliusApiResponse<TokenVolumeResult> = await response.json();
        if (!data.result) {
            return null;
        }
        return {
            volume24h: data.result.volume || 0,
            volumeUsd24h: data.result.volumeUsd || 0,
        };
    } catch (error) {
        console.error('Error fetching token volume:', error);
        return null;
    }
}

/**
 * Calculate rewards based on the Square Root Distribution Formula
 */
export function calculateRewards(tokenAmount: number, volumeUsd: number, allHolders: TokenHolderData[]): RewardCalculation {
    // Only calculate rewards if user has minimum required tokens
    if (tokenAmount < MIN_TOKEN_THRESHOLD) {
        return {
            dailyRewards: 0,
        };
    }

    // Distribution formula:
    // - 69% of volume distributed to holders based on square root of their holdings
    // - Rewards are in SOL
    const HOLDER_REWARD_PERCENTAGE = 0.69;

    // Calculate sum of square roots of all holders' balances
    const sumOfSqrtBalances = allHolders.reduce((sum, holder) => {
        return sum + Math.sqrt(holder.amount);
    }, 0);

    if (sumOfSqrtBalances === 0) {
        return { dailyRewards: 0 };
    }

    // Calculate holder's weight
    const holderSqrtBalance = Math.sqrt(tokenAmount);

    // Calculate holder's share
    const holderShare = holderSqrtBalance / sumOfSqrtBalances;

    // Calculate daily SOL rewards
    const dailyVolumeRewards = volumeUsd * HOLDER_REWARD_PERCENTAGE;
    const dailyRewards = dailyVolumeRewards * holderShare;

    return {
        dailyRewards,
    };
}

/**
 * Simulates fetching historical rewards data
 * In a real application, this would fetch actual historical data from an API
 */
export async function getHistoricalRewards(walletAddress: string): Promise<number> {
    const ENHANCED_BASE_URL = `https://api.helius.xyz/v0/addresses`;
    let allTransactions: HeliusEnhancedTransaction[] = [];
    let lastSignature: string | null = null;

    try {
        while (true) {
            const url = `${ENHANCED_BASE_URL}/${walletAddress}/transactions?api-key=${HELIUS_API_KEY}${lastSignature ? `&before=${lastSignature}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                console.error(`API error: ${response.status} ${response.statusText}`);
                // Stop paginating on error
                break;
            }

            const transactions: HeliusEnhancedTransaction[] = await response.json();
            console.log({ transactions });
            if (transactions.length === 0) {
                // No more transactions to fetch
                break;
            }

            allTransactions = allTransactions.concat(transactions);
            lastSignature = transactions[transactions.length - 1].signature;

            // Helius API has a limit of 100 per request, if less, we are at the end
            if (transactions.length < 100) {
                break;
            }
        }

        const totalRewardsLamports = allTransactions.reduce((total, tx) => {
            if (tx.nativeTransfers) {
                const incomingAmount = tx.nativeTransfers
                    .filter(transfer => transfer.toUserAccount === walletAddress)
                    .reduce((sum, transfer) => sum + transfer.amount, 0);
                return total + incomingAmount;
            }
            return total;
        }, 0);

        return totalRewardsLamports / 1_000_000_000;

    } catch (error) {
        console.error('Error fetching historical rewards:', error);
        return 0;
    }
}