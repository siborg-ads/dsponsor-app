import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import UserItems from "../../components/user/User_items";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";

import { useAddress } from "@thirdweb-dev/react";

import { fetchAllTokenByOfferForAuser } from "../../providers/methods/fetchAllTokenByOfferForAuser";
import { fetchAllOffersByUserAddress } from "../../providers/methods/fetchAllOffersByUserAddress";
import { fetchAllTokenListedByUserAddress } from "../../providers/methods/fetchAllTokenListedByUserAddress";
import { fetchAllTokenAuctionBidsByUser } from "../../providers/methods/fetchAllTokenAuctionBidsByUser";
import { useChainContext } from "../../contexts/hooks/useChainContext";

import config from "../../providers/utils/config";
import handleCopy from "../../utils/handleCopy";

const ManageSpaceContainer = () => {
  const router = useRouter();
  const userAddress = router.query.manage;
  const address = useAddress();
  const [createdData, setCreatedData] = useState(null);
  const [mappedownedAdProposals, setMappedownedAdProposals] = useState(null);
  const [listedAuctionToken, setListedAuctionToken] = useState(null);
  const [tokenAuctionBids, setTokenAuctionBids] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isPendinAdsOnOffer] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { currentChainObject } = useChainContext();

  const chainId = currentChainObject?.chainId;
  const chainConfig = config[chainId];

  useEffect(() => {
    if (userAddress && chainId) {
      const fetchDataByUserAddress = async (fetchFunction) => {
        const dataArray = [];
        for (const [chainId] of Object.entries(config)) {
          const data = await fetchFunction(userAddress, chainId);
          dataArray.push(...data);
        }
        return dataArray;
      };

      const fetchOwnedAdProposals = async () => {
        const ownedAdProposalsArray = await fetchDataByUserAddress(fetchAllTokenByOfferForAuser);

        const mappedOwnedAdProposals = ownedAdProposalsArray.flatMap((element) =>
          element.nftContract.tokens.map((token) => ({
            chainConfig: element.chainConfig,
            adParameters: element.adParameters,
            id: `${element.id}-${token.tokenId}`,
            offerId: element.id,
            ...token,
            ...(token.mint.tokenData ? { tokenData: token.mint.tokenData } : {})
          }))
        );

        setMappedownedAdProposals(mappedOwnedAdProposals);
      };

      const fetchCreatedData = async () => {
        const offersByUserAddressArray = await fetchDataByUserAddress(fetchAllOffersByUserAddress);
        setCreatedData(offersByUserAddressArray);
      };

      const fetchListedTokens = async () => {
        const listedTokenArray = await fetchDataByUserAddress(fetchAllTokenListedByUserAddress);

        const mappedListedToken = listedTokenArray
          .filter((element) => element?.listingType === "Auction")
          .map((element) => ({
            chainConfig: element.chainConfig,
            tokenData: element?.token.mint.tokenData,
            startTime: element?.startTime,
            endTime: element?.endTime,
            ...element?.token
          }));
        setListedAuctionToken(mappedListedToken);
      };

      const fetchAuctionBidsTokens = async () => {
        const auctionBidsTokensArray = await fetchDataByUserAddress(fetchAllTokenAuctionBidsByUser);
        const mappedAuctionBidsTokens = auctionBidsTokensArray.map((element) => ({
          ...element,
          status: handleStatusType(element.status),
          metadata: element.listing.token.metadata,
          tokenData: element.listing.token.mint.tokenData,
          offerId: element.listing.token.nftContract.adOffers[0].id,
          tokenId: element.listing.token.tokenId
        }));

        setTokenAuctionBids(mappedAuctionBidsTokens);
      };

      if (address === userAddress) setIsOwner(true);
      fetchOwnedAdProposals();
      fetchCreatedData();
      fetchListedTokens();
      fetchAuctionBidsTokens();
    }
  }, [userAddress, router, address, chainId, chainConfig]);
  const handleStatusType = (status) => {
    switch (status) {
      case "CREATED":
        return "HIGHEST BIDDER";
      case "CONFIRMED":
        return "AUCTION WON";
      case "CANCELLED":
        return "OUTBID";
      default:
        return "HIGHEST BIDDER";
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);
  const metadata = {
    title: "Manage || SiBorg Ads - The Web3 Monetization Solution",
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Manage your ad spaces on SiBorg Ads."
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
                <div className="dark:bg-secondaryBlack dark:border-primaryBlack border-jacarta-100  inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
                  <Tippy
                    hideOnClick={false}
                    content={copied ? <span>copied</span> : <span>copy</span>}
                  >
                    <button
                      style={{ maxWidth: "10rem" }}
                      onClick={() => handleCopy(userAddress, setCopied)}
                      className="dark:text-jacarta-200 select-none overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      <span>{address === userAddress ? "You" : userAddress}</span>
                    </button>
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end profile --> */}
        <UserItems
          createdData={createdData}
          listedAuctionToken={listedAuctionToken}
          mappedownedAdProposals={mappedownedAdProposals}
          tokenAuctionBids={tokenAuctionBids}
          isPendinAdsOnOffer={isPendinAdsOnOffer}
          isOwner={isOwner}
        />
      </div>
    </>
  );
};

export default ManageSpaceContainer;
