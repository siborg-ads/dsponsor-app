import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const MarketplaceItemCard = ({
  title,
  price,
  symbol,
  image,
  type,
  offer,
  chainName,
  tokenData,
  assetContract,
  tokenId,
}) => {
  return (
    <div className="">
      <article>
        <div className="shadow-md dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          <Link href={`${chainName}/offer/${offer.id}/${tokenId}?tokenData=${tokenData}`}>
            <figure>
              <Image
                src={image}
                width={0}
                height={0}
                layout="responsive"
                alt={title}
                className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
              />
            </figure>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">
                {title}
              </span>
            </div>
            <div className="mt-2 text-base font-semibold">
              <span className="dark:text-jacarta-300 text-jacarta-500">
                {price} {symbol}
              </span>
            </div>
            <div className="">
              <button
                className="w-full mt-4 py-2 rounded-lg text-white font-medium text-base dark:text-white dark:bg-jacarta-700 bg-jacarta-500"
                style={{
                  background:
                    "linear-gradient(90deg, #7D56C9 0%, #9D66C9 50%, #CE7FCA 100%)",
                }}
              >
                {type === "buy-now" ? `Buy Now` : `Place Bid`}
              </button>
            </div>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default MarketplaceItemCard;
