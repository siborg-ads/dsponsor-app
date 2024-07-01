import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useEffect, useMemo, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import Providers from "../providers/providers";
import Hotjar from "@hotjar/browser";

const siteId = 5037837;
const hotjarVersion = 6;

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
    <>
      <Meta title="Home" />
      <Providers>
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
      </Providers>
    </>
  );
}

export default MyApp;
