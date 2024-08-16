import React, { useMemo, useState } from "react";
import TokenCardSkeleton from "@/components/ui/skeletons/TokenCardSkeleton";
import TokenCard from "@/components/ui/cards/TokenCard";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Auction } from "@/types/auctions";

const MainAuctions = ({
  auctions,
  isAuctionsLoading,
  text
}: {
  auctions: Auction[];
  isAuctionsLoading: boolean;
  text: string;
}) => {
  const [hotAuctions, setHotAuctions] = useState<Auction[]>([]);
  const [isInformationHovered, setIsInformationHovered] = useState<boolean>(false);

  useMemo(() => {
    if (auctions && auctions.length > 0) {
      const tempHotAuctions = auctions
        ?.filter(
          (auction) =>
            auction?.status === "CREATED" &&
            auction?.listingType === "Auction" &&
            Number(auction?.quantity) > 0 &&
            new Date(Number(auction?.startTime) * 1000).getTime() < Date.now() &&
            new Date(Number(auction?.endTime) * 1000).getTime() > Date.now()
        )
        .sort((a, b) => b.numberOfBids - a.numberOfBids);

      const slicedHotAuctions = tempHotAuctions.slice(0, 4);

      setHotAuctions(slicedHotAuctions);
    }
  }, [auctions]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-white ">{text}</span>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!isAuctionsLoading ? (
          <>
            {hotAuctions?.map((auction: Auction, index) => (
              <TokenCard
                key={index}
                item={auction.item}
                isToken={true}
                listingType={auction?.listingType}
                isListing={auction?.listingType === "Direct"}
                isAuction={auction?.listingType === "Auction"}
                url={
                  !auction?.tokenData
                    ? `/${auction?.chainId}/offer/${auction?.offerId}/${auction?.tokenId}`
                    : `/${auction?.chainId}/offer/${auction.item.nftContract?.adOffers[0]?.id}/${auction.tokenId}?tokenData=${auction.item.mint?.tokenData}`
                }
                currencyDecimals={auction?.currencyDecimals}
              />
            ))}
          </>
        ) : (
          <>
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
            <TokenCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default MainAuctions;
