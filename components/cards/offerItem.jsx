import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { use, useEffect, useState } from "react";
import { useCountdown } from "../../utils/countDown";
import adminInstance from "../../utils/sdkProvider";
import { protocolFeesBigNumber } from "../../utils/constUtils";
import { useAddress, useSwitchChain, useContract, useContractWrite, Web3Button, useContractRead, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { contractABI } from "../../utils/constUtils";
import { useChainContext } from "../../contexts/hooks/useChainContext";

const OfferItem = ({ item, url, isToken, isSelectionActive, isOwner, isAuction = false }) => {
  const { currentChainObject } = useChainContext();
  const [price, setPrice] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(null);
  const [itemData, setItemData] = useState({});
  const [adStatut, setAdStatut] = useState(null);
  const { contract: tokenContract } = useContract(!isToken && item?.nftContract?.prices[0]?.currency, "token");
  const { data: symbolContract } = useContractRead(tokenContract, "symbol");
  const { data: decimalsContract } = useContractRead(tokenContract, "decimals");
  const { contract: DsponsorAdminContract } = useContract(currentChainObject?.smartContracts?.DSPONSORADMIN?.address, currentChainObject?.smartContracts?.DSPONSORADMIN?.abi);
  const { data: bps } = useContractRead(DsponsorAdminContract, "feeBps");
  const maxBps = 10000;

  function formatDate(dateIsoString) {
    if (!dateIsoString) return "date not found";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateIsoString).toLocaleDateString("en-EN", options);
  }
 const formatAuctionDate = (timestamp) => {
   if (!timestamp) return "";

   // Convertir le timestamp en objet Date
   const date = new Date(timestamp*1000);

   const dates = date.toLocaleString("en-EN", {
     year: "numeric",
     month: "long",
     day: "numeric",
     hour: "2-digit",
     minute: "2-digit",
     hour12: true,
   });


   return dates;
 };
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

      const bigIntPrice = (BigInt(item?.nftContract?.prices[0]?.amount) * (BigInt(bps) + BigInt(maxBps))) / BigInt(maxBps);
      const formatPrice = ethers.utils.formatUnits(bigIntPrice, currencyTokenObject.decimals);

      setCurrencyToken(currencyTokenObject);
      setPrice(Number(Math.ceil(formatPrice * 1000) / 1000));
    } catch (e) {
      console.error("Error: Currency not found for address");
    }
    if (isToken) {
      const data = item.metadata ? item.metadata : null;
      setItemData(data);
    } else {
      const data = item.metadata.offer ? item.metadata.offer : null;
      setItemData(data);
    }
  }, [item, isToken, symbolContract, decimalsContract, bps]);

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

  const { name = "offerName", image = "/images/gradient_creative.jpg", valid_from = null, valid_to = null, startTime = null, endTime = null } = itemData ? itemData : {};

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
              currencyToken?.symbol && (
                <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                  {" "}
                  <span className="text-green text-sm font-medium tracking-tight">
                    {price} {currencyToken?.symbol}
                  </span>
                </div>
              )
            ) : (
              <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                <span className="text-green text-sm font-medium tracking-tight"># {item.tokenData ? item.tokenData : item.tokenId}</span>
              </div>
            )}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            {!isAuction ? (
              <div className="flex justify-between w-full">
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  {formatDate(valid_from)} - {formatDate(valid_to)}
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-500">Offer # {isToken ? item?.offerId : item?.id }</span>
              </div>
            ) : (
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">

                <span className="dark:text-jacarta-300 text-jacarta-500">
                  Auction Start : <span className="text-green text-sm font-medium">{formatAuctionDate(item.startTime)} </span>
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  Auction End : <span className="text-green text-sm font-medium">{formatAuctionDate(item.endTime)}</span>{" "}
                </span>
                </div>
                <span className="dark:text-jacarta-300 text-jacarta-500">Offer # {item?.nftContract?.adOffers[0]?.id}</span>
              </div>
            )}
            {/* {!isToken ? (
              <span className="dark:text-jacarta-300 text-jacarta-500">
                {formatDate(valid_from)} - {formatDate(valid_to)}
              </span>
            ) : (
              <span className={`${adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-accent" : ""} text-sm font-bold`}>
                {adStatut === 0 ? "❌ Rejected" : adStatut === 1 ? "✅ Accepted" : adStatut === 2 ? "🔍 Pending" : "Ad space available"}
              </span>
            )} */}
          </div>
        </div>
      </article>
    </>
  );
};

export default OfferItem;
