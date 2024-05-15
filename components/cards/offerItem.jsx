'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import adminInstance from "../../utils/sdkProvider";
import {protocolFees} from "../../utils/constUtils";
import {  useContract,useContractRead,  } from "@thirdweb-dev/react";



const OfferItem = ({ item, url, isToken, isSelectionActive, isOwner }) => {
  const [price, setPrice] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(null);
  const [itemData, setItemData] = useState({});
  const [adStatut, setAdStatut] = useState(null);
  const { contract: tokenContract } = useContract(!isToken && item?.nftContract?.prices[0]?.currency, "token");
  const { data: symbolContract } = useContractRead(tokenContract, "symbol");
  const { data: decimalsContract } = useContractRead(tokenContract, "decimals");



  function formatDate(dateIsoString) {
    if (!dateIsoString) return "date not found";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateIsoString).toLocaleDateString("en-EN", options);
  }
  useEffect(() => {





    try {
       const currencyTokenObject = {};
       if (!decimalsContract && !symbolContract) {
         const currencyToken = adminInstance.chain.getCurrencyByAddress(item?.nftContract?.prices[0]?.currency);
         currencyTokenObject.symbol = currencyToken.symbol;
         currencyTokenObject.decimals = currencyToken.decimals;
       } else {
         currencyTokenObject.symbol = symbolContract;
         currencyTokenObject.decimals = decimalsContract;
       }
       const formatPrice = item?.nftContract?.prices[0]?.amount / 10 ** currencyTokenObject.decimals;
      setCurrencyToken(currencyTokenObject);
      setPrice(formatPrice);
    } catch (e) {
      console.error("Error: Currency not found for address");
    }
    if (isToken) {
      const data = item?.metadata?.offer ? item?.metadata?.offer : null;
      setItemData(data);
    } else {
      const data = item.metadata?.offer ? item.metadata?.offer : null;
      setItemData(data);
    }
  }, [item, isToken,  symbolContract, decimalsContract]);

  // useEffect(() => {
  //   const fetchAdsOffers = async () => {
  //     if (!item) return;

  //     if (item?.mint === null) {
  //       setAdStatut(3);
  //       return;
  //     }
  //     if (item?.currentProposals?.length > 0) {
  //       if (item?.currentProposals[0]?.acceptedProposal !== null) {
  //         setAdStatut(1);
  //         return;
  //       }

  //       if (item?.currentProposals[0]?.pendingProposal !== null) {
  //         setAdStatut(2);
  //       }
  //       if (item?.currentProposals[0]?.rejectedProposal !== null) {
  //         setAdStatut(0);
  //       }
  //     } else {
  //       setAdStatut(3);
  //     }
  //   };

  //   fetchAdsOffers();
  // }, [item]);

  const { name = "offerName", image = "/images/gradient_creative.jpg", valid_from = null, valid_to = null } = itemData ? itemData : {};

  return (
    <>
      <article className="relative">
        {item.isPending && isOwner && <div className="absolute -top-2 -right-2 rounded-2xl bg-red rounded-2xl dark:text-white  px-2">!</div>}

        <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          <figure>
            {isSelectionActive ? (
              image && <Image src={image ? image : "/images/gradient_creative.jpg"} alt="logo" height={230} width={230} className="rounded-[0.625rem] w-full lg:h-[230px] object-contain" loading="lazy" />
            ) : (
              <Link href={url}>
                {image && <Image src={image ? image : "/images/gradient_creative.jpg"} alt="logo" height={230} width={230} className="rounded-[0.625rem] w-full lg:h-[230px] object-contain" loading="lazy" />}
              </Link>
            )}
          </figure>
          <div className="mt-4 flex items-center justify-between">
            {isSelectionActive ? (
              <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">{name}</span>
            ) : (
              <Link href={url} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">{name}</span>
              </Link>
            )}

            {!isToken ? (
              <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                {" "}

                <span className="text-green text-sm font-medium tracking-tight">
                  {price * protocolFees/100 + price} {currencyToken?.symbol ? currencyToken?.symbol : "N/A"}
                </span>
              </div>
            ) : (
              <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                <span className="text-green text-sm font-medium tracking-tight"># {item.tokenData ? item.tokenData : item.tokenId}</span>
              </div>
            )}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            <span className="dark:text-jacarta-300 text-jacarta-500">
              {formatDate(valid_from)} - {formatDate(valid_to)}
            </span>
            {/* {!isToken ? (
              <span className="dark:text-jacarta-300 text-jacarta-500">
                {formatDate(valid_from)} - {formatDate(valid_to)}
              </span>
            ) : (
              <span className={`${adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-accent" : ""} text-sm font-bold`}>
                {adStatut === 0 ? "❌ Rejected" : adStatut === 1 ? "✅ Accepted" : adStatut === 2 ? "🔍 Pending" : "Ad space available"}
              </span>
            )} */}
            <span className="dark:text-jacarta-300 text-jacarta-500">Offer # {item.mint ? item.nftContract?.adOffers[0]?.id : item.id}</span>
          </div>
        </div>
        <div className="mt-2 text-xs">
          {!isToken ? (
            <span className="dark:text-jacarta-300 text-jacarta-500">
              {formatDate(valid_from)} - {formatDate(valid_to)}
            </span>
          ) : (
            <span
              className={`${
                adStatus === 0
                  ? "text-red"
                  : adStatus === 1
                  ? "text-green"
                  : adStatus === 2
                  ? "text-accent"
                  : ""
              } text-sm font-bold`}
            >
              {adStatus === 0
                ? "❌ Rejected"
                : adStatus === 1
                ? "✅ Accepted"
                : adStatus === 2
                ? "🔍 Pending"
                : "Ad space available"}
            </span>
          )}
        </div>
      </article>
    </>
  );
};

export default OfferItem;
