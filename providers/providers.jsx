'use client';
import SDKProvider from "./SDKProvider";
import {Sepolia} from "@thirdweb-dev/chains";
import {
    coinbaseWallet,
    embeddedWallet,
    localWallet,
    metamaskWallet,
    ThirdwebProvider,
    walletConnect
} from "@thirdweb-dev/react";
import {store} from "../redux/store";
import {Provider} from "react-redux";

function Providers({children}) {
    return (
        <Provider store={store}>
        <ThirdwebProvider
            activeChain={Sepolia}
            clientId="6f375d41f2a33f1f08f6042a65d49ec9"
            authConfig={{
                domain: "dsponsor.com",
            }}
            switchToActiveChain={true}
            supportedWallets={[
                metamaskWallet(),
                coinbaseWallet({recommended: true}),
                walletConnect(),
                localWallet(),
                embeddedWallet({
                    auth: {
                        options: ["email", "google", "apple", "facebook"],
                    },
                }),
            ]}
        >
            <SDKProvider>
                {children}
            </SDKProvider>
        </ThirdwebProvider>
        </Provider>
    );
}

export default Providers;
