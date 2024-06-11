import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ItemCardSkeleton from "../skeleton/ItemCardSkeleton";
import OfferItem from "../cards/offerItem";

const MarketplaceHome = ({ chainIdFilter, auctions, setChainIdFilter, setAllTokens }) => {
  const [isHoveringCard, setIsHoveringCard] = useState(Array(auctions?.length).fill(false));
  const [filterName, setFilterName] = useState(null);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);
  const [priceSorting, setPriceSorting] = useState(null);
  const [sort, setSort] = useState("Sort by name");
  const [filter, setFilter] = useState("Filter by");
  const [dateSorting, setDateSorting] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [nameSorting, setNameSorting] = useState(null);
  const [filterListedTokens, setFilterListedTokens] = useState(false);

  useEffect(() => {
    let tempFilteredAuctions = auctions;

    if (filterName !== null && filterName !== "" && filterName !== undefined) {
      tempFilteredAuctions = tempFilteredAuctions.filter((auction) =>
        auction.name?.toLowerCase().includes(filterName?.toLowerCase())
      );
    }

    setFilteredAuctions(tempFilteredAuctions);
  }, [filterName, auctions]);

  useEffect(() => {
    let tempFilteredAuctions = auctions;

    if (filterListedTokens) {
      tempFilteredAuctions = tempFilteredAuctions.filter(
        (auction) => auction?.type === "Auction" || auction?.type === "Direct"
      );
    } else {
      tempFilteredAuctions = auctions;
    }

    setFilteredAuctions(tempFilteredAuctions);
  }, [filterListedTokens, auctions]);

  useEffect(() => {
    setFilteredAuctions(() => {
      let tempAuctions = auctions;

      // create two arrays for auctions and direct listing with the type of listing
      let auctionsArray = [];
      let directListingArray = [];

      tempAuctions.forEach((auction) => {
        if (auction?.type === "Auction") {
          auctionsArray.push(auction);
        } else if (auction?.type === "Direct") {
          directListingArray.push(auction);
        }
      });

      if (priceSorting === 1) {
        // sort by price low to high
        auctionsArray = auctionsArray.sort((a, b) => a.auctionPrice - b.auctionPrice);
        directListingArray = directListingArray.sort((a, b) => a.directPrice - b.directPrice);
      } else if (priceSorting === -1) {
        // sort by price high to low
        auctionsArray = auctionsArray.sort((a, b) => b.auctionPrice - a.auctionPrice);
        directListingArray = directListingArray.sort((a, b) => b.directPrice - a.directPrice);
      } else {
        tempAuctions = auctions;
      }

      // merge the two arrays with auctions first and direct listing second
      tempAuctions = auctionsArray.concat(directListingArray);

      // remove listing not live
      tempAuctions = tempAuctions.filter(
        (auction) => auction?.type === "Auction" || auction?.type === "Direct"
      );

      return tempAuctions;
    });
  }, [priceSorting, auctions]);

  useEffect(() => {
    setFilteredAuctions(() => {
      let tempAuctions = auctions.filter(
        (auction) =>
          new Date(auction.startTime * 1000) < new Date() &&
          new Date(auction.endTime * 1000) > new Date()
      );

      if (dateSorting === 1) {
        // end time is the closest to the current date
        tempAuctions = tempAuctions.sort((a, b) => a.endTime - b.endTime);
      } else if (dateSorting === -1) {
        // start time is the closest to the current date
        tempAuctions = tempAuctions.sort((a, b) => a.startTime - b.startTime);
      } else {
        tempAuctions = auctions;
      }

      // remove listing not live
      tempAuctions = tempAuctions.filter(
        (auction) => auction?.type === "Auction" || auction?.type === "Direct"
      );

      return tempAuctions;
    });
  }, [dateSorting, auctions]);

  useEffect(() => {
    setFilteredAuctions(() => {
      let tempAuctions = auctions;

      if (nameSorting === 1) {
        // sort by name
        tempAuctions = auctions.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        tempAuctions = auctions;
      }

      return tempAuctions;
    });
  }, [nameSorting, auctions]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-xl text-white font-semibold">Marketplace</span>
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
              className="w-full h-full rounded-xl bg-jacarta-600 focus:border-jacarta-100 focus:border-opacity-10 focus:ring-0 border border-jacarta-100 border-opacity-10 text-placeholder-jacarta-200 text-white py-2 px-4"
            />
            <div className="grid grid-cols-2 md:flex h-full gap-2 w-full md:w-8/12">
              {/*
              <Menu as="div" className="py-4 md:py-0 h-full w-full">
                <MenuButton className="bg-jacarta-600 rounded-xl w-full h-full flex items-center justify-center hover:bg-jacarta-500 border border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {chainIdFilterText} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl [--anchor-gap:1rem] flex flex-col gap-2 bg-jacarta-600 p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem
                    onClick={() => {
                      setChainIdFilter(null);
                      setChainIdFilterText("All chains");
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>All chains</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setChainIdFilter(1);
                      setChainIdFilterText("Ethereum");
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Ethereum</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setChainIdFilter(8453);
                      setChainIdFilterText("Base");
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Base</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setChainIdFilter(11155111);
                      setChainIdFilterText("Sepolia");
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Sepolia</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setChainIdFilter(84532);
                      setChainIdFilterText("Base Sepolia");
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Base Sepolia</span>
                  </MenuItem>
                </MenuItems>
              </Menu>
              */}

              <Menu as="div" className="py-4 md:py-0 h-full w-full">
                <MenuButton className="bg-jacarta-600 rounded-xl w-full h-full flex items-center justify-center hover:bg-jacarta-500 border border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {filter} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-jacarta-600 p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem
                    onClick={() => {
                      setFilter("All the spaces");
                      setAllTokens(true);
                      setFilterListedTokens(false);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>All the spaces</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilter("Listed tokens");
                      setAllTokens(false);
                      setFilterListedTokens(true);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Listed tokens</span>
                  </MenuItem>
                </MenuItems>
              </Menu>

              <Menu as="div" className="py-4 md:py-0 h-full w-full">
                <MenuButton className="bg-jacarta-600 rounded-xl w-full h-full flex items-center justify-center hover:bg-jacarta-500 border border-jacarta-100 border-opacity-10">
                  <div className="flex items-center gap-1">
                    {sort} <ChevronDownIcon className="w-5 h-5" />
                  </div>
                </MenuButton>
                <MenuItems
                  anchor="bottom start"
                  className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-jacarta-600 p-2 border border-jacarta-100 border-opacity-10`}
                >
                  <MenuItem
                    onClick={() => {
                      setSort("Sort by name");
                      setPriceSorting(null);
                      setDateSorting(null);
                      setNameSorting(1);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Sort by name</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSort("Price: low to high");
                      setPriceSorting(1);
                      setDateSorting(null);
                      setNameSorting(null);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Price: low to high</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSort("Price: high to low");
                      setPriceSorting(-1);
                      setDateSorting(null);
                      setNameSorting(null);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Price: high to low</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSort("Ending soon");
                      setDateSorting(1);
                      setPriceSorting(null);
                      setNameSorting(null);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Ending soon</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSort("Newest");
                      setDateSorting(-1);
                      setPriceSorting(null);
                      setNameSorting(null);
                    }}
                    className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                  >
                    <span>Newest</span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAuctions?.length !== 0 ? (
              <>
                {filteredAuctions?.map((auction, index) => (
                  <>
                    <OfferItem
                      key={index}
                      item={auction.item}
                      isToken={true}
                      isListing={auction?.type}
                      isOwner={isOwner}
                      isAuction={auction?.type === "Auction"}
                      url={
                        !auction?.tokenData
                          ? `/${auction?.chainId}/offer/${auction?.offerId}/${auction?.tokenId}`
                          : `/${auction?.chainId}/offer/${auction.item?.nftContract?.adOffers[0]?.id}/${auction?.tokenId}?tokenData=${auction.item?.mint?.tokenData}`
                      }
                    />
                  </>
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
