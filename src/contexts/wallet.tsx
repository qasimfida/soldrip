import { DRIP_TOKEN_ADDRESS, getAccountInfo } from "@/lib/helius-api";
import type { TokenSupply } from "@/lib/helius-api";
import { createContext, useContext, useEffect, useState } from "react";

interface WalletContextType {
    address: string;
    setAddress: (address: string) => void;
    info: TokenSupply | null;
}

const WalletContext = createContext<WalletContextType>({
    address: '',
    setAddress: () => { },
    info: null,
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [address, setAddress] = useState<string>('');
    const [info, setInfo] = useState<TokenSupply | null>(null);

    useEffect(() => {
        const fetchInfo = async () => {
            const accountInfo = await getAccountInfo(DRIP_TOKEN_ADDRESS);
            setInfo(accountInfo);
        };
        fetchInfo();
    }, []);

    return <WalletContext.Provider value={{ address, setAddress, info }}>{children}</WalletContext.Provider>;
};

const useWallet = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWallet };