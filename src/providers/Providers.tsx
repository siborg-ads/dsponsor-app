import React, { useEffect, useState } from "react";
import { Ethereum, Polygon, BaseSepoliaTestnet, Sepolia, Base } from "@thirdweb-dev/chains";
import {
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  ThirdwebProvider as ThirdwebProviderV4,
  useAddress,
  useBalance,
  useChainId,
  walletConnect
} from "@thirdweb-dev/react"; // v4
import { SwitchChainProvider, useSwitchChainContext } from "@/providers/SwitchChain";
import config from "@/config/config";
import { clientId } from "@/data/services/client";
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

  const value = React.useMemo(
    () => ({ balance, address, setBalance, setAddress, chainId, setChainId }),
    [balance, address, chainId]
  );

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
      const OZrelayer = config?.[chainId]?.features?.openZeppelinDefender?.relayerURL;
      const balanceThreshold = BigInt(config?.[chainId]?.gaslessBalanceThreshold ?? "0");
      const gaslessBalanceCondition = balanceThreshold && balance < balanceThreshold;

      const sdkOptions =
        OZrelayer && gaslessBalanceCondition
          ? {
              gasless: {
                openzeppelin: {
                  relayerUrl: OZrelayer
                }
              }
            }
          : undefined;

      setSdkOptions(sdkOptions);
    }
  }, [balance, address, chainId]);

  const sdkOptionsKey = React.useMemo(() => JSON.stringify(sdkOptions), [sdkOptions]);

  return (
    <ThirdwebProviderV4
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
      <GaslessCollector>{children}</GaslessCollector>
    </ThirdwebProviderV4>
  );
}

export default Providers;
