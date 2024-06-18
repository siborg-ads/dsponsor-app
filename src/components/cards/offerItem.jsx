import Tippy from "@tippyjs/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";
import  ModalHelper  from "../Helper/modalHelper";

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
      setCurrencyToken(item.nftContract.prices[0].currencySymbol);
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
  const listingActive = {
    title: "Active",
    body: "Auction still running, you can place a bid.",
    size: "small"
  };
  const listingFinished = {
    title: "Finished",
    body: "The auction has ended, you can complete the auction in the token page.",
    size: "small"
  };
  const listingCancelled = {
    title: "Cancelled",
    body: "The auction has been cancelled.",
    size: "small"
  };

  const handleListingsStatusHelperModal = (status) => {
    switch (status) {
      case "Active":
        return { ...listingActive };
      case "Finished":
        return { ...listingFinished };
      case "Cancelled":
        return { ...listingCancelled};
      default:
        return { ...listingActive };
    }
  };

  return (
    <>
      <article className="relative">
        {item?.isPending && isOwner && (
          <div className="absolute -top-2 -right-2 rounded-2xl bg-red rounded-2xl dark:text-white  px-2">
            !
          </div>
        )}

        <div
          style={{
            transitionDuration: "500ms"
          }}
          className="dark:bg-secondaryBlack cursor-pointer dark:hover:bg-opacity-80 box-border hover:border-2 hover:-m-1 duration-1000 hover:duration-1000 hover:-translate-y-1 dark:hover:border-2 dark:border-jacarta-100 dark:border-opacity-10 border-opacity-10 border-jacarta-900 relative rounded-2xl block border bg-white p-4 transition-shadow hover:shadow-lg text-jacarta-100"
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
                <Link href={url ?? ""}>
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
                </Link>
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
          <div className="mt-4 flex items-center justify-between gap-2">
            {isSelectionActive ? (
              <span className="font-display max-w-[150px] text-primaryBlack hover:text-primaryPurple text-base dark:text-white ">
                {name}
              </span>
            ) : (
              <Link
                href={url ?? "#"}
                className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]"
              >
                <span className="font-display max-w-[150px] text-primaryBlack hover:text-primaryPurple text-base dark:text-white ">
                  {name}
                </span>
              </Link>
            )}

            {currencyToken && price ? (
              <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                {" "}
                <span className="text-green text-sm font-medium tracking-tight">
                  {price} {currencyToken}
                </span>
              </div>
            ) : (
              itemStatut === "AUCTION" && (
                <span
                  className={`${item.status === "CREATED" ? "text-primaryPurple" : item.statut === "COMPLETED" ? "text-green" : "text-red"} text-sm font-medium tracking-tight`}
                >
                  {item.status}
                </span>
              )
            )}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between">
            {!isAuction && !isListing ? (
              <div className="flex justify-between w-full gap-4">
                <span className="text-jacarta-100">
                  {formatDate(valid_from)} - {formatDate(valid_to)}
                </span>
              </div>
            ) : (
              (itemStatut === "AUCTION" || itemStatut === "DIRECT") && (
                <div className="flex justify-between w-full items-center gap-4">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="dark:text-jacarta-100 text-jacarta-100">
                      {listingType === "Auction"
                        ? "Live Auction"
                        : listingType === "Direct"
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
            {/* {!isToken ? (
              <span className="dark:text-jacarta-100 text-jacarta-100">
                {formatDate(valid_from)} - {formatDate(valid_to)}
              </span>
            ) : (
              <span className={`${adStatut === 0 ? "text-red" : adStatut === 1 ? "text-green" : adStatut === 2 ? "text-primaryPurple" : ""} text-sm font-bold`}>
                {adStatut === 0 ? "❌ Rejected" : adStatut === 1 ? "✅ Accepted" : adStatut === 2 ? "🔍 Pending" : "Ad space available"}
              </span>
            )} */}
            {isAuction && listingType === "Auction" && (
              <div className="flex gap-1">

                <span className="dark:text-jacarta-100 text-jacarta-100">{item.listingStatus}</span>
                <ModalHelper dark={false} {...handleListingsStatusHelperModal(item.listingStatus)} />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default OfferItem;
