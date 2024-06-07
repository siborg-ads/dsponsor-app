import { useEffect, useState, createContext, useContext, useChain, use } from "react";
import { useNetwork } from "@thirdweb-dev/react";
import { Ethereum, Polygon, BaseSepoliaTestnet, Sepolia } from "@thirdweb-dev/chains";

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

function Providers({ children }) {
  return (
    <SwitchChainProvider>
      <InnerProviders>{children}</InnerProviders>
    </SwitchChainProvider>
  );
}

function InnerProviders({ children }) {
  const [chain, setChain] = useState("sepolia");
  const { selectedChain } = useSwitchChainContext();

  useEffect(() => {
    if (selectedChain) {
      //console.log(selectedChain, "selectedChain");
      setChain(selectedChain.toString());
    }
  }, [selectedChain]);

  return (
    <ThirdwebProvider
      activeChain={chain}
      clientId="6f375d41f2a33f1f08f6042a65d49ec9"
      supportedChains={[Ethereum, Polygon, BaseSepoliaTestnet, Sepolia]}
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
