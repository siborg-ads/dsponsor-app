"use client";

import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { MetaMaskProvider } from "metamask-react";

import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Mumbai, Polygon, Sepolia } from "@thirdweb-dev/chains";

const RootProvider = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="6f375d41f2a33f1f08f6042a65d49ec9"
      authConfig={{
        domain: "dsponsor.com",
      }}
      switchToActiveChain={true}
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
      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>{children}</MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </ThirdwebProvider>
  );
};

export default RootProvider;
