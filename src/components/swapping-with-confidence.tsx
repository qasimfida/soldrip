declare global {
    interface Window { solana?: any }
}
import { useEffect, useState } from "react";
import { Container } from "./container";
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
const DRIP_MINT = 'w131jbryFvFEmtqmZvx42Meiuc4Drmu3nodTdVgkREV';
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const JUP_API_KEY = 'd64d5f26-83b4-4ef9-8c06-02298cdb4d23';
const RPC_ENDPOINT = "https://mainnet.helius-rpc.com/?api-key=782d4993-d148-432a-b92a-aa23f59d0077";
const USDT_MINT = 'Es9vMFrzaCERk8b1r5p6QkQJc5uQh6vEihwM6rvz5F9';
import { Buffer } from 'buffer';
import { Button } from "./ui/button";
import SwapIcon from "./icons/swap-icon";

const SwapeWithConfidence = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [amount, setAmount] = useState(""); // string for input
    const [usdtValue, setUsdtValue] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [swapDirection, setSwapDirection] = useState<"SOL_TO_DRIP" | "DRIP_TO_SOL">("SOL_TO_DRIP");
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (window.solana && window.solana.isConnected && window.solana.publicKey) {
            setWalletAddress(window.solana.publicKey.toString());
        } else {
            connectWallet()
        }
    }, []);

    useEffect(() => {
        if (!walletAddress) return;
        const connection = new Connection(RPC_ENDPOINT);
        if (swapDirection === "SOL_TO_DRIP") {
            connection.getBalance(new PublicKey(walletAddress)).then(lamports => {
                setBalance(lamports / 1e9);
            });
        } else {
            connection.getTokenAccountsByOwner(new PublicKey(walletAddress), {
                mint: new PublicKey(DRIP_MINT)
            }).then(res => {
                if (res.value.length === 0) {
                    setBalance(0);
                } else {
                    const accountInfo = res.value[0].account.data;
                    console.log({ accountInfo });
                    setBalance(0);
                }
            });
        }
    }, [walletAddress, swapDirection]);

    useEffect(() => {
        if (!amount || isNaN(Number(amount))) {
            setUsdtValue("");
            return;
        }
        const fetchUSDT = async () => {
            const inputMint = swapDirection === "SOL_TO_DRIP" ? SOL_MINT : DRIP_MINT;
            const outputMint = USDT_MINT;
            const lamports = Math.floor(parseFloat(amount) * 1e9);
            const quoteRes = await fetch(
                `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${lamports}`,
                { headers: { 'apikey': JUP_API_KEY } }
            );
            const quote = await quoteRes.json();
            if (quote.outAmount) {
                setUsdtValue((Number(quote.outAmount) / 1e6).toFixed(2));
            } else {
                setUsdtValue("0.00");
            }
        };
        fetchUSDT();
    }, [amount, swapDirection]);

    const connectWallet = async () => {
        if (window.solana) {
            try {
                const resp = await window.solana.connect();
                setWalletAddress(resp.publicKey.toString());
            } catch {
                alert("Wallet connection failed!");
            }
        } else {
            alert("Phantom wallet not found!");
        }
    };

    const handleSwap = async () => {
        if (!walletAddress) {
            alert("Connect your wallet first!");
            return;
        }
        setLoading(true);

        const inputMint = swapDirection === "SOL_TO_DRIP" ? SOL_MINT : DRIP_MINT;
        const outputMint = swapDirection === "SOL_TO_DRIP" ? DRIP_MINT : SOL_MINT;
        const lamports = Math.floor(parseFloat(amount) * 1e9);

        const quoteRes = await fetch(
            `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${lamports}`,
            { headers: { 'apikey': JUP_API_KEY } }
        );
        const quote = await quoteRes.json();

        const swapRes = await fetch('https://quote-api.jup.ag/v6/swap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': JUP_API_KEY },
            body: JSON.stringify({
                quoteResponse: quote,
                userPublicKey: window.solana.publicKey.toString(),
                wrapUnwrapSOL: true
            })
        });
        const { swapTransaction } = await swapRes.json();

        const transaction = VersionedTransaction.deserialize(Buffer.from(swapTransaction, 'base64'));
        const connection = new Connection(RPC_ENDPOINT);
        const signed = await window.solana.signTransaction(transaction);
        const txid = await connection.sendRawTransaction(signed.serialize());
        alert('Swap sent! Txid: ' + txid);
        setLoading(false);
    };

    const insufficient = !!amount && parseFloat(amount) > balance;


    return (
        <section id="swapping-confidence" className="mb-16 md:mb-20 pt-26 -mt-26">
            <Container className="py-11 md:py-18">
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
                                <div className="relative w-full h-15 gradient-border">
                                    <div className="w-full h-15 gradient-border-inner">
                                        <input
                                            type="text"
                                            placeholder={swapDirection === "SOL_TO_DRIP" ? "$SOL" : "$DRIP"}
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            className="mx-auto w-full max-w-full h-full text-left text-white rounded-lg border-0 outline-none placeholder:text-muted"
                                        />
                                    </div>
                                </div>
                                <div className="text-right text-sm absolute right-12 top-25 text-[#D9DADF] mt-2 mb-2">
                                    {usdtValue && <>≈ {usdtValue} USDT</>}
                                </div>
                                <div className="my-3 text-center cursor-pointer" onClick={() => setSwapDirection(swapDirection === "SOL_TO_DRIP" ? "DRIP_TO_SOL" : "SOL_TO_DRIP")}>
                                    <SwapIcon />
                                </div>
                                <div className="relative w-full h-15 gradient-border">
                                    <div className="w-full h-15 gradient-border-inner">
                                        <input
                                            type="text"
                                            placeholder={swapDirection === "SOL_TO_DRIP" ? "$DRIP" : "$SOL"}
                                            readOnly
                                            className="mx-auto w-full max-w-full h-full text-left text-white rounded-lg border-0 outline-none placeholder:text-muted"
                                        />
                                    </div>
                                </div>

                                <div className="block w-full text-right text-base text-[#D9DADF] mt-3 mb-10">
                                    Balance: {balance.toFixed(6)}
                                </div>
                                {walletAddress ? (
                                    <Button
                                        onClick={handleSwap}
                                        className="block right-0 left-0 px-8 mx-auto w-full text-xl font-semibold rounded-full bg-gradient-primary md:px-12 shadow-primary"
                                        disabled={loading || insufficient}
                                    >
                                        {insufficient ? "Insufficient Balance" : "Swap"}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={connectWallet}
                                        className="block right-0 left-0 px-8 mx-auto w-full text-xl font-semibold rounded-full bg-gradient-primary md:px-12 shadow-primary"
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
