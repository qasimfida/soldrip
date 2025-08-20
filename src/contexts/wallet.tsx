import { createContext, useContext, useState } from "react";

interface WalletContextType {
    address: string;
    setAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextType>({
    address: '',
    setAddress: () => { },
});

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [address, setAddress] = useState<string>('');


    return <WalletContext.Provider value={{ address, setAddress }}>{children}</WalletContext.Provider>;
};

const useWallet = () => {
    return useContext(WalletContext);
};

export { WalletProvider, useWallet };