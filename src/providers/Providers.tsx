import React, { useEffect, useState } from "react";
import { Ethereum, Polygon, BaseSepoliaTestnet, Sepolia, Base } from "@thirdweb-dev/chains";
import {
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  ThirdwebProvider,
  useAddress,
  useBalance,
  useChainId,
  walletConnect
} from "@thirdweb-dev/react";
import ChainProvider from "@/providers/Chain";
import { SwitchChainProvider } from "@/providers/SwitchChain";
import { useSwitchChainContext } from "@/hooks/useSwitchChainContext";
import config from "@/config/config";
import { clientId } from "@/data/services/client";
import { features } from "@/data/features";
import { Address } from "thirdweb";

interface GasslessContextValue {
  balance: bigint | undefined;
  address: Address | undefined;
  setBalance: React.Dispatch<React.SetStateAction<bigint | undefined>>;
  setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
  chainId: number | undefined;
  setChainId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GaslessContext = React.createContext<GasslessContextValue>({
  balance: undefined,
  address: undefined,
  setBalance: () => undefined,
  setAddress: () => undefined,
  chainId: undefined,
  setChainId: () => undefined
});

function GaslessProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const value = { balance, address, chainId, setBalance, setAddress, setChainId };

  return <GaslessContext.Provider value={value}>{children}</GaslessContext.Provider>;
}

function GaslessCollector({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setBalance, setAddress, setChainId } = React.useContext(GaslessContext);

  const address = useAddress();
  const chainId = useChainId();
  const { data: balance } = useBalance();

  useEffect(() => {
    if (balance && address) {
      const bigInt = BigInt(balance?.value?.toString());
      setBalance(bigInt);
    }
  }, [address, balance, setBalance]);

  useEffect(() => {
    if (address !== undefined) {
      setAddress(address as Address);
    }
  }, [address, setAddress]);

  useEffect(() => {
    if (chainId !== undefined) {
      setChainId(chainId);
    }
  }, [chainId, setChainId]);

  return <>{children}</>;
}

function Providers({ children }) {
  return (
    <SwitchChainProvider>
      <GaslessProvider>
        <InnerProviders>{children}</InnerProviders>
      </GaslessProvider>
    </SwitchChainProvider>
  );
}

function InnerProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  const [chain, setChain] = useState(Object.values(config)[0]?.network);
  const [sdkOptions, setSdkOptions] = useState<Record<string, any> | undefined>(undefined);

  const { selectedChain } = useSwitchChainContext();
  const { balance, address, chainId } = React.useContext(GaslessContext);

  useEffect(() => {
    if (selectedChain) {
      setChain(selectedChain);
    }
  }, [selectedChain]);

  useEffect(() => {
    if (chainId && balance && address) {
      const relayerURL = config?.[chainId]?.features?.openZeppelinDefender?.relayerURL;
      const balanceThreshold = BigInt(config?.[chainId]?.gaslessBalanceThreshold ?? 0);
      const gaslessBalanceCondition = balanceThreshold && balance < balanceThreshold;

      const sdkOptions =
        features?.canUseGaslessTransactions && gaslessBalanceCondition
          ? {
              gasless: {
                openzeppelin: {
                  relayerUrl: relayerURL
                }
              }
            }
          : undefined;

      setSdkOptions(sdkOptions);
    }
  }, [balance, address, chainId]);

  const sdkOptionsKey = React.useMemo(() => JSON.stringify(sdkOptions), [sdkOptions]);

  return (
    <ThirdwebProvider
      key={sdkOptionsKey}
      {...(sdkOptions && { sdkOptions })}
      activeChain={chain}
      clientId={clientId}
      supportedChains={[Base, Ethereum, BaseSepoliaTestnet, Sepolia, Polygon]}
      authConfig={{ domain: "dsponsor.com" }}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: { options: ["email", "google", "apple", "facebook"] }
        })
      ]}
    >
      <ChainProvider>
        <GaslessCollector>{children}</GaslessCollector>
      </ChainProvider>
    </ThirdwebProvider>
  );
}

export default Providers;
