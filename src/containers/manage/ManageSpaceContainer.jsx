import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import ProfileOverview from "../../components/user/ProfileOverview";
import ProfileReferrals from "../../components/user/ProfileReferrals";
import UserTabs from "../../components/user/UserTabs";
import { useAddress } from "@thirdweb-dev/react";
import { fetchAllTokenByOfferForAuser } from "../../providers/methods/fetchAllTokenByOfferForAuser";
import { fetchAllOffersByUserAddress } from "../../providers/methods/fetchAllOffersByUserAddress";
import { fetchAllTokenListedByUserAddress } from "../../providers/methods/fetchAllTokenListedByUserAddress";
import { fetchAllTokenAuctionBidsByUser } from "../../providers/methods/fetchAllTokenAuctionBidsByUser";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../config/config";
import { getAddress } from "ethers/lib/utils";

const ManageSpaceContainer = () => {
  const router = useRouter();
  const userAddress = router.query.manage;
  const address = useAddress();
  const [createdData, setCreatedData] = useState(null);
  const [mappedOwnedAdProposals, setMappedOwnedAdProposals] = useState(null);
  const [listedAuctionToken, setListedAuctionToken] = useState(null);
  const [tokenAuctionBids, setTokenAuctionBids] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { currentChainObject } = useChainContext();
  const [isPendingAdsOnOffer] = useState(false);
  const [initialWallet, setInitialWallet] = useState(null);
  const [mount, setMount] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isUserConnected, setIsUserConnected] = useState(false);

  const chainId = currentChainObject?.chainId;
  const chainConfig = config[chainId];

  useEffect(() => {
    if (address && userAddress && getAddress(address) === getAddress(userAddress)) {
      setIsUserConnected(true);
    } else {
      setIsUserConnected(false);
    }
  }, [address, userAddress]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://relayer.dsponsor.com/api/${chainId}/activity?userAddress=${userAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => console.error(err));

      setUserData(data);
      setMount(true);
    };

    if (address && chainId && !mount) {
      fetchData();
    }
  }, [address, chainId, mount]);

  useEffect(() => {
    if (address && !initialWallet) {
      setInitialWallet(address);
    }
  }, [address, initialWallet]);

  useEffect(() => {
    if (address && initialWallet && address !== initialWallet) {
      setInitialWallet(address);
      router.push(`/profile/${address}`);
    }
  }, [address, initialWallet, router]);

  useEffect(() => {
    if (userAddress && chainId) {
      const fetchDataByUserAddress = async (fetchFunction) => {
        const dataArray = [];
        for (const [chainId] of Object.entries(config)) {
          const data = await fetchFunction(userAddress, chainId);
          dataArray?.push(...data);
        }
        return dataArray;
      };

      const fetchOwnedAdProposals = async () => {
        const ownedAdProposalsArray = await fetchDataByUserAddress(fetchAllTokenByOfferForAuser);

        const mappedOwnedAdProposals = ownedAdProposalsArray.flatMap((element) =>
          element.nftContract.tokens.map((token) => ({
            ...token,
            ...(token.mint.tokenData ? { tokenData: token.mint.tokenData } : {}),
            chainConfig: element.chainConfig,
            adParameters: element.adParameters,
            id: `${element.id}-${token.tokenId}`,
            offerId: element.id,
            endTime:
              token?.marketplaceListings?.length > 0 && token?.marketplaceListings[0]?.endTime
          }))
        );

        setMappedOwnedAdProposals(mappedOwnedAdProposals);
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
            ...element,
            ...element.token,
            listingStatus: handleListingsStatusType(element.status),
            chainConfig: element.chainConfig,
            tokenData: element?.token.mint.tokenData,
            startTime: element?.startTime,
            endTime: element?.endTime,
            offerId: element?.token?.nftContract?.adOffers[0]?.id
          }));

        setListedAuctionToken(mappedListedToken);
      };

      const fetchAuctionBidsTokens = async () => {
        const auctionBidsTokensArray = await fetchDataByUserAddress(fetchAllTokenAuctionBidsByUser);
        const mappedAuctionBidsTokens = auctionBidsTokensArray.map((element) => ({
          ...element,
          status: handleBidsStatusType(element.status),
          listingStatus: handleListingsStatusType(element.listing.status),
          metadata: element.listing.token.metadata,
          tokenData: element.listing.token.mint.tokenData,
          offerId: element.listing.token.nftContract.adOffers[0].id,
          tokenId: element.listing.token.tokenId,
          endTime: element?.listing?.endTime
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
  const handleListingsStatusType = (status) => {
    switch (status) {
      case "CREATED":
        return "Active";
      case "COMPLETED":
        return "Finished";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Active";
    }
  };
  const handleBidsStatusType = (status) => {
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
    title: "Profile || SiBorg Ads - The Web3 Monetization Solution",
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",
    desc: "Profile your ad spaces on SiBorg Ads."
  };
  return (
    <>
      <Meta {...metadata} />
      {/* <!-- Profile --> */}

      <div className=" " key="5">
        {/* <!-- Banner --> */}
        <div className="relative " style={{ height: "8rem" }}>
          <Image
            width={1519}
            height={150}
            src="/images/gradient_creative.jpg"
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <!-- end banner --> */}

        <div className="max-w-5xl mx-auto mt-12">
          <div className="flex flex-col gap-16 mx-4">
            <ProfileOverview userData={userData} ownedTokens={mappedOwnedAdProposals} />

            {isUserConnected && (
              <ProfileReferrals
                userData={userData}
                userAddr={address}
                manageAddress={userAddress}
              />
            )}

            <UserTabs
              mappedownedAdProposals={mappedOwnedAdProposals}
              createdData={createdData}
              listedAuctionToken={listedAuctionToken}
              tokenAuctionBids={tokenAuctionBids}
              isPendingAdsOnOffer={isPendingAdsOnOffer}
              isOwner={isOwner}
              manageAddress={userAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSpaceContainer;
