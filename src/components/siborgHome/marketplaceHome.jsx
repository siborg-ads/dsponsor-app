import React, { useState, useMemo } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ItemCardSkeleton from "../skeleton/ItemCardSkeleton";
import OfferItem from "../cards/offerItem";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

const MarketplaceHome = ({ auctions, setAllTokens, allTokens, isAuctionsLoading }) => {
  const [filterName, setFilterName] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState("All tokens");
  const [IsInformationHovered, setIsInformationHovered] = useState(false);

  const filteredAuctions = useMemo(() => {
    let tempAuctions = auctions;

    if (!allTokens) {
      tempAuctions.filter(
        (auction) =>
          auction?.status === "CREATED" &&
          new Date(auction?.startTime * 1000) < Date.now() &&
          new Date(auction?.endTime * 1000) > Date.now()
      );
    }

    if (filterName && filterName.length > 0 && filterName !== "") {
      tempAuctions = tempAuctions.filter((auction) =>
        auction.name?.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterOption === "Listed tokens") {
      tempAuctions = tempAuctions.filter(
        (auction) => auction?.listingType === "Auction" || auction?.listingType === "Direct"
      );
    } else if (filterOption === "On auction") {
      tempAuctions = tempAuctions.filter((auction) => auction?.listingType === "Auction");
    } else if (filterOption === "Sold") {
      tempAuctions = tempAuctions.filter((auction) => auction?.sold);
    }

    if (sortOption) {
      tempAuctions = [...tempAuctions];
      switch (sortOption) {
        case "Price: low to high":
          tempAuctions.sort(
            (a, b) =>
              (a.listingType === "Auction" ? a.auctionPrice : a.directPrice) -
              (b.listingType === "Auction" ? b.auctionPrice : b.directPrice)
          );
          break;
        case "Price: high to low":
          tempAuctions.sort(
            (a, b) =>
              (b.listingType === "Auction" ? b.auctionPrice : b.directPrice) -
              (a.listingType === "Auction" ? a.auctionPrice : a.directPrice)
          );
          break;
        case "Ending soon":
          tempAuctions.sort((a, b) => a.endTime - b.endTime);
          break;
        case "Newest":
          tempAuctions.sort((a, b) => b.startTime - a.startTime);
          break;
        case "Sort by name":
          tempAuctions.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    } else {
      tempAuctions.sort((a, b) => a.name.localeCompare(b.name)); // default sort
    }

    return tempAuctions;
  }, [filterName, filterOption, sortOption, auctions, allTokens]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-xl text-white font-semibold flex items-center gap-2">
          <Popover placement="top-start" isOpen={IsInformationHovered}>
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
                  The marketplace lists all available ad spaces for sale, you can filter and sort
                  them as you wish
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <span>Marketplace</span>
        </span>
        <div className="flex flex-col gap-20 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-2 h-10">
            <input
              type="text"
              name="search"
              placeholder="Search for ad spaces"
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value);
              }}
              className="w-full h-full rounded-xl bg-secondaryBlack focus:border-jacarta-100 focus:border-opacity-10 focus:ring-0 border border-jacarta-100 border-opacity-10 placeholder:text-jacarta-100 text-white py-2 px-4"
            />
            <div className="grid grid-cols-2 md:flex h-full gap-2 w-full md:w-8/12">
              {}

              <Menu as="div" className="py-4 md:py-0 h-full w-full">
                <MenuButton className="bg-secondaryBlack rounded-xl w-full h-full flex items-center justify-center hover:bg-opacity-80 border border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {filterOption} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem
                    onClick={() => {
                      setFilterOption("All tokens");
                      setAllTokens(true);
                    }}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>All tokens</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterOption("Listed tokens");
                      setAllTokens(false);
                    }}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Listed tokens</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilterOption("On auction");
                      setAllTokens(false);
                    }}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>On auction</span>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setFilterOption("Sold");
                      setAllTokens(true);
                    }}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Sold</span>
                  </MenuItem>
                </MenuItems>
              </Menu>

              <Menu as="div" className="py-4 md:py-0 h-full w-full">
                <MenuButton className="bg-secondaryBlack rounded-xl w-full h-full flex items-center justify-center hover:bg-opacity-80 border border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {sortOption ?? "Sort by"} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem
                    onClick={() => setSortOption("Sort by name")}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Sort by name</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setSortOption("Price: low to high")}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Price: low to high</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setSortOption("Price: high to low")}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Price: high to low</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setSortOption("Ending soon")}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Ending soon</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setSortOption("Newest")}
                    className="hover:bg-primaryBlack p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Newest</span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isAuctionsLoading ? (
              <>
                {filteredAuctions?.map((auction, index) => (
                  <OfferItem
                    key={index}
                    item={auction.item}
                    isToken={true}
                    listingType={auction?.listingType}
                    isListing={auction?.listingType}
                    isAuction={auction?.listingType === "Auction"}
                    url={
                      !auction?.tokenData
                        ? `/${auction?.chainId}/offer/${auction?.offerId}/${auction?.tokenId}`
                        : `/${auction?.chainId}/offer/${auction.item?.nftContract?.adOffers[0]?.id}/${auction?.tokenId}?tokenData=${auction.item?.mint?.tokenData}`
                    }
                  />
                ))}
              </>
            ) : (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <ItemCardSkeleton key={index} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceHome;
