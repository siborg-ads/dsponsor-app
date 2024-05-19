'use client';
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import SocialsHorizontalContainer from "./SocialsHorizontalContainer";
import LogoContainer from "./LogoContainer";
import HeaderNavLink from "./HeaderNavLink";
import HeaderMobileMenuLink from "./HeaderMobileMenuLink";
import {useChainContext} from "../../contexts/hooks/useChainContext";

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const address = useAddress();
    const {chainName} = useChainContext();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setToggle(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <>
        <header className="js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors">
          <div className="flex items-center px-6 py-6 xl:px-24">
            <LogoContainer />
            <div className="flex-grow lg:hidden"></div>
            {/*<div className="js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">*/}
            {/*    <nav className="navbar w-full">*/}
            {/*        <ul className="flex flex-col lg:flex-row">*/}
            <div className="hidden lg:flex lg:flex-grow lg:items-center lg:justify-between inset-0 z-10 ml-auto items-center">
              <nav className="navbar w-full">
                <ul className="flex flex-col lg:flex-row">
                  <li>
                    <HeaderNavLink to="/#hot-offers">Buy spaces</HeaderNavLink>
                  </li>
                  <li>
                    <HeaderNavLink to={`/${chainName}/offer/create`}>Create offer</HeaderNavLink>
                  </li>
                  <li>
                    <HeaderNavLink to="/marketplace">Marketplace</HeaderNavLink>
                  </li>
                  {address && (
                    <li>
                      <HeaderNavLink to={`/manage/${address}`}>Manage</HeaderNavLink>
                    </li>
                  )}
                </ul>
              </nav>
              <ConnectWallet theme="dark" modalSize="wide" />
            </div>

            <div className="ml-auto lg:hidden">
              <button className="h-10 w-10 flex items-center justify-center rounded-full border transition-colors" aria-label="open mobile menu" onClick={() => setToggle(!toggle)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {toggle && (
            // <!-- Mobile menu, background taking up the full height over the whole screen -->
            <div className="js-mobile-menu flex flex-col items-center bg-white dark:bg-jacarta-800 p-6 lg:hidden h-screen w-full fixed top-0 left-0 z-10">
              <nav className="navbar w-full">
                <ul className="flex flex-col lg:flex-row">
                  <li className="group">
                    <HeaderMobileMenuLink to="/" setToggle={setToggle}>Home</HeaderMobileMenuLink>
                  </li>
                  <li className="group">
                    <HeaderMobileMenuLink to="#hot-offers" setToggle={setToggle}>Buy spaces</HeaderMobileMenuLink>
                  </li>
                  <li className="group">
                    <HeaderMobileMenuLink to={`/${chainName}/offer/create`} setToggle={setToggle}>Create offer</HeaderMobileMenuLink>
                  </li>
                  <li className="group">
                    <HeaderMobileMenuLink to="/marketplace" setToggle={setToggle}>Marketplace</HeaderMobileMenuLink>
                  </li>
                  <li className="group">{address && <HeaderMobileMenuLink to={`/manage/${address}`} setToggle={setToggle}>Manage</HeaderMobileMenuLink>}</li>
                </ul>
              </nav>
              <div className="mt-10 w-full lg:hidden">

              <ConnectWallet theme="dark" modalSize="wide" />
              <hr className="dark:bg-jacarta-600 bg-jacarta-100 my-5 h-px border-0" />
              <SocialsHorizontalContainer />
              </div>
            </div>
          )}
        </header>
      </>
    );




}
