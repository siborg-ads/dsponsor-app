import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Auction from "./auction";

const MarketplaceHome = ({
  chainIdFilter,
  filter,
  auctions,
  setFilter,
  setChainIdFilter,
}) => {
  const [chainIdFilterText, setChainIdFilterText] = useState("All chains");
  const [isHoveringCard, setIsHoveringCard] = useState(
    Array(auctions.length).fill(false)
  );
  const [filterName, setFilterName] = useState(null);
  const [filteredAuctions, setFilteredAuctions] = useState(auctions);

  useEffect(() => {
    let tempFilteredAuctions = auctions;

    if (filterName) {
      tempFilteredAuctions = tempFilteredAuctions.filter((auction) =>
        auction.name.toLowerCase().includes(filterName.toLowerCase())
      );
    } else {
      tempFilteredAuctions = auctions;
    }

    if (chainIdFilter) {
      tempFilteredAuctions = tempFilteredAuctions.filter(
        (auction) => auction.chainId === chainIdFilter
      );
    } else {
      tempFilteredAuctions = auctions;
    }

    setFilteredAuctions(tempFilteredAuctions);
  }, [filterName, chainIdFilter, auctions]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-xl text-white font-semibold">Marketplace</span>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 h-10">
            <input
              type="text"
              placeholder="Search for ad spaces"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="w-full h-full rounded-xl bg-jacarta-600 focus:border-jacarta-100 focus:border-opacity-10 focus:ring-0 border border-jacarta-100 border-opacity-10 text-placeholder-jacarta-200 text-white py-2 px-4"
            />
            <Menu as="div" className="w-4/12 h-full">
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
            <Menu as="div" className="w-4/12 h-full">
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
                  onClick={() => setFilter("All the ad spaces")}
                  className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                >
                  <span>All the ad spaces</span>
                </MenuItem>
                <MenuItem
                  onClick={() => setFilter("Price: low to high")}
                  className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                >
                  <span>Price: low to high</span>
                </MenuItem>
                <MenuItem
                  onClick={() => setFilter("Price: high to low")}
                  className="hover:bg-jacarta-500 p-2 rounded-lg w-full pr-12 md:pr-24"
                >
                  <span>Price: high to low</span>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAuctions.map((auction, index) => (
              <>
                <Link
                  key={index}
                  href={auction.link ?? ""}
                  className="cursor-pointer md:cursor-default"
                  onMouseEnter={() =>
                    setIsHoveringCard(
                      Array(auctions.length)
                        .fill(false, index, index + 1)
                        .fill(true, index, index + 1)
                    )
                  }
                  onMouseLeave={() =>
                    setIsHoveringCard(Array(auctions.length).fill(false))
                  }
                >
                  <Auction
                    auction={auction}
                    isHoveringCard={isHoveringCard}
                    index={index}
                  />
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketplaceHome;
