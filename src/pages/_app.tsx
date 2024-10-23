import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import { store } from "@/contexts/store";
import { useRouter } from "next/router";
import Meta from "@/components/Meta";
import UserContext from "@/contexts/user";
import React, { useEffect, useMemo, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import Hotjar from "@hotjar/browser";

// styles
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ThirdwebProvider } from "thirdweb/react";

const siteId = 5037837;
const hotjarVersion = 6;

const metadata = {
  title: "SiBorg Ads - The Web3 Monetization Solution",
  keyword:
    "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
  desc: "Unlock The Web3 Monetization Solution."
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0
  });

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  const value = useMemo(() => ({ scrollRef }), [scrollRef]);

  return (
    <React.Fragment>
      <Meta {...metadata} />
      <ThirdwebProvider>
        <Provider store={store}>
          <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
            <NextUIProvider>
              <UserContext.Provider value={value}>
                {pid === "/login" ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </UserContext.Provider>
              <ToastContainer position="top-right" autoClose={5000} />
            </NextUIProvider>
          </ThemeProvider>
        </Provider>
      </ThirdwebProvider>
    </React.Fragment>
  );
}

export default MyApp;
