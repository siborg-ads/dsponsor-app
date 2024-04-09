import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

import PlaceholderImage from "../../../public/images/placeholder-square.jpg";

const MarketplaceItemCard = () => {
  return (
    <div className="">
      <article>
        <div className="shadow-md dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          <figure>
            <Link href={`url`}>
              <Image
                src={PlaceholderImage}
                width={0}
                height={0}
                alt=""
                className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
              />
            </Link>
          </figure>
          <div className="mt-4 flex items-center justify-between">
            <Link
              href={`url`}
              className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"
            >
              <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">
                #Bitcoin
              </span>
            </Link>
          </div>
          <div className="mt-2 text-sm">
            <span className="dark:text-jacarta-300 text-jacarta-500">
              1 ETH
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
              Buy Now
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MarketplaceItemCard;
