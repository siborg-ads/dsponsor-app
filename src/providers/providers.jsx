import { useEffect, useState } from "react";
import { Ethereum, Polygon, BaseSepoliaTestnet, Sepolia, Base } from "@thirdweb-dev/chains";

import {
  coinbaseWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect
} from "@thirdweb-dev/react";
import ChainProvider from "./ChainProvider/ChainProvider";
import SwitchChainProvider from "./SwitchChainProvider/SwitchChainProvider";
import { useSwitchChainContext } from "../contexts/hooks/useSwitchChainContext";
import config from "../config/config";

function Providers({ children }) {
  return (
    <SwitchChainProvider>
      <InnerProviders>{children}</InnerProviders>
    </SwitchChainProvider>
  );
}

function InnerProviders({ children }) {
  const [chain, setChain] = useState(Object.entries(config)[0][1]?.chainObject);
  const { selectedChain } = useSwitchChainContext();

  useEffect(() => {
    if (selectedChain) {
      setChain(selectedChain.toString());
    }
  }, [selectedChain]);

  return (
    <ThirdwebProvider
      activeChain={chain}
      clientId="6f375d41f2a33f1f08f6042a65d49ec9"
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
