import React, { useState, useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import TokenCardSkeleton from "@/components/ui/skeletons/TokenCardSkeleton";
import TokenCard from "@/components/ui/cards/TokenCard";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Input from "@/components/ui/Input";

const onAuctionCondition = (auction, mint, direct) => {
  return (
    (auction?.status === "CREATED" &&
      (auction?.listingType === "Auction" || (auction?.listingType === "Direct" && direct)) &&
      Number(auction?.quantity) > 0 &&
      new Date(Number(auction?.startTime) * 1000) < new Date() &&
      new Date(Number(auction?.endTime) * 1000) > new Date()) ||
    (mint && auction?.item?.mint === null)
  );
};

const MarketplaceComponent = ({ auctions, setAllTokens, allTokens, isAuctionsLoading }) => {
  const [filterName, setFilterName] = useState("");
  const [sortOption, setSortOption] = useState("Price: low to high");
  const [filterOption, setFilterOption] = useState("All tokens");
  const [isInformationHovered, setIsInformationHovered] = useState(false);

  const filteredAuctions = useMemo(() => {
    let tempAuctions = [...auctions];

    // keep enabled minted tokens and tokens already minted (updated)
    tempAuctions = [...tempAuctions].filter(
      (auction) =>
        (auction?.item?.nftContract?.prices[0]?.enabled === true || auction?.item?.mint !== null) &&
        new Date(auction?.item?.metadata?.valid_to).getTime() >= Date.now() &&
        auction?.item?.disable === false
    );

    if (!allTokens) {
      tempAuctions = [...tempAuctions].filter(
        (auction) =>
          auction?.status === "CREATED" &&
          new Date(auction?.startTime * 1000).getTime() < Date.now() &&
          new Date(auction?.endTime * 1000).getTime() > Date.now()
      );
    }

    if (filterName && filterName.length > 0 && filterName !== "") {
      tempAuctions = [...tempAuctions].filter((auction) =>
        auction.name?.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterOption === "Listed tokens") {
      tempAuctions = tempAuctions.filter(
        (auction) => auction?.listingType === "Auction" || auction?.listingType === "Direct"
      );
    } else if (filterOption === "On auction") {
      tempAuctions = [...tempAuctions].filter((auction) =>
        onAuctionCondition(auction, false, false)
      );
    } else if (filterOption === "Sold") {
      tempAuctions = [...tempAuctions].filter((auction) => auction?.sold);
    }

    if (sortOption && sortOption.length > 0 && sortOption !== "") {
      tempAuctions = [...tempAuctions];

      switch (sortOption) {
        case "Price: low to high": {
          let liveAuctions = [...tempAuctions].filter((auction) =>
            onAuctionCondition(auction, true, true)
          );
          liveAuctions = [...liveAuctions].sort((a, b) => {
            if (a?.usdcPriceBN?.USDCPrice.lt(b?.usdcPriceBN?.USDCPrice)) {
              return -1;
            } else if (a?.usdcPriceBN?.USDCPrice.gt(b?.usdcPriceBN?.USDCPrice)) {
              return 1;
            } else {
              return 0;
            }
          });

          const otherAuctions = tempAuctions.filter(
            (auction) => !onAuctionCondition(auction, true, true)
          );

          tempAuctions = [...liveAuctions, ...otherAuctions];

          break;
        }
        case "Price: high to low": {
          let liveAuctions = [...tempAuctions].filter((auction) =>
            onAuctionCondition(auction, true, true)
          );
          liveAuctions = [...liveAuctions].sort((a, b) => {
            if (a?.usdcPriceBN?.USDCPrice.gt(b?.usdcPriceBN?.USDCPrice)) {
              return -1;
            } else if (a?.usdcPriceBN?.USDCPrice.lt(b?.usdcPriceBN?.USDCPrice)) {
              return 1;
            } else {
              return 0;
            }
          });

          let otherAuctions = [...tempAuctions].filter(
            (auction) => !onAuctionCondition(auction, true, true)
          );

          tempAuctions = [...liveAuctions, ...otherAuctions];
          break;
        }
        case "Ending soon": {
          let liveAuctions = [...tempAuctions]?.filter(
            (auction) => onAuctionCondition(auction, true, true) && auction?.endTime
          );
          liveAuctions = [...liveAuctions]?.sort((a, b) => a.endTime - b.endTime);

          const otherAuctions = [...tempAuctions]?.filter(
            (auction) => !onAuctionCondition(auction, true, true) || !auction?.endTime
          );

          tempAuctions = [...liveAuctions, ...otherAuctions];
          break;
        }
        case "Newest":
          tempAuctions = [...tempAuctions].sort((a, b) => b.startTime - a.startTime);
          break;
        case "Sort by name":
          tempAuctions = [...tempAuctions].sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      if (sortOption !== "Sort by name") {
        tempAuctions = [...tempAuctions];
      }
    } else {
      tempAuctions = [...tempAuctions].sort((a, b) => a.name.localeCompare(b.name)); // default sort
    }

    return tempAuctions;
  }, [filterName, filterOption, sortOption, auctions, allTokens]);

  return (
    <div className="flex flex-col gap-7">
      <span className="text-xl text-white font-semibold flex items-center gap-2">
        <Popover placement="top-start" isOpen={isInformationHovered}>
          <PopoverTrigger>
            <InformationCircleIcon
              className="h-6 w-6 text-white cursor-pointer"
              onMouseEnter={() => setIsInformationHovered(true)}
              onMouseLeave={() => setIsInformationHovered(false)}
            />
          </PopoverTrigger>
          <PopoverContent className="bg-secondaryBlack shadow border border-white border-opacity-10">
            <div className="px-1 py-2">
              <div className="text-small">
                This page highlights all ad spaces from curated offers. You will not see your tokens
                below if they are not from offers curated by the SiBorg Ads team.
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <span>Marketplace (curated offers)</span>
      </span>

      <div className="flex flex-row flex-wrap-reverse items-center justify-end gap-2 mb-4 sm:gap-4">
        <div className="flex w-full mr-0 md:mr-auto md:max-w-[500px]">
          <Input
            type="text"
            placeholder="Search..."
            name="search"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>

        {/* Filter Menu */}
        <Menu as="div" className="h-12 w-fit">
          <MenuButton className="flex items-center justify-center w-full h-full px-4 border bg-secondaryBlack rounded-xl hover:bg-opacity-80 border-jacarta-100 border-opacity-10">
            <div className="flex items-center gap-1">
              {filterOption} <ChevronDownIcon className="w-5 h-5" />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
          >
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("All tokens");
                  setAllTokens(true);
                }}
                className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
              >
                All tokens
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("On auction");
                  setAllTokens(false);
                }}
                className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
              >
                On auction
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>

        {/* Sort Menu */}
        <Menu as="div" className="h-12 w-fit">
          <MenuButton className="flex items-center justify-center w-full h-full px-4 border bg-secondaryBlack rounded-xl hover:bg-opacity-80 border-jacarta-100 border-opacity-10">
            <div className="flex items-center gap-1">
              {sortOption ?? "Sort by"} <ChevronDownIcon className="w-5 h-5" />
            </div>
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
          >
            {" "}
            {["Sort by name", "Price: low to high", "Price: high to low", "Ending soon"].map(
              (option) => (
                <MenuItem key={option}>
                  <button
                    onClick={() => setSortOption(option)}
                    className="hover:bg-primaryBlack p-2 text-left rounded-lg w-full pr-12 md:pr-24"
                  >
                    {option}
                  </button>
                </MenuItem>
              )
            )}
          </MenuItems>
        </Menu>
      </div>

      {/* Auction Listings */}
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-4">
        {!isAuctionsLoading
          ? filteredAuctions?.map((auction, index) => (
              <TokenCard
                key={index}
                item={auction.item}
                isToken={true}
                listingType={auction?.listingType}
                isListing={auction?.listingType}
                isAuction={auction?.listingType === "Auction"}
                url={
                  auction?.tokenData
                    ? `/${auction?.chainId}/offer/${auction.offerId}/${auction.tokenId}?tokenData=${auction.tokenData}`
                    : `/${auction?.chainId}/offer/${auction?.offerId}/${auction?.tokenId}`
                }
                currencyDecimals={auction?.currencyDecimals}
                currencySymbol={auction?.currencySymbol}
                tokenId={auction?.tokenId}
                offer={auction}
                usdcPriceFormatted={auction?.usdcPriceFormatted}
              />
            ))
          : Array.from({ length: 12 }).map((_, index) => <TokenCardSkeleton key={index} />)}
      </div>
    </div>
  );
};

export default MarketplaceComponent;
