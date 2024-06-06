import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import User_items from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { CopyToClipboard } from "react-copy-to-clipboard";
import Meta from "../../components/Meta";

import {
  useAddress,
  darkTheme,
  useBalance,
  Web3Button,
  useTokenBalance,
  useContract,
  useContractRead,
  useContractWrite,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth
} from "@thirdweb-dev/react";

import { fetchAllTokenByOfferForAuser } from "../../providers/methods/fetchAllTokenByOfferForAuser";
import { fetchAllOffersByUserAddress } from "../../providers/methods/fetchAllOffersByUserAddress";
import { fetchAllTokenListedByUserAddress } from "../../providers/methods/fetchAllTokenListedByUserAddress";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { id } from "ethers/lib/utils";
import config from "../../providers/utils/config";

const ManageSpaceContainer = () => {
  const router = useRouter();
  const userAddress = router.query.manage;
  const address = useAddress();
  const [createdData, setCreatedData] = useState(null);
  const [mappedownedAdProposals, setMappedownedAdProposals] = useState(null);
  const [listedAuctionToken, setListedAuctionToken] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPendinAdsOnOffer, setIsPendinAdsOnOffer] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { currentChainObject } = useChainContext();

  const chainId = currentChainObject?.chainId;
  const chainConfig = config[chainId];

  useEffect(() => {
    if (userAddress && chainId) {
      const fetchAdsOffers = async () => {
        const offersByUserAddressArray = [];

        for (const [chainId] of Object.entries(config)) {
          const offersByUserAddress = await fetchAllOffersByUserAddress(userAddress, chainId);
          offersByUserAddressArray.push(...offersByUserAddress);
        }

        setCreatedData(offersByUserAddressArray);
        console.log(offersByUserAddressArray);
        const ownedAdProposalsArray = [];
        for (const [chainId] of Object.entries(config)) {
          const ownedAdProposals = await fetchAllTokenByOfferForAuser(userAddress, chainId);
          ownedAdProposalsArray.push(...ownedAdProposals);
        }
        console.log(ownedAdProposalsArray);
        const listedTokenArray = [];
        for (const [chainId] of Object.entries(config)) {
          const listedToken = await fetchAllTokenListedByUserAddress(userAddress, chainId);
          listedTokenArray.push(...listedToken);
        }
        console.log(listedTokenArray, "listedTokenArray");
        const mappedListedToken = [];
        for (const element of listedTokenArray) {
          if (element?.listingType === "Auction") {
            const combinedData = {
              chainConfig: element.chainConfig,
              tokenData: element?.token.mint.tokenData,
              startTime: element?.startTime,
              endTime: element?.endTime,
              ...element?.token
            };
            mappedListedToken.push(combinedData);
          }
        }

        const mappedownedAdProposals = [];

        for (const element of ownedAdProposalsArray) {
          for (const token of element.nftContract.tokens) {
            const combinedData = {
              chainConfig: element.chainConfig,
              adParameters: element.adParameters,
              id: `${element.id}-${token.tokenId}`,
              offerId: element.id,
              ...token,
              ...(token.mint.tokenData ? { tokenData: token.mint.tokenData } : {})
            };
            mappedownedAdProposals.push(combinedData);
          }
        }
        console.log(mappedownedAdProposals, "mappedownedAdProposals");

        setMappedownedAdProposals(mappedownedAdProposals);
        setListedAuctionToken(mappedListedToken);
      };
      if (address === userAddress) setIsOwner(true);
      fetchAdsOffers();
    }
  }, [userAddress, router, address, chainId, chainConfig]);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);
  const metadata = {
    title: "DSponsor | Manage your ad spaces - " + address,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Manage your ad spaces on DSponsor."
  };
  return (
    <>
      <Meta {...metadata} />
      {/* <!-- Profile --> */}

      <div className=" " key="5">
        {/* <!-- Banner --> */}
        <div className="relative " style={{ height: "13rem" }}>
          <Image
            width={1519}
            height={150}
            src="/images/gradient_creative.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <!-- end banner --> */}
        <section className="dark:bg-jacarta-800 bg-light-base relative ">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="container">
              <div className="text-center">
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100  inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                  <Tippy
                    hideOnClick={false}
                    content={copied ? <span>copied</span> : <span>copy</span>}
                  >
                    <button
                      style={{ maxWidth: "10rem" }}
                      className="js-copy-clipboard dark:text-jacarta-200  select-none overflow-hidden text-ellipsis whitespace-nowrap"
                    >
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
        <User_items
          createdData={createdData}
          listedAuctionToken={listedAuctionToken}
          mappedownedAdProposals={mappedownedAdProposals}
          isPendinAdsOnOffer={isPendinAdsOnOffer}
          isOwner={isOwner}
        />
      </div>
    </>
  );
};

export default ManageSpaceContainer;
