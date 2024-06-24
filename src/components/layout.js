import Footer from "./footer";
import WalletModal from "./modal/wallet_modal";

import Header01 from "./header/Header01";

export default function Layout({ children }) {
  return (
    <>
      <Header01 />
      <WalletModal />

      <>{children}</>

      <Footer />
    </>
  );
}
