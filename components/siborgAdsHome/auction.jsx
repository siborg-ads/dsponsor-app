import React from "react";
import Image from "next/image";

const Auction = ({ auction, isHoveringCard, index }) => {
  return (
    <>
      {" "}
      <div className="p-2 flex flex-col gap-2 border box-border hover:border-2 hover:-m-1 border-jacarta-100 shadow-lg hover:shadow-xl border-opacity-10 rounded-xl bg-jacarta-800 hover:bg-jacarta-700 hover:-translate-y-0.5 duration-200">
        <div className="w-full h-48 bg-jacarta-600 rounded-lg relative">
          {/*<Image src="/images/1.jpg" alt="1" width={128} height={128} />*/}
          <div className={`flex items-center justify-center mx-auto`}>
            <button
              className={`${
                isHoveringCard[index]
                  ? "translate-y-0 opacity-100 duration-200 bg-white"
                  : "translate-y-2 opacity-0 duration-200 bg-jacarta-200"
              } absolute text-sm bottom-0 hover:bg-jacarta-100 rounded-lg px-2 py-2 text-jacarta-900 font-semibold m-2 cursor-pointer`}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <div className="text-jacarta-200 text-xs">
              #{auction.category ?? "category"}
            </div>
            <div className="text-white font-semibold text-lg">
              {auction.name ?? "name"}
            </div>
          </div>
          <div className="bg-jacarta-600 py-2 px-4 grid grid-cols-2 gap-2 rounded-lg">
            <div className="flex flex-col gap-1">
              <span className="text-jacarta-200 text-xs">Chain</span>
              <span className="text-white font-semibold text-sm">
                {auction.chain ?? "Ethereum"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-jacarta-200 text-xs">Price</span>
              <span className="text-white font-semibold text-sm">
                {auction.price ?? 0} {auction.currencySymbol ?? "USDC"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
