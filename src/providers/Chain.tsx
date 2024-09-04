import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { useChainId, useAddress, useSwitchChain } from "@thirdweb-dev/react";
import ChainContext from "@/contexts/chain";
import config from "@/config/config";
import type { ChainObject } from "@/types/chain";
import { Address } from "thirdweb";

interface ChainProviderProps {
  children: ReactNode;
}

interface ChainContextValue {
  currentChainObject: ChainObject | null;
  connectedAddress: Address | null;
}

const ChainProvider = ({ children }: ChainProviderProps) => {
  const chainId = useChainId();
  const connectedAddress = useAddress();
  const [currentChainObject, setCurrentChainObject] = useState<ChainObject | null>(null);

  const switchChain = useSwitchChain();
  const address = useAddress();

  console.log("/providers/Chain", { chainId, connectedAddress, address });

  useEffect(() => {
    if (config[chainId as number]) {
      setCurrentChainObject(config[chainId as number] as ChainObject);
      if (address) {
        switchChain(chainId as number);
      }
    } else {
      const [firstChainId, firstChainConfig] = Object.entries(config)[0];
      console.warn(`Unknown chainId: ${chainId} - Using default chainId: ${firstChainId}`);
      setCurrentChainObject(firstChainConfig);
      if (address) {
        switchChain(Number(firstChainId));
      }
    }
  }, [address, chainId, switchChain]);

  const value = useMemo<ChainContextValue>(
    () => ({
      currentChainObject,
      connectedAddress: connectedAddress as Address | null
    }),
    [currentChainObject, connectedAddress]
  );

  return <ChainContext.Provider value={value}>{children}</ChainContext.Provider>;
};

export default ChainProvider;
