import Link from "next/link";
import { footerMenuList as defaultFooterMenuList } from "@/data/footer";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";
import { features } from "@/data/features";
import Logo from "@/../public/images/siborg-ads/siborg-ads.png";

const Footer = () => {
  const wallet = useActiveAccount();
  const address = wallet?.address;

  const footerMenuList = defaultFooterMenuList.concat(
    address !== undefined
      ? [
          {
            id: 3,
            title: "My Account",
            diffClass: "",
            list: [
              {
                id: 1,
                href: `/profile/${address}`,
                text: "Profile"
              },
              ...(features.canCreateOffer
                ? [
                    {
                      id: 2,
                      href: "/createOffer",
                      text: "Create Offer"
                    }
                  ]
                : [])
            ]
          }
        ]
      : []
  );

  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="bg-white dark:bg-primaryBlack page-footer">
        <div className="container">
          <div className="grid grid-cols-6 pt-24 pb-12 gap-x-7 gap-y-14 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
              <Link href="/" className="inline-block mb-6">
                <Image
                  width={220}
                  height={50}
                  src={Logo ?? ""}
                  className=" dark:hidden"
                  alt="SiBorg Ads | Media sponsoring Marketplace"
                />
              </Link>

              <Link href="/" className="inline-block mb-6 ">
                <Image
                  width={220}
                  height={50}
                  src={Logo ?? ""}
                  className="hidden mb-6 dark:block"
                  alt="SiBorg Ads | Media sponsoring Marketplace"
                />
              </Link>

              {/* <!-- Socials --> */}
              {/* <div className="flex space-x-5">
                {socialIcons.map((item) => {
                  const { id, href, text } = item;
                  return (
                    <Link href={href ?? ""} key={id} target="_blank" rel="noopener noreferrer" className="cursor-pointer group">
                      <svg className="w-5 h-5 icon group-hover:fill-primaryPurple fill-jacarta-300 dark:group-hover:fill-white">
                        <use xlinkHref={`/icons.svg#icon-${text}`}></use>
                      </svg>
                    </Link>
                  );
                })}
              </div> */}
            </div>

            {footerMenuList.map((single) => (
              <div
                className={`col-span-full sm:col-span-3 md:col-span-2 ${single.diffClass}`}
                key={single.id}
              >
                <h3 className="mb-6 text-sm font-display text-jacarta-900 dark:text-white">
                  {single.title}
                </h3>
                <ul className="flex flex-col space-y-1 dark:text-jacarta-100">
                  {single.list.map((item) => {
                    const { id, href, text, target } = item;
                    return (
                      <li key={id}>
                        <Link
                          href={href ?? ""}
                          target={target ?? ""}
                          className="hover:text-primaryPurple dark:hover:text-white"
                        >
                          {text}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between py-8 space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm dark:text-jacarta-100">
              <span>© {new Date().getFullYear()} SiBorg Ads </span>
            </span>

            <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-100">
              <li>
                <Link
                  href="https://docs.google.com/document/d/15um5c6mMoKc8V1rVyRJ7tcIxFDmtE8xe75mx-CdB84w"
                  target="_blank"
                  className="hover:text-primaryPurple dark:hover:text-white"
                >
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
