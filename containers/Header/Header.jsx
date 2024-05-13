'use client';
import Image from "next/image";
import Link from "next/link";
import Logo from "./../../public/images/logo.png";
import WhiteLogo from "./../../public/images/logo_white.png";
import { useRouter } from "next/navigation";
import { isChildrenPageActive, isParentPageActive } from "../../utils/daynamicNavigation";
import { useEffect, useState } from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import SocialsHorizontalContainer from "./SocialsHorizontalContainer";
import LogoContainer from "./LogoContainer";

export default function Header() {
    const [toggle, setToggle] = useState(false);
    const address = useAddress();

    // window resize
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024) {
                setToggle(false);
            }
        });
    });
    const route = useRouter();
    return (
        <>
            {/* main desktop menu sart*/}
            <header className="js-page-header fixed top-0 z-20 w-full backdrop-blur transition-colors">
                <div className="flex items-center px-6 py-6 xl:px-24 ">
                    <LogoContainer />
                    {/* End  logo */}

                    <div className="js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
                        <nav className="navbar w-full">
                            <ul className="flex flex-col lg:flex-row">
                                {/* buy */}
                                <li className="group">
                                    <Link href="/#hot-offers">
                                        <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                            <span className={isChildrenPageActive(route.asPath, "#hot-offers") ? "text-accent dark:text-accent" : ""}>Buy spaces</span>
                                        </button>
                                    </Link>
                                </li>
                                {/* create */}
                                <li className="group">
                                    <Link href="/pages/_offer/create">
                                        <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                            <span className={isChildrenPageActive(route.asPath, "/offer/create") ? "text-accent dark:text-accent" : ""}>Create offer</span>
                                        </button>
                                    </Link>
                                </li>
                                {address && (
                                    <li className="group">
                                        <Link href={`/manageSpaces/${address}`}>
                                            <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                                <span className={isChildrenPageActive(route.asPath, `/user/${address}`) ? "text-accent dark:text-accent" : ""}>Manage</span>
                                            </button>
                                        </Link>
                                    </li>
                                )}
                                <li className="group">
                                    <ConnectWallet theme={"dark"} modalSize={"wide"} />
                                </li>
                            </ul>
                        </nav>
                        {/* End menu for desktop */}

                        {/* End header right content (metamask and other) for desktop */}
                    </div>
                    {/* header menu conent end for desktop */}

                    <div className="ml-auto flex lg:hidden">
                        <button
                            className="js-mobile-toggle border-jacarta-100 hover:bg-accent dark:hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                            aria-label="open mobile menu"
                            onClick={() => setToggle(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
                            </svg>
                        </button>
                    </div>
                    {/* End header right content  for mobile */}
                </div>
                {/* End flex item */}
            </header>
            {/* main desktop menu end */}

            {/* start mobile menu and it's other materials  */}
            <div
                className={`lg:hidden js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-20 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ${
                    toggle ? "nav-menu--is-open" : "hidden"
                }`}
            >
                <div className="t-0 dark:bg-jacarta-800 left-0 z-10 flex w-full items-center justify-between bg-white p-6 lg:hidden">
                    <div className="dark:hidden">
                        <Image src={Logo} height={80} width={80} alt="DSponsor | smarter monetization for your content" className="max-h-7 h-auto " />
                    </div>

                    <div className="hidden dark:block">
                        <Image src={WhiteLogo} height={80} width={80} alt="DSponsor | smarter monetization for your content" />
                    </div>

                    <button
                        className="js-mobile-close border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                        onClick={() => setToggle(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                    </button>
                </div>
                {/* mobile menu top header content */}

                <nav className="navbar w-full">
                    <ul className="flex flex-col lg:flex-row">
                        <li className="group">
                            <Link href="/" onClick={() => setToggle(false)}>
                                <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                    <span className={isChildrenPageActive(route.asPath, "/") ? "text-accent dark:text-accent" : ""}>Home</span>
                                </button>
                            </Link>
                        </li>
                        <li className="group">
                            <Link href="/#hot-offers" onClick={() => setToggle(false)}>
                                <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                    <span className={isChildrenPageActive(route.asPath, "#hot-offers") ? "text-accent dark:text-accent" : ""}>Buy spaces</span>
                                </button>
                            </Link>
                        </li>
                        {/* create */}
                        <li className="group">
                            <Link href="/pages/_offer/create" onClick={() => setToggle(false)}>
                                <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                    <span className={isChildrenPageActive(route.asPath, "/offer/create") ? "text-accent dark:text-accent" : ""}>Create offer</span>
                                </button>
                            </Link>
                        </li>
                        {address && (
                            <li className="group" onClick={() => setToggle(false)}>
                                <Link href={`/manageSpaces/${address}`}>
                                    <button className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5">
                                        <span className={isChildrenPageActive(route.asPath, `/user/${address}`) ? "text-accent dark:text-accent" : ""}>Manage</span>
                                    </button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                {/* End navbar mobile menu  */}

                <div className="mt-10 w-full lg:hidden">
                    <ConnectWallet theme={"dark"} modalSize={"wide"} />
                    <hr className="dark:bg-jacarta-600 bg-jacarta-100 my-5 h-px border-0" />
                    <SocialsHorizontalContainer />
                </div>
                {/* mt-10 w-full lg:hidden */}
            </div>
            {/* End mobile menu and it's other materials */}
        </>
    );
}
