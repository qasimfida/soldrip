declare global {
    interface Window { solana?: any }
}
import { useEffect, useState, useCallback } from "react";
import { Container } from "./container";
import { Connection, VersionedTransaction } from '@solana/web3.js';
import { Button } from "./ui/button";
import SwapIcon from "./icons/swap-icon";
import { Select } from "./select";
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Buffer } from 'buffer';
import { toast } from "sonner";
import { debounce } from "@/lib/utils";


const SOL_MINT = import.meta.env.VITE_SOL_MINT || "So11111111111111111111111111111111111111112";
const SOL_DRIP_MINT = import.meta.env.VITE_DRIP_TOKEN_ADDRESS || "w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV";

const TOKENS = [
    SOL_MINT,
    SOL_DRIP_MINT
]

interface SolanaAsset {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
    [key: string]: any; // for extra fields from API
}

const TokenSelect = ({ options, value, setValue, disabled }: {
    options?: SolanaAsset[];
    value: SolanaAsset | null;
    setValue: (asset: SolanaAsset) => void;
    disabled?: boolean;
}) => (
    <Select options={options} value={value} setValue={setValue} disabled={disabled} />
);

type TokenInputProps = {
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    placeholder: string;
}

type SwapButtonProps = {
    onClick: () => void;
    loading: boolean;
    disabled: boolean;
    children: React.ReactNode;
}

const TokenInput = ({ value, onChange, disabled, placeholder }: TokenInputProps) => (
    <input
        type="number"
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className="mx-auto w-full max-w-full h-full text-left text-white rounded-lg border-0 outline-none placeholder:text-muted"
    />
);

const SwapButton = ({ onClick, loading, disabled, children }: SwapButtonProps) => (
    <Button
        onClick={onClick}
        disabled={loading || disabled}
        className="block right-0 left-0 px-8 mx-auto w-full text-xl font-semibold rounded-full bg-gradient-primary md:px-12 shadow-primary"
    >
        {loading ? 'Loading...' : children}
    </Button>
);

