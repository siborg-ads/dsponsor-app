import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import { useRouter } from "next/router";
import Header01 from "./header/Header01";


export default function Layout({ children }) {


  return (
    <>
      <Header01 />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <main>{children}</main>
      <Footer />
    </>
  );
}
