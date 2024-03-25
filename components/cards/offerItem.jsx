import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";

const OfferItem = ({item, url}) => {
   const { id, name, ownerAddress, ownerName, image, maxSupply, externalLink, description, currencyName, numberTokenAllowed, price } = item;
  return (
    <>
      <article>
        <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          <figure>
            <Link href={url}>
              <Image src={image} alt="" height={230} width={230} className="rounded-[0.625rem] w-full lg:h-[230px] object-contain" loading="lazy" />
            </Link>
          </figure>
          <div className="mt-4 flex items-center justify-between">
            <Link href={url}>
              <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">{name}</span>
            </Link>
            <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
              <Tippy content={<span>{currencyName}</span>}>
                <Image width={12} height={12} src="/images/eth-icon.svg" alt="icon" className="w-3 h-3 mr-1" />
              </Tippy>

              <span className="text-green text-sm font-medium tracking-tight">
                {price} {currencyName}
              </span>
            </span>
          </div>
          <div className="mt-2 text-sm">
            <span className="dark:text-jacarta-300 text-jacarta-500">
              {numberTokenAllowed}/{maxSupply}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default OfferItem;