const SwapeWithConfidence = () => {
    const [fromAsset, setFromAsset] = useState<SolanaAsset | null>(null);
    const [toAsset, setToAsset] = useState<SolanaAsset | null>(null);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);
    const [quoteResponse, setQuoteResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [direction, setDirection] = useState<'up' | 'down'>('up');
    const { setVisible } = useWalletModal();

    // const [error, setError] = useState<Error | null>(null);
    // const env = import.meta.env;

    useEffect(() => {
        async function fetchSolanaAssets() {
            try {
                const allAssets: SolanaAsset[] = [];
                await Promise.all(TOKENS.map(async (token) => {
                    const res = await fetch(`https://datapi.jup.ag/v1/assets/search?query=${token}`);
                    const response: SolanaAsset[] = await res.json();
                    allAssets.push(response[0]);
                }))

                setFromAsset(allAssets[0]);
                setToAsset(allAssets[1]);
            } catch (err) {
                console.log({ err })
                // setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setLoading(false);
            }
        }
        fetchSolanaAssets();
    }, []);
    const wallet = useWallet();
    const connection = new Connection(
        `https://mainnet.helius-rpc.com/?api-key=782d4993-d148-432a-b92a-aa23f59d0077`
    );


    const handleFromAssetChange = (asset: SolanaAsset) => {
        setFromAsset(asset);
    };
    const handleToAssetChange = (asset: SolanaAsset) => {
        setToAsset(asset);
    };

    const handleDirection = () => {
        setDirection(direction === "up" ? "down" : "up");
        setFromAsset(toAsset);
        setToAsset(fromAsset);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    }
    const handleFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(Number(event.target.value));
    };
    const debounceQuoteCall = useCallback(debounce((currentAmount: number, from: SolanaAsset | null, to: SolanaAsset | null) => {
        if (from && to) getQuote(currentAmount, from, to);
    }, 500), []);
    useEffect(() => {
        debounceQuoteCall(fromAmount, fromAsset, toAsset);
    }, [fromAmount, fromAsset, toAsset, debounceQuoteCall]);

    async function getQuote(currentAmount: number, fromAsset: SolanaAsset, toAsset: SolanaAsset) {
        if (isNaN(currentAmount) || currentAmount <= 0) {
            setToAmount(0);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const url = `https://ultra-api.jup.ag/order?inputMint=${fromAsset.id}&outputMint=${toAsset.id}&amount=${currentAmount * 10 ** fromAsset.decimals}&swapMode=ExactIn`;
            const quote = await (await fetch(url)).json();
            if (quote && quote.outAmount) {
                const outAmountNumber = Number(quote.outAmount) / 10 ** toAsset.decimals;
                setToAmount(outAmountNumber);
            } else {
                setToAmount(0);
            }
            setQuoteResponse(quote);
        } catch (e) {
            toast.error('Quote Error', {
                description: 'Failed to fetch quote. Please try again.'
            });
            setToAmount(0);
        } finally {
            setLoading(false);
        }
    }

    async function signAndSendTransaction(retry = false) {
        if (!wallet.signTransaction) {
            toast.error('Wallet not ready', {
                description: 'Please connect a wallet that supports transaction signing.'
            });
            return;
        }
        setLoading(true);
        try {
            const { swapTransaction, blockhash, lastValidBlockHeight } = await (
                await fetch('https://quote-api.jup.ag/v6/swap', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quoteResponse,
                        userPublicKey: wallet.publicKey?.toString(),
                        wrapAndUnwrapSol: true,
                    }),
                })
            ).json();
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            console.log({ swapTransactionBuf })

            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            const signedTransaction = await wallet.signTransaction(transaction);
            const rawTransaction = signedTransaction.serialize();
            const txid = await connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                maxRetries: 2,
            });
            await connection.confirmTransaction({
                blockhash,
                lastValidBlockHeight,
                signature: txid
            }, 'confirmed');
            toast.success('Swap sent!', {
                description: `Txid: ${txid}`
            });
        } catch (error: unknown) {
            let message = 'Unknown error';
            if (typeof error === 'object' && error !== null) {
                // @ts-ignore
                message = error.message || message;
            }
            if (
                // @ts-ignore
                error?.name === 'TransactionExpiredBlockheightExceededError' ||
                // @ts-ignore
                (error?.message && error?.message?.includes('block height exceeded'))
            ) {
                if (!retry) {
                    await signAndSendTransaction(true);
                } else {
                    toast.error('Transaction failed', {
                        description: 'Blockhash expired. Please try again.'
                    });
                }
            } else {
                toast.error('Error sending transaction', {
                    description: message
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const connectWallet = async () => {
        if (!wallet.connected) {
            setVisible(true);
        } else {
            try {
                const resp: any = await wallet.connect();
                toast.success('Wallet connected', {
                    description: resp?.publicKey?.toString() || ''
                });
            } catch {
                toast.error('Wallet connection failed', {
                    description: 'Please try again or use a different wallet.'
                });
            }
        }
    };

    return (
        <section id="swapping-confidence" className="mb-16 md:mb-20 pt-26 -mt-26">
            <Container className="py-1">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="flex flex-col gap-5">
                        <h1 className=" font-bold  uppercase text-uppercase text-xl leading-13 md:text-[32px]">
                            <span className="text-gradient-primary">SWAP WITH</span> CONFIDENCE
                        </h1>
                        <p className="text-2xl font-normal leading-8 text-white">
                            This swap is powered by Jupiter Exchange, ensuring you get the best available price for DRIP on Solana.
                        </p>
                        <p className="text-2xl font-normal leading-8 text-white">
                            You control your wallet—we never touch your funds.
                        </p>
                        <div className="bg-[#3B2A5A] rounded-xl p-6 text-white text-base md:text-xl mt-4">
                            Try starting with 1-5 SOL to see how the DRIP ecosystem mechanics work. Even small amounts make a visible impact on our market and
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex flex-col max-w-[527px] items-center justify-center  rounded-[24px] bg-gradient-primary p-[1px] w-full h-auto">
                            <div className="relative flex flex-col items-center p-10 rounded-[24px] bg-[#030014] h-full w-full">
                                <div className="relative w-full" >
                                    <div className="flex relative z-0 justify-center items-center w-full h-15 gradient-border">
                                        <div className="w-full h-15 gradient-border-inner">
                                            <TokenInput placeholder={`$${fromAsset?.symbol || "SOL"}`} value={fromAmount} onChange={handleFromValueChange} disabled={loading} />
                                        </div>
                                    </div>
                                    <TokenSelect value={fromAsset} setValue={handleFromAssetChange} disabled={loading} />
                                </div>
                                <div className="my-3 text-center cursor-pointer" onClick={handleDirection}>
                                    <SwapIcon />
                                </div>
                                <div className="relative mb-10 w-full" >
                                    <div className="flex relative z-0 justify-center items-center w-full h-15 gradient-border">
                                        <div className="w-full h-15 gradient-border-inner">
                                            <TokenInput placeholder={`$${toAsset?.symbol || "DRIP"}`} value={toAmount} onChange={() => { }} disabled={true} />
                                        </div>
                                    </div>
                                    <TokenSelect value={toAsset} setValue={handleToAssetChange} disabled={loading} />
                                </div>
                                {wallet.connected ? (
                                    <SwapButton onClick={signAndSendTransaction} loading={loading} disabled={fromAmount <= 0 || !quoteResponse}>
                                        Swap
                                    </SwapButton>
                                ) : (
                                    <Button
                                        onClick={connectWallet}
                                        className="block right-0 left-0 px-8 mx-auto w-full text-xl font-semibold rounded-full bg-gradient-primary md:px-12 shadow-primary"
                                        disabled={loading}
                                    >
                                        Connect Wallet
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SwapeWithConfidence;
