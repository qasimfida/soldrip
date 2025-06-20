import type { TokenHolderData, TokenSupply, HeliusApiResponse, TokenAccountsResult } from '@/types/helius';

// Helius API configuration
const env = import.meta.env;
const { VITE_HELIUS_API_KEY, VITE_BASE_URL, VITE_DRIP_TOKEN_ADDRESS, VITE_DISTRIBUTOR_ADDRESS, VITE_SOLSCAN_API_KEY, VITE_HELIUS_API } = env


export const getBalance = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"jsonrpc":"2.0","id":"1","method":"getBalance","params":["83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri"]}'
};



console.log({ env })
export interface HeliusEnhancedTransaction {
    signature: string;
    nativeTransfers?: {
        fromUserAccount?: string;
        toUserAccount?: string;
        amount: number;
    }[];
    fee?: number;
    feePayer?: string;
}


export async function getAllTokenHolders(): Promise<TokenHolderData[]> {
    try {
        let allHolders: TokenHolderData[] = [];
        let cursor: string | null = null;

        do {
            const response: Response = await fetch(`${VITE_BASE_URL}/?api-key=${VITE_HELIUS_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: '1',
                    method: 'getTokenAccounts',
                    params: {
                        mint: VITE_DRIP_TOKEN_ADDRESS,
                        cursor: cursor
                    },
                }),
            });

            const data: HeliusApiResponse<TokenAccountsResult> = await response.json();

            if (!data.result || !data.result.token_accounts) {
                break;
            }

            const holders = data.result.token_accounts.map((holder) => ({
                address: holder.address,
                amount: holder.amount,
                amountUsd: 0
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

export async function getAccountInfo(address: string): Promise<TokenSupply | null> {
    try {
        const response = await fetch(`${VITE_BASE_URL}/?api-key=${VITE_HELIUS_API_KEY}`, {
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
            return await getTokenSupplyFromDAS(address);
        }

        return {
            circulating: data.result.circulating_supply,
            total: data.result.total_supply,
        }
    } catch (error) {
        console.error('Error fetching token supply:', error);
        return await getTokenSupplyFromDAS(address);
    }
}

async function getTokenSupplyFromDAS(address: string): Promise<TokenSupply | null> {
    try {
        const response = await fetch(`${VITE_HELIUS_API}/token-metadata?api-key=${VITE_HELIUS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mintAccounts: [address],
                includeOffChain: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data[0] || !data[0].onChainAccountInfo || !data[0].onChainAccountInfo.accountInfo) {
            return null;
        }

        const accountInfo = data[0].onChainAccountInfo.accountInfo;
        const supply = accountInfo.data.parsed.info.supply;

        const decimals = accountInfo.data.parsed.info.decimals || 9;
        const totalSupply = Number(supply) / Math.pow(10, decimals);

        return {
            total: totalSupply,
            circulating: totalSupply,
        };
    } catch (error) {
        console.error('Error fetching token supply from DAS:', error);
        return null;
    }
}

export async function getTokenSolVolume(): Promise<number> {
    try {
        const response = await fetch(`${VITE_HELIUS_API}/token-metadata?api-key=${VITE_HELIUS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mintAccounts: [VITE_DRIP_TOKEN_ADDRESS],
                includeOffChain: true,
                disableCache: false,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data[0] || !data[0].onChainAccountInfo || !data[0].onChainAccountInfo.accountInfo || !data[0].onChainAccountInfo.accountInfo.data.parsed.info.supply) {
            return simulateTokenVolume();
        }

        const metadata = data[0].onChainAccountInfo.accountInfo.data.parsed.info.supply;
        if (metadata) {
            return Number(metadata)
        }
        return simulateTokenVolume();
    } catch (error) {
        console.error('Error fetching token SOL volume:', error);
        return simulateTokenVolume();
    }
}


function simulateTokenVolume(): number {
    const baseVolume = 1000;
    const randomFactor = 0.8 + Math.random() * 0.4;
    return baseVolume * randomFactor;
}

export async function getTotalDistributedAmount(
    dailyVolume: number,
    revSharePercentage: number = 0.69
): Promise<number> {
    if (dailyVolume <= 0) {
        return 0;
    }
    return dailyVolume * revSharePercentage;
}

export async function getTotalSolReceived(address: string): Promise<number> {
    let totalSol = 0;
    let page = 1;
    const PAGE_SIZE = 100;

    try {
        while (true) {
            const url = `https://pro-api.solscan.io/v2.0/account/transfer?address=${address}&page=${page}&page_size=${PAGE_SIZE}&sort_by=block_time&sort_order=desc&remove_spam=true&exclude_amount_zero=true&token=So11111111111111111111111111111111111111111`;

            const requestOptions = {
                method: "GET",
                headers: { "token": VITE_SOLSCAN_API_KEY }
            };

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error('Failed to fetch data from Solscan Pro API');
            }

            const data = await response.json();

            if (!data.data || data.data.length === 0) break;

            for (const tx of data.data) {
                if (tx.flow === "in" && tx.from_address === VITE_DISTRIBUTOR_ADDRESS && tx.to_address === address) {
                    const actualAmount = tx.amount / Math.pow(10, tx.token_decimals);
                    totalSol += actualAmount;
                }
            }

            if (data.data.length < PAGE_SIZE) break;

            page++;
        }

        return totalSol;
    } catch (error) {
        console.error('Error fetching Solscan Pro data:', error);
        throw new Error('Failed to fetch transaction data from Solscan Pro API');
    }
}
