import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import Review_carousel from "../carousel/review_carousel";
import { useChainContext } from "../../contexts/hooks/useChainContext";

const Review_adProposal_items = () => {
  const { sortedtrendingCategoryItemData } = useSelector((state) => state.counter);
  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;
  const dispatch = useDispatch();
  const router = useRouter();
  const offerAddress = "0x17c923c242c3217bd27e8f402a3608c2c8689618c12723d585fa19d7657ff06a0c000000";


  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {sortedtrendingCategoryItemData.map((item) => {
        const { id, image, title, price, maxToken, tokenId, ownerName, offerId, isAlreadyMinted } = item;
        const itemLink = image.split("/").slice(-1).toString().replace(".jpg", "").replace(".gif", "");
        return (
          <article key={id}>
            <div className={`dark:bg-jacarta-700 ${isAlreadyMinted ? "dark:border-jacarta-700" : "border-green"}  rounded-2.5xl block border-2 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg`}>
              <figure className="relative">
                <Link href={`/${chainId}/offer/${offerAddress}`}>
                  <Image width={230} height={230} src={image} alt="item 5" className="w-full h-[230px] rounded-[0.625rem] object-cover" />
                </Link>
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <Link href={`/${chainId}/offer/${offerAddress}`}>
                  <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">{title}</span>
                </Link>
              </div>
              <div className="mt-2 text-sm flex justify-between">
                <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">{price}</span>
                <span className={`${isAlreadyMinted ? "dark:text-jacarta-300" : "dark:text-green"}`}>
                  {tokenId}/{maxToken}
                </span>
              </div>

              <div className="mt-8 flex items-center justify-between">
                {ownerName ? (
                  <p className="dark:text-white font-display text-sm font-semibold">{ownerName}</p>
                ) : (
                  <Link href={`/${chainId}/offer/${offerAddress}`} className="text-accent font-display text-sm font-semibold">
                    Buy now
                  </Link>
                )}

                <Link href={`/${chainId}/offer/${offerAddress}`} className="group flex items-center">
                  <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                    <use xlinkHref="/icons.svg#icon-history"></use>
                  </svg>
                  <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">View History</span>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Review_adProposal_items;
