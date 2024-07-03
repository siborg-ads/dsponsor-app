import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";
import TimerCard from "./TimerCard";
import { shortenAddress, useAddress } from "@thirdweb-dev/react";
import { getAddress, formatUnits } from "ethers/lib/utils";

const OfferItem = ({
  item,
  url = "",
  isToken = false,
  isSelectionActive,
  isOwner,
  isAuction = false,
  isListing = false,
  listingType
}) => {
  const [price, setPrice] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(null);
  const [itemData, setItemData] = useState({});
  const [itemStatut, setItemStatut] = useState(null);
  const [lastSalePrice, setLastSalePrice] = useState(null);
  const [lastBidder, setLastBidder] = useState(null);
  const [isLastBidder, setIsLastBidder] = useState(false);

  const address = useAddress();

  useEffect(() => {
    if (item && item?.marketplaceListings?.length > 0) {
      // we look for the latest completed listing
      const latestListing = item?.marketplaceListings
        .sort((a, b) => b.id - a.id)
        .find((listing) => listing.status === "COMPLETED");

      if (latestListing) {
        // if yes we get the last sale price
        let lastSalePrice;
        if (latestListing?.listingType === "Direct") {
          // direct price
          lastSalePrice = formatUnits(
            BigInt(latestListing?.buyoutPricePerToken),
            Number(latestListing?.currencyDecimals)
          );
        } else if (latestListing?.listingType === "Auction") {
          // auction price
          lastSalePrice = formatUnits(
            BigInt(latestListing?.bids[0]?.paidBidAmount),
            Number(latestListing?.currencyDecimals)
          );
        }

        setLastSalePrice(lastSalePrice);
      }
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const sortedListings = item?.marketplaceListings?.sort((a, b) => b.id - a.id);
    if (!sortedListings) return;

    const lastBidder = sortedListings[0]?.bids[0]?.bidder;

    setLastBidder(lastBidder);
  }, [item]);

  useEffect(() => {
    if (address && lastBidder && getAddress(address) === getAddress(lastBidder)) {
      setIsLastBidder(true);
    }
  }, [address, lastBidder]);

  function formatDate(dateIsoString) {
    if (!dateIsoString) return "date not found";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateIsoString).toLocaleDateString("en-EN", options);
  }

  useEffect(() => {
    if (!item) return;

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
      setPrice(null);
      setCurrencyToken(item.nftContract.prices[0]?.currencySymbol);
      setItemStatut("TOKENMINTED");
      return;
    }
    if (isToken && isAuction && listingType === "Auction") {
      setPrice(
        item?.marketplaceListings?.[0]
          ? item?.marketplaceListings[0]?.bidPriceStructureFormatted?.minimalBidPerToken
          : item?.bidPriceStructureFormatted?.minimalBidPerToken
      );
      setCurrencyToken(
        item?.marketplaceListings?.[0]
          ? item?.marketplaceListings[0]?.currencySymbol
          : item?.currencySymbol
      );

      setItemStatut("AUCTION");
      return;
    }
    if (isToken && item?.marketplaceListings?.length > 0 && listingType === "Direct") {
      setPrice(item?.marketplaceListings[0]?.buyPriceStructureFormatted?.buyoutPricePerToken);
      setCurrencyToken(item?.marketplaceListings[0]?.currencySymbol);
      setItemStatut("DIRECT");
    }
  }, [item, isToken, isListing, isAuction, listingType]);

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
  } = itemData ?? {};

  if (item.tokenData === "Degen" || item.tokenData === "degen") {
    console.log("itemData: ", item);
  }

  return (
    <>
      <Link href={url ?? "#"} className="h-full">
        <article className="relative h-full">
          {item?.isPending && isOwner && (
            <div className="absolute -top-2 -right-2 rounded-2xl bg-red rounded-2xl dark:text-white px-2">
              !
            </div>
          )}

          <div
            style={{
              transitionDuration: "500ms"
            }}
            className="dark:bg-secondaryBlack h-full cursor-pointer dark:hover:bg-opacity-80 box-border hover:border-2 duration-1000 hover:duration-1000 hover:-translate-y-1 dark:hover:border-2 dark:border-jacarta-100 dark:border-opacity-10 border-opacity-10 border-jacarta-900 relative rounded-2xl flex flex-col border bg-white p-4 transition-shadow hover:shadow-lg text-jacarta-100"
          >
            <div className="relative">
              <figure>
                {isSelectionActive ? (
                  image && (
                    <Image
                      src={image ?? "/images/gradient_creative.jpg"}
                      alt="logo"
                      height={230}
                      width={230}
                      className="w-full lg:h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  )
                ) : (
                  <>
                    {image && (
                      <Image
                        src={image ?? "/images/gradient_creative.jpg"}
                        alt="logo"
                        height={230}
                        width={230}
                        className="w-full lg:h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    )}
                  </>
                )}
              </figure>

              <Tippy
                content={item?.chainConfig?.network}
                placement="top"
                style={{
                  transitionDuration: "500ms"
                }}
                className="bg-jacarta-300 text-jacarta-900 box-border hover:border-2 dark:hover:border-2 hover:-m-1 duration-400 dark:hover:bg-jacarta-800 dark:border-jacarta-100 dark:border-opacity-10 border-opacity-10 border border-jacarta-900 hover:bg-jacarta-600 dark:text-jacarta-100 rounded-md p-2"
              >
                <div
                  style={{ background: "rgba(54, 58, 93, 0.7)", backdropFilter: "blur(20px)" }}
                  className={`absolute ${!isToken ? "-bottom-1" : "bottom-8"} -right-2 flex items-center whitespace-nowrap rounded-md py-1 px-2`}
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
                  className="bg-jacarta-300 text-jacarta-900 box-border hover:border-2 dark:hover:border-2 hover:-m-1 duration-400 dark:hover:bg-jacarta-800 dark:border-jacarta-100 dark:border-opacity-10 border-opacity-10 border border-jacarta-900 hover:bg-jacarta-600 dark:text-jacarta-100 rounded-md p-2"
                >
                  <div
                    style={{ background: "rgba(54, 58, 93, 0.7)", backdropFilter: "blur(20px)" }}
                    className="absolute backdrop-blur-1 -bottom-1 -right-2 dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2"
                  >
                    <span className="text-primaryPink text-sm font-medium tracking-tight">
                      # {item.tokenData ? item.tokenData : item.tokenId}
                    </span>
                  </div>
                </Tippy>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <div className="mt-4 flex items-center justify-between gap-2">
                {isSelectionActive ? (
                  <span className="font-display  text-primaryBlack hover:text-primaryPurple text-base dark:text-white ">
                    {name}
                  </span>
                ) : (
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap ">
                    <span className="font-display  text-primaryBlack hover:text-primaryPurple text-base dark:text-white ">
                      {name}
                    </span>
                  </div>
                )}

                {currencyToken &&
                price &&
                item?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
                  ?.status === "CREATED" ? (
                  <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                    <span className="text-green text-sm font-medium tracking-tight">
                      {price} {currencyToken}
                    </span>
                  </div>
                ) : (
                  itemStatut === "AUCTION" && (
                    <span
                      className={`${item.status === "CREATED" ? "text-primaryPurple" : item.status !== "OUTBID" ? "text-green" : "text-red"} text-xs min-w-[100px] text-end font-medium tracking-tight`}
                    >
                      {item.status}
                    </span>
                  )
                )}
              </div>
              <div className="mt-2 text-xs flex items-center justify-between gap-2 ">
                <div>
                  {!isToken ? (
                    <span className="dark:text-jacarta-100 text-jacarta-100">
                      {formatDate(valid_from)} - {formatDate(valid_to)}
                    </span>
                  ) : (!isAuction &&
                      !isListing &&
                      itemStatut !== "TOKENMINTABLE" &&
                      itemStatut !== "DIRECT") ||
                    item?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]
                      ?.status !== "CREATED" ? (
                    <div className="flex  w-full gap-2 items-center ">
                      <span className="text-jacarta-100">Sold</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="h-6 w-6 fill-red"
                      >
                        <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                    </div>
                  ) : (
                    (itemStatut === "AUCTION" ||
                      itemStatut === "DIRECT" ||
                      itemStatut === "TOKENMINTABLE") && (
                      <div className="flex justify-between w-full items-center gap-4">
                        <div className="flex gap-2 items-center justify-center">
                          <span className="dark:text-jacarta-100 text-jacarta-100">
                            {listingType === "Auction"
                              ? "Live Auction"
                              : listingType === "Direct" || itemStatut === "TOKENMINTABLE"
                                ? "Buy Now"
                                : null}{" "}
                          </span>

                          {listingType === "Auction" ? (
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
                      </div>
                    )
                  )}
                </div>
                {/* {!isToken ? (
              <span className="dark:text-jacarta-100 text-jacarta-100">
                {formatDate(valid_from)} - {formatDate(valid_to)}
              </span>
            ) : (
              <span className={`${adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-primaryPurple" : ""} text-sm font-bold`}>
                {adStatut === 0 ? "❌ Rejected" : adStatut === 1 ? "✅ Accepted" : adStatut === 2 ? "🔍 Pending" : "Ad space available"}
              </span>
            )} */}
                {item?.endTime &&
                  new Date(Number(item?.endTime) * 1000).getTime() >= new Date().getTime() && (
                    <div className="dark:border-jacarta-600 flex items-center whitespace-nowrap rounded-md border p-1">
                      <TimerCard endTime={item.endTime} />
                    </div>
                  )}
              </div>
            </div>

            {lastBidder &&
              item?.marketplaceListings?.sort((a, b) => Number(b.id) - Number(a.id))[0]?.status !==
                "COMPLETED" && (
                <div className={`flex items-center gap-1 mt-4 text-sm`}>
                  Last Bidder:{" "}
                  <span className={`${isLastBidder ? "text-primaryPurple" : "text-jacarta-100"}`}>
                    {isLastBidder ? "You" : shortenAddress(lastBidder)}
                  </span>
                </div>
              )}
            {lastSalePrice && (
              <div className="flex items-center mt-4 text-sm text-jacarta-100">
                Last Sale: {lastSalePrice} {currencyToken}
              </div>
            )}
          </div>
        </article>
      </Link>
    </>
  );
};

export default OfferItem;
