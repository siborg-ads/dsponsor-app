import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import Header01 from "./header/Header01";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <Header01 />
      <Wallet_modal />

      <main>{children}</main>
      <Footer />
    </>
  );
}
