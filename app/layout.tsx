"use client";

import { useEffect } from "react";
import "../styles/globals.css";
import BidsModal from "../components/modal/bidsModal";
import BuyModal from "../components/modal/buyModal";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Header01 from "../components/header/Header01";
import Footer from "../components/footer"

import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { MetaMaskProvider } from "metamask-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap").then((bootstrap) => {
        console.log("boot ok");
        }).catch((error) => {
        console.error("Failed to load Bootstrap:", error);
      });
    }
  }, []);
  
  return (
    <html lang="en">
      <body>
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
          <MetaMaskProvider>
            
            <main>
              <Header01 />
              <BidsModal />
              <BuyModal />
              {children}
              <Footer/>
            </main>
          </MetaMaskProvider>
          </Provider>

        </ThirdwebProvider>
      </body>
    </html>
  )
}