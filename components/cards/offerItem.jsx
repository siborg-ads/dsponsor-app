import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useChainContext } from "../../contexts/hooks/useChainContext";

const OfferItem = ({
  item,
  url,
  isToken = false,
  isSelectionActive,
  isOwner,
  isAuction = false,
  isListing = false
}) => {
  const { currentChainObject } = useChainContext();
  const [price, setPrice] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(null);
  const [itemData, setItemData] = useState({});
  const [, setItemStatut] = useState(null);
  const { contract: tokenContract } = useContract(
    (!isToken || (isToken && isListing)) && item?.nftContract?.prices[0]?.currency,
    "token"
  );
  const { data: symbolContract } = useContractRead(tokenContract, "symbol");
  const { data: decimalsContract } = useContractRead(tokenContract, "decimals");
  const { contract: DsponsorAdminContract } = useContract(
    currentChainObject?.smartContracts?.DSPONSORADMIN?.address,
    currentChainObject?.smartContracts?.DSPONSORADMIN?.abi
  );
  const { data: bps } = useContractRead(DsponsorAdminContract, "feeBps");

  function formatDate(dateIsoString) {
    if (!dateIsoString) return "date not found";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateIsoString).toLocaleDateString("en-EN", options);
  }

  const formatAuctionDate = (timestamp) => {
    if (!timestamp) return "";

    // Convertir le timestamp en objet Date
    const date = new Date(timestamp * 1000);

    const dates = date.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",

      hour12: true
    });

    return dates;
  };
  useEffect(() => {
    if (!item) return;
    console.log(item, "item");
    if (!isToken && !isListing && !isAuction) {
      setItemStatut("OFFER");
      setPrice(item.nftContract.prices[0].mintPriceStructureFormatted.totalAmount);
      setCurrencyToken(item.nftContract.prices[0].currencySymbol);
      return;
    }
    if (isToken && item?.marketplaceListings?.length <= 0 && item.mint === null) {
      setItemStatut("TOKENMINTABLE");
      setPrice(item?.nftContract?.prices[0]?.mintPriceStructureFormatted.totalAmount);
      setCurrencyToken(item.nftContract.prices[0].currencySymbol);
      return;
    }
    if (isToken && item?.marketplaceListings?.length <= 0 && item.mint !== null) {
      setPrice(item?.nftContract?.prices[0]?.mintPriceStructureFormatted.totalAmount);
      setCurrencyToken(item.nftContract.prices[0].currencySymbol);
      setItemStatut("TOKENMINTED");
      return;
    }
    if (isToken && item?.marketplaceListings?.length > 0 && isListing === "Auction") {
      setPrice(item?.marketplaceListings[0]?.bidPriceStructureFormatted.newPricePerToken);
      setCurrencyToken(item?.marketplaceListings[0]?.currencySymbol);
      setItemStatut("AUCTION");
      return;
    }
    if (isToken && item?.marketplaceListings?.length > 0 && isListing === "Direct") {
      setPrice(item?.marketplaceListings[0]?.buyPriceStructureFormatted?.buyoutPricePerToken);
      setCurrencyToken(item?.marketplaceListings[0]?.currencySymbol);
      setItemStatut("DIRECT");
      return;
    }
  }, [item, isToken, isListing, isAuction]);

  useEffect(() => {
    if (!item) return;

    let data = null;
    if (isToken) {
      data = item.metadata ? item.metadata : null;
    } else {
      data = item.metadata.offer ? item.metadata.offer : null;
    }
    setItemData(data);
  }, [item, isToken]);

  const {
    name = "offerName",
    image = "/images/gradient_creative.jpg",
    valid_from = null,
    valid_to = null
  } = itemData ? itemData : {};

  return (
    <>
      <article className="relative">
        {item.isPending && isOwner && (
          <div className="absolute -top-2 -right-2 rounded-2xl bg-red rounded-2xl dark:text-white  px-2">
            !
          </div>
        )}

        <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 relative rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          <div className="relative">
            <figure>
              {isSelectionActive ? (
                image && (
                  <Image
                    src={image ? image : "/images/gradient_creative.jpg"}
                    alt="logo"
                    height={230}
                    width={230}
                    className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
                    loading="lazy"
                  />
                )
              ) : (
                <Link href={url}>
                  {image && (
                    <Image
                      src={image ? image : "/images/gradient_creative.jpg"}
                      alt="logo"
                      height={230}
                      width={230}
                      className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
                      loading="lazy"
                    />
                  )}
                </Link>
              )}
            </figure>

            <Tippy
              content={item?.chainConfig?.chainName}
              placement="top"
              className="bg-jacarta-300 text-jacarta-700 dark:bg-jacarta-700 dark:text-jacarta-300 rounded-md p-2"
            >
              <div
                style={{ background: "rgba(54, 58, 93, 0.7)", backdropFilter: "blur(20px)" }}
                className={`absolute ${!isToken ? "-bottom-1" : "bottom-8"} -right-2  dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2`}
              >
                <Image
                  src={item?.chainConfig?.logoURL}
                  width={17}
                  height={17}
                  alt="logo"
                  loading="lazy"
                />
              </div>
            </Tippy>
            {isToken && (
              <Tippy
                content={`token  # ${item.tokenData ? item.tokenData : item.tokenId}`}
                placement="top"
                className="bg-jacarta-300 text-jacarta-700 dark:bg-jacarta-700 dark:text-jacarta-300 rounded-md p-2"
              >
                <div
                  style={{ background: "rgba(54, 58, 93, 0.7)", backdropFilter: "blur(20px)" }}
                  className="absolute backdrop-blur-1 -bottom-1 -right-2 dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2"
                >
                  <span className="text-green text-sm font-medium tracking-tight">
                    # {item.tokenData ? item.tokenData : item.tokenId}
                  </span>
                </div>
              </Tippy>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            {isSelectionActive ? (
              <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">
                {name}
              </span>
            ) : (
              <Link
                href={url}
                className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
              >
                <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">
                  {name}
                </span>
              </Link>
            )}

            {currencyToken && (
              <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                {" "}
                <span className="text-green text-sm font-medium tracking-tight">
                  {price} {currencyToken}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            {!isAuction && !isListing ? (
              <div className="flex justify-between w-full">
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  {formatDate(valid_from)} - {formatDate(valid_to)}
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  Offer # {isToken ? item?.offerId : item?.id}
                </span>
              </div>
            ) : isAuction && isToken && !isListing ? (
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col">
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    Auction Start :{" "}
                    <span className="text-green text-xs font-medium">
                      {formatAuctionDate(item.startTime)}{" "}
                    </span>
                  </span>
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    Auction End :{" "}
                    <span className="text-green text-xs font-medium">
                      {formatAuctionDate(item.endTime)}
                    </span>{" "}
                  </span>
                </div>
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  Offer # {item?.nftContract?.adOffers[0]?.id}
                </span>
              </div>
            ) : (
              isToken &&
              isListing && (
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="dark:text-jacarta-300 text-jacarta-500">
                      {isListing === "Auction" ? "Auction listing" : "Direct listing"}{" "}
                    </span>

                    {isListing === "Auction" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-6 w-6 fill-[#ce44ea]"
                      >
                        <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="h-6 w-6 fill-orange"
                      >
                        <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                      </svg>
                    )}
                  </div>
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    Offer # {item?.nftContract?.adOffers[0]?.id}
                  </span>
                </div>
              )
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
