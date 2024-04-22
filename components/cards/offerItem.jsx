import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useState, useEffect } from "react";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { useCountdown } from "../../utils/countDown";

// Import CSS files
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";

const OfferItem = ({ item, url, isToken }) => {
  const [price, setPrice] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(null);
  const [itemData, setItemData] = useState({});
  const [adStatus, setAdStatus] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const admin = new DSponsorAdmin({
          chain: {
            alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
            chainName: "ethereum-sepolia",
          },
        });

        const currencyToken = admin.chain.getCurrencyByAddress(
          item.currencies[0]
        );
        setCurrencyToken(currencyToken);

        const formattedPrice = item.prices[0] / 10 ** currencyToken.decimals;
        setPrice(formattedPrice);
      } catch (error) {
        console.error("Error: Currency not found for address");
      }

      const data = isToken ? item.offer || {} : item.metadata.offer || {};
      setItemData(data);
    };

    fetchItemData();
  }, [item, isToken]);

  useEffect(() => {
    if (!isToken) return;

    const fetchAdStatus = async () => {
      const admin = new DSponsorAdmin({
        chain: {
          alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          chainName: "ethereum-sepolia",
        },
      });

      const checkAds = async (fetchFunction) => {
        if (!item.offerId) return;
        const ads = await fetchFunction;
        return ads.some((ad) => ad.tokenId === item.tokenId);
      };

      if (await checkAds(admin.getRejectedAds({ offerId: item.offerId }))) {
        setAdStatus(0);
        return;
      }

      if (await checkAds(admin.getValidatedAds({ offerId: item.offerId }))) {
        setAdStatus(1);
        return;
      }

      if (await checkAds(admin.getPendingAds({ offerId: item.offerId }))) {
        setAdStatus(2);
      } else {
        setAdStatus(3);
      }
    };

    fetchAdStatus();
  }, [item, isToken]);

  const {
    name = "offerName",
    image = ["/images/gradient_creative.jpg"],
    valid_from = null,
    valid_to = null,
  } = itemData;

  return (
    <article>
      <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
        <figure>
          <Link href={url}>
            {image?.[0] && (
              <Image
                src={image?.[0]}
                alt=""
                height={230}
                width={230}
                className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
                loading="lazy"
              />
            )}
          </Link>
        </figure>
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={url}
            className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"
          >
            <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white">
              {name}
            </span>
          </Link>
          {!isToken ? (
            <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
              <Tippy
                content={currencyToken?.symbol ? currencyToken?.symbol : "N/A"}
              >
                <Image
                  width={12}
                  height={12}
                  src="/images/eth-icon.svg"
                  alt="icon"
                  className="w-3 h-3 mr-1"
                />
              </Tippy>
              <span className="text-green text-sm font-medium tracking-tight">
                {price} {currencyToken?.symbol ? currencyToken?.symbol : "N/A"}
              </span>
            </div>
          ) : (
            <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
              <span className="text-green text-sm font-medium tracking-tight">
                N° : {item.tokenId}
              </span>
            </div>
          )}
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
      </div>
    </article>
  );
};

export default OfferItem;
