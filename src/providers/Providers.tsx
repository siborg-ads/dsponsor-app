import React, { useEffect, useState } from "react";
import { Ethereum, Polygon, BaseSepoliaTestnet, Sepolia, Base } from "@thirdweb-dev/chains";
import {
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect
} from "@thirdweb-dev/react";
import ChainProvider from "@/providers/Chain";
import { SwitchChainProvider } from "@/providers/SwitchChain";
import { useSwitchChainContext } from "@/hooks/useSwitchChainContext";
import config from "@/config/config";
import { clientId } from "@/data/services/client";
import { features } from "@/data/features";

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

  useEffect(() => {
    if (selectedChain) {
      setChain(selectedChain);
    }
  }, [selectedChain]);

  const relayerURL = config?.[chain?.chainId as number]?.features?.openZeppelinDefender?.relayerURL;

  const sdkOptions = features?.canUseGaslessTransactions
    ? {
        gasless: {
          openzeppelin: {
            relayerUrl: relayerURL
          }
        }
      }
    : undefined;

  return (
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
      <ChainProvider>{children}</ChainProvider>
    </ThirdwebProvider>
  );
}

export default Providers;
