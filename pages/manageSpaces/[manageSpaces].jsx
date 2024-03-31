import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import user_data from "../../data/user_data";
import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import Meta from "../../components/Meta";
import { DSponsorAdmin } from "@dsponsor/sdk";

import { fetchDataFromIPFS } from "../../data/services/ipfsService";

const ManageSpaces = () => {
  const router = useRouter();
  const userAddress = router.query.manageSpaces;

  const [createdData, setCreatedData] = useState([]);
  const [mappedownedAdProposals, setMappedownedAdProposals] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (userAddress) {
      const admin = new DSponsorAdmin();
      const fetchAdsOffers = async () => {
        const offer = await admin.getOffers({ address: userAddress }, { includeMetadata: true, includePrices: true, includeAllowedTokens: true });

        const ownedAdProposals = await admin.getOwnedOfferTokens({ address: userAddress });
        console.log(ownedAdProposals, "ownedAdProposals");

        const mappedownedAdProposals = [];

        for (const element of ownedAdProposals) {
          const IPFSLink = element.offer.offerMetadata;
          const destructuredIPFSResult = await fetchDataFromIPFS(IPFSLink);
          const combinedData = {
            ...element,
            ...element.offer,
            ...destructuredIPFSResult,
          };
          mappedownedAdProposals.push(combinedData);
        }

        setMappedownedAdProposals(mappedownedAdProposals);
        setCreatedData(offer);
      };

      fetchAdsOffers();
    }
  }, [userAddress, router]);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <>
      <Meta title="User || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Profile --> */}

      <div className="pt-[5.5rem] lg:pt-24" key="5">
        {/* <!-- Banner --> */}
        <div className="relative h-[18.75rem]">
          <Image width={1519} height={300} src="/images/collections/Banner-item.webp" alt="banner" className="w-full h-full object-cover" />
          <div className="container relative -translate-y-4">
            <div className="font-display group hover:bg-accent absolute right-0 bottom-4 flex items-center rounded-lg bg-white py-2 px-4 text-sm">
              <Tippy content={<span className="p-2">Coming soon</span>}>
                <div className="flex ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-400 mr-1 h-4 w-4 group-hover:fill-white">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
                  </svg>
                  <span className="text-black mt-0.5 block group-hover:text-white">Edit cover photo</span>
                </div>
              </Tippy>
            </div>
          </div>
        </div>
        {/* <!-- end banner --> */}
        <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <Image width={141} height={141} src="/images/avatars/avatar-manageSpaces.webp" alt="images" className="dark:border-jacarta-600 rounded-xl border-[5px] border-white w-full h-full object-contain" />

              <div className="group hover:bg-accent border-jacarta-100 absolute -right-3 -bottom-2 h-8 w-8 overflow-hidden rounded-full border bg-white text-center hover:border-transparent">
                <div className="flex h-full items-center justify-center">
                  <Tippy content={<span className="p-2">Coming soon</span>}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-400 h-4 w-4 group-hover:fill-white">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                    </svg>
                  </Tippy>
                </div>
              </div>

              <div className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-7 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                </svg>
              </div>
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                <Tippy content="ETH">
                  <svg className="icon h-4 w-4 mr-1">
                    <use xlinkHref="/icons.svg#icon-ETH"></use>
                  </svg>
                </Tippy>

                <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                  <button className="js-copy-clipboard dark:text-jacarta-200 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                    <CopyToClipboard text="userId" onCopy={() => setCopied(true)}>
                      <span>{userAddress}</span>
                    </CopyToClipboard>
                  </button>
                </Tippy>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end profile --> */}
        <User_items createdData={createdData} mappedownedAdProposals={mappedownedAdProposals} />
      </div>
    </>
  );
};

export default ManageSpaces;
