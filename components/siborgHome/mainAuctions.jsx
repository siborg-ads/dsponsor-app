import React, { useState, useEffect } from "react";
import Link from "next/link";
import Auction from "./auction";
import ItemCardSkeleton from "../skeleton/ItemCardSkeleton";
import OfferItem from "../cards/offerItem";

const MainAuctions = ({ auctions }) => {
  const [isHoveringCard, setIsHoveringCard] = useState(Array(auctions?.length).fill(false));
  const [randomAuctions, setRandomAuctions] = useState([]);
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const liveAuctions = auctions?.filter((auction) => auction.live);
    setLiveAuctions(liveAuctions);
  }, [auctions]);

  useEffect(() => {
    if (liveAuctions?.length === 0) return;

    let tempRandomAuctions = [];
    let seenIndexes = new Set();

    while (tempRandomAuctions.length < 4 && seenIndexes.size < liveAuctions?.length) {
      let randomIndex = Math.floor(Math.random() * liveAuctions?.length);

      if (!seenIndexes.has(randomIndex)) {
        tempRandomAuctions.push(liveAuctions[randomIndex]);
        seenIndexes.add(randomIndex);
      }
    }

    setRandomAuctions(tempRandomAuctions);
    setIsHoveringCard(Array(tempRandomAuctions.length).fill(false));
  }, [liveAuctions]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold text-white">Live Auctions 🔥</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {randomAuctions.length !== 0 ? (
            <>
              {randomAuctions.map((auction, index) => (
                <OfferItem
                  key={index}
                  item={auction.item}
                  isToken={true}
                  listingType={auction?.type}
                  isListing={auction?.type}
                  isOwner={isOwner}
                  isAuction={auction?.type === "Auction"}
                  url={
                    !auction?.tokenData
                      ? `/${auction?.chainId}/offer/${auction?.offerId}/${auction?.tokenId}`
                      : `/${auction?.chainId}/offer/${auction.item.nftContract?.adOffers[0]?.id}/${auction.tokenId}?tokenData=${auction.item.mint?.tokenData}`
                  }
                />
              ))}
            </>
          ) : (
            <>
              <ItemCardSkeleton />
              <ItemCardSkeleton />
              <ItemCardSkeleton />
              <ItemCardSkeleton />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainAuctions;
