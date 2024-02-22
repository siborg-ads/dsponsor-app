import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useRef } from "react";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Mumbai, Polygon } from "@thirdweb-dev/chains";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
const smartWalletOptions = {
  factoryAddress: "0xfed99008e81d806d7964168b7bfb5ea868a622d3",
  gasless: true,
};
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <>
      <Meta title="Home 1" />
      <ThirdwebProvider
        activeChain={Mumbai}
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
            <MetaMaskProvider>
              <UserContext.Provider value={{ scrollRef: scrollRef }}>
                {pid === "/login" ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </UserContext.Provider>
            </MetaMaskProvider>
          </ThemeProvider>
        </Provider>
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
