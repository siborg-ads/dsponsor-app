import React, { createContext, useState, useContext, ReactNode } from "react";
import config from "@/config/config";
import { ChainObject } from "@/types/chain";

interface SwitchChainContextType {
  selectedChain: ChainObject;
  setSelectedChain: React.Dispatch<React.SetStateAction<ChainObject>>;
}

const SwitchChainContext = createContext<SwitchChainContextType>({
  selectedChain: Object.values(config)[0],
  setSelectedChain: () => {}
});

interface SwitchChainProviderProps {
  children: ReactNode;
}

const SwitchChainProvider: React.FC<SwitchChainProviderProps> = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState<ChainObject>(Object.values(config)[0]);

  return (
    <SwitchChainContext.Provider
      value={{
        selectedChain,
        setSelectedChain
      }}
    >
      {children}
    </SwitchChainContext.Provider>
  );
};

const useSwitchChainContext = () => {
  return useContext(SwitchChainContext);
};

export { SwitchChainProvider, useSwitchChainContext };
