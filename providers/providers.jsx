
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
import SwitchChainProvider from "./ChainProvider/SwitchChainProvider";
import { useChainContext } from "../contexts/hooks/useChainContext";



function Providers({children}) {
 const [selectedChain, setSelectedChain] = useState("sepolia");
const { currentChainObject } = useChainContext();

  useEffect(() => {
    if (currentChainObject) {
      setSelectedChain(currentChainObject.chainId);
    }
  }
  , [currentChainObject]);
  console.log(selectedChain);
    return (
     
        <ThirdwebProvider
          activeChain={selectedChain}
          clientId="6f375d41f2a33f1f08f6042a65d49ec9"
          supportedChains={[Ethereum, Polygon, BaseSepoliaTestnet, Sepolia]}
          authConfig={{
            domain: "dsponsor.com",
          }}
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
            localWallet(),
            embeddedWallet({
              auth: {
                options: ["email", "google", "apple", "facebook"],
              },
            }),
          ]}
        >
          <ChainProvider>{children}</ChainProvider>
        </ThirdwebProvider>

    );
}

export default Providers;
