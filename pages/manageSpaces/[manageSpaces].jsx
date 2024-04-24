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
import { GetAllAdOffersFromUser } from "../../data/services/AdOffersService";
import { GetAllTokenbyOfferForAUser } from "../../data/services/TokenOffersService";

import adminInstance from "../../utils/sdkProvider";

import { fetchDataFromIPFS } from "../../data/services/ipfsService";

const ManageSpaces = () => {
  const router = useRouter();
  const userAddress = router.query.manageSpaces;

  const [createdData, setCreatedData] = useState(null);
  const [mappedownedAdProposals, setMappedownedAdProposals] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPendinAdsOnOffer, setIsPendinAdsOnOffer] = useState(false);

  useEffect(() => {
    if (userAddress) {
      const fetchAdsOffers = async () => {
        const offers = await GetAllAdOffersFromUser(userAddress);
        const ownedAdProposals = await GetAllTokenbyOfferForAUser(userAddress);
        
        const mappedOffers = [];
        for (const element of offers) {
          let isPending = false;
          const destructuredIPFSResult = await fetchDataFromIPFS(element.metadataURL);
          const pendingProposals = element.nftContract.tokens;
           for (const isPendingAds of pendingProposals){ 
            if(isPendingAds.currentProposals.length > 0 && isPendingAds.currentProposals[0].pendingProposal !== null){
isPending = true;
setIsPendinAdsOnOffer(true);
break;
            } 
           };
          const combinedData = {
            isPending : isPending,
            ...element,
            ...destructuredIPFSResult,
          };
          mappedOffers.push(combinedData);
        }
console.log(mappedOffers);
        const mappedownedAdProposals = [];
        

        
        setCreatedData(mappedOffers);

        for (const element of ownedAdProposals) {
          if (!element.nftContract.adOffers[0].metadataURL) {
            continue;
          }

          const IPFSLink = element.nftContract.adOffers[0].metadataURL;
          const destructuredIPFSResult = await fetchDataFromIPFS(IPFSLink);
          const combinedData = {
            ...element,
            ...(element.mint.tokenData ? { tokenData: element.mint.tokenData } : {}),
            ...destructuredIPFSResult,
          };
          mappedownedAdProposals.push(combinedData);
        }
        console.log(mappedownedAdProposals);
        setMappedownedAdProposals(mappedownedAdProposals);
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
      <Meta title="User || DSponsor | smarter monetization for your content" />
      {/* <!-- Profile --> */}

      <div className=" " key="5">
        {/* <!-- Banner --> */}
        <div className="relative h-[13rem]">
          <Image width={1519} height={150} src="/images/gradient_creative.jpg" alt="banner" className="w-full h-full object-cover" />
        </div>
        {/* <!-- end banner --> */}
        <section className="dark:bg-jacarta-800 bg-light-base relative ">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="container">
              <div className="text-center">
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100  inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
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
          </div>
        </section>
        {/* <!-- end profile --> */}
        <User_items createdData={createdData} mappedownedAdProposals={mappedownedAdProposals} isPendinAdsOnOffer={isPendinAdsOnOffer} />
      </div>
    </>
  );
};

export default ManageSpaces;
