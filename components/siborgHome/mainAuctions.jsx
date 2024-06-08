import React, { useState, useEffect } from "react";
import Link from "next/link";
import Auction from "./auction";

const MainAuctions = ({ auctions }) => {
  const [isHoveringCard, setIsHoveringCard] = useState(Array(auctions?.length).fill(false));
  const [randomAuctions, setRandomAuctions] = useState([]);
  const [liveAuctions, setLiveAuctions] = useState([]);

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
          {randomAuctions.map((auction, index) => (
            <Link
              key={index}
              href={auction.link ?? ""}
              className="cursor-pointer md:cursor-default"
              onMouseEnter={() =>
                setIsHoveringCard(
                  Array(randomAuctions?.length)
                    .fill(false, index, index + 1)
                    .fill(true, index, index + 1)
                )
              }
              onMouseLeave={() => setIsHoveringCard(Array(randomAuctions?.length).fill(false))}
            >
              <Auction auction={auction} isHoveringCard={isHoveringCard} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainAuctions;
