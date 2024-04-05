import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";

import { useEffect, useState } from "react";
import { useCountdown } from "../../utils/countDown";

const OfferItem = ({ item, url }) => {
  function formatDate(dateIsoString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateIsoString).toLocaleDateString("en-EN", options);
  }

  const { name, image, currencyName, price, validFromDate, validToDate } =
    item.metadata;
  const { days, hours, minutes, seconds } = useCountdown(validToDate);

  return (
    <>
      <article>
        <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
          {/* <figure>
            <Link href={url}>{image[0] && <Image src={image[0]} alt="" height={230} width={230} className="rounded-[0.625rem] w-full lg:h-[230px] object-contain" loading="lazy" />}</Link>
          </figure> */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              href={url}
              className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]"
            >
              <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">
                {name}
              </span>
            </Link>
            <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
              <Tippy content={<span>{currencyName}</span>}>
                <Image
                  width={12}
                  height={12}
                  src="/images/eth-icon.svg"
                  alt="icon"
                  className="w-3 h-3 mr-1"
                />
              </Tippy>

              <span className="text-green text-sm font-medium tracking-tight">
                {price} {currencyName}
              </span>
            </span>
          </div>
          <div className="mt-2 text-xs">
            <span className="dark:text-jacarta-300 text-jacarta-500">
              {formatDate(validFromDate)} - {formatDate(validToDate)}
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default OfferItem;
