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
}

const GaslessContext = React.createContext<GasslessContextValue | undefined>(undefined);

function GaslessProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  const value = { balance, address, setBalance, setAddress };

  return <GaslessContext.Provider value={value}>{children}</GaslessContext.Provider>;
}

function GaslessCollector({ children }: Readonly<{ children: React.ReactNode }>) {
  const { setBalance, setAddress } = React.useContext(GaslessContext) as GasslessContextValue;

  const address = useAddress();
  const { data: balance } = useBalance();

  useEffect(() => {
    if (balance) {
      const bigInt = BigInt(balance?.value?.toString());
      setBalance(bigInt);
    }
  }, [balance, setBalance]);

  useEffect(() => {
    if (address !== undefined) {
      setAddress(address as Address);
    }
  }, [address, setAddress]);

  return <>{children}</>;
}

function Providers({ children }) {
  return (
    <SwitchChainProvider>
      <InnerProviders>{children}</InnerProviders>
    </SwitchChainProvider>
  );
}

function InnerProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  const [chain, setChain] = useState(Object.values(config)[0]?.network);
  const { selectedChain } = useSwitchChainContext();
  const { address, balance } = React.useContext(GaslessContext) as GasslessContextValue;

  useEffect(() => {
    if (selectedChain) {
      setChain(selectedChain);
    }
  }, [selectedChain]);

  const relayerURL = config?.[chain?.chainId as number]?.features?.openZeppelinDefender?.relayerURL;
  const balanceThreshold =
    config?.[chain?.chainId as number]?.features?.crossmint?.config?.priceLimit;
  const gaslessBalanceCondition = balance && balance < BigInt(balanceThreshold);

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

  return (
    <GaslessProvider>
      <ThirdwebProvider
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
    </GaslessProvider>
  );
}

export default Providers;
