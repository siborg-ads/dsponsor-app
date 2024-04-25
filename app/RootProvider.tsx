
"use client";
import Header01 from "../components/header/Header01";
import Footer from "../components/footer";
import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { MetaMaskProvider } from "metamask-react";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import {Sepolia } from "@thirdweb-dev/chains";
import { useEffect } from "react";

const RootProvider = ({ children }) => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap").then((bootstrap) => {
        }).catch((error) => {
        console.error("Failed to load Bootstrap:", error);
      });
    }
  }, []);
  
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="6f375d41f2a33f1f08f6042a65d49ec9"
      authConfig={{
        domain: "dsponsor.com",
      }}
      // switchToActiveChain={true}
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
          <Header01 />
          <MetaMaskProvider>{children}</MetaMaskProvider>
          <Footer></Footer>
        </ThemeProvider>
      </Provider>
    </ThirdwebProvider>
  );
};

export default RootProvider;