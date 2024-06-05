import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";

import { useRouter } from "next/router";
import Header01 from "./header/Header01";
import PlaceBidRecap from "./modal/placeBidRecap";
import React from "react";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Header01 />
      <Wallet_modal />

      <PlaceBidRecap isOpen={isOpen} setIsOpen={setIsOpen} />

      <main>{children}</main>
      <Footer />
    </>
  );
}
