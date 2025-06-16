export interface TokenHolderData {
    address: string;
    amount: number;
    amountUsd: number;
}

export interface TokenSupply {
    circulating: number;
    total: number;
}

export interface HeliusApiResponse<T> {
    jsonrpc: string;
    id: string;
    result: T;
}

export interface TokenAccount {
    address: string;
    amount: number;
}

export interface TokenAccountsResult {
    token_accounts: TokenAccount[];
    cursor: string | null;
}

