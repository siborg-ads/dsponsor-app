import React, { createContext, useState, useMemo, ReactNode } from "react";
import config from "@/config/config";

interface SwitchChainContextType {
  selectedChain: number;
  setSelectedChain: React.Dispatch<React.SetStateAction<number>>;
}

const SwitchChainContext = createContext<SwitchChainContextType | undefined>(undefined);

interface SwitchChainProviderProps {
  children: ReactNode;
}

const SwitchChainProvider: React.FC<SwitchChainProviderProps> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState(parseFloat(Object.keys(config)[0]));

  const contextValue = useMemo(() => {
    return {
      selectedChain,
      setSelectedChain
    };
  }, [selectedChain, setSelectedChain]);

  return <SwitchChainContext.Provider value={contextValue}>{children}</SwitchChainContext.Provider>;
};

export { SwitchChainProvider, SwitchChainContext };
