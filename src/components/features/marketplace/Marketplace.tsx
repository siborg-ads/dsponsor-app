import React, { useState, useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import TokenCardSkeleton from "@/components/ui/skeletons/TokenCardSkeleton";
import TokenCard from "@/components/ui/cards/TokenCard";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Input from "@/components/ui/Input";
import { Button, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";
import ModalHelper from "@/components/ui/modals/Helper";
import { XMarkIcon } from "@heroicons/react/20/solid";

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
      if (filterOption === "On auction") {
        tempAuctions = [...tempAuctions].filter(
          (auction) =>
            auction?.status === "CREATED" &&
            new Date(auction?.startTime * 1000).getTime() < Date.now() &&
            new Date(auction?.endTime * 1000).getTime() > Date.now()
        );
      }

      if (filterOption === "Buy now") {
        tempAuctions = [...tempAuctions].filter(
          (auction) =>
            (auction?.listingType === "Direct" &&
              auction?.status === "CREATED" &&
              new Date(auction?.startTime * 1000).getTime() < Date.now() &&
              new Date(auction?.endTime * 1000).getTime() > Date.now()) ||
            (auction?.item?.mint === null &&
              auction?.item?.nftContract?.prices[0]?.enabled === true)
        );
      }
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

    if (startDate) {
      tempAuctions = [...tempAuctions].filter((auction) => {
        const validFrom = new Date(auction.item.metadata.valid_from);
        validFrom.setHours(0, 0, 0, 0);
        return validFrom <= startDate;
      });
    }
    if (endDate) {
      tempAuctions = [...tempAuctions].filter((auction) => {
        const validTo = new Date(auction.item.metadata.valid_to);
        validTo.setHours(23, 59, 59, 999);
        return validTo >= endDate;
      });
    }

    return tempAuctions;
  }, [filterName, filterOption, sortOption, auctions, allTokens, startDate, endDate]);

  const renderDatePicker = (
    date: Date | null,
    setDate: (date: Date | null) => void,
    label: string
  ) => (
    <div className="flex flex-col items-center justify-center h-full gap-1">
      <DatePicker
        value={!date ? null : parseDate(new Date(date).toISOString().slice(0, 10))}
        onChange={(date) => {
          setDate(new Date(Date.UTC(date.year, date.month - 1, date.day, 0)));
        }}
        showMonthAndYearPickers
        style={{ height: "100%" }}
        labelPlacement="inside"
        label={label}
        startContent={
          date && (
            <Button
              variant="light"
              className="rounded-full"
              size="sm"
              onClick={() => setDate(null)}
              isIconOnly
            >
              <XMarkIcon className="w-5 h-5" />
            </Button>
          )
        }
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-7">
      <span className="flex items-center gap-2 text-xl font-semibold text-white">
        <Popover placement="top-start" isOpen={isInformationHovered}>
          <PopoverTrigger>
            <InformationCircleIcon
              className="w-6 h-6 text-white cursor-pointer"
              onMouseEnter={() => setIsInformationHovered(true)}
              onMouseLeave={() => setIsInformationHovered(false)}
            />
          </PopoverTrigger>
          <PopoverContent className="border border-white shadow bg-secondaryBlack border-opacity-10">
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

        <div className="flex flex-wrap-reverse items-center justify-end h-12 gap-4 text-jacarta-900 dark:text-white">
          {renderDatePicker(startDate, setStartDate, "Validity Start date")}
          {renderDatePicker(endDate, setEndDate, "Validity End date")}
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
                className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
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
                className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
              >
                On auction
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("Buy now");
                  setAllTokens(false);
                }}
                className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
              >
                Buy now
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
                    className="w-full p-2 pr-12 text-left rounded-lg hover:bg-primaryBlack md:pr-24"
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
