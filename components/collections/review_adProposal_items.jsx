import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Review_adProposal_data from "../../data/review_adProposal_data";
import Image from "next/image";

const Review_adProposal_items = ({ itemFor }) => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setItemData(Review_adProposal_data);
  }, []);

  return (
    <>
      {itemData.map((item) => {
        const {
          id,
          bigImage,
          subImage1,
          subImage2,
          subImage3,
          userImage,
          title,
          itemsCount,
          userName
        } = item;
        return (
          <article key={id}>
            <div className="dark:bg-secondaryBlack rounded-2xl bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <Link href="/collection/avatar_1" className="flex space-x-[0.625rem]">
                <span className="w-[74.5%]">
                  <Image
                    width={152}
                    height={242}
                    src={bigImage}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                </span>
                <span className="flex w-1/3 flex-col space-y-[0.625rem]">
                  <Image
                    width={68}
                    height={74}
                    src={subImage1}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                  <Image
                    width={68}
                    height={74}
                    src={subImage2}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                  <Image
                    width={68}
                    height={74}
                    src={subImage3}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                </span>
              </Link>

              <Link
                href="/collection/avatar_1"
                className="font-display hover:text-primaryPurple dark:hover:text-primaryPurple text-jacarta-900 mt-4 block text-base dark:text-white"
              >
                {title}
              </Link>

              <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                  <Link href="/user/avatar_6" className="mr-2 shrink-0">
                    <Image
                      width={20}
                      height={20}
                      src={userImage}
                      alt="owner"
                      className="h-5 w-5 rounded-full"
                    />
                  </Link>
                  <span className="dark:text-jacarta-100 mr-1">by</span>
                  <Link href="/user/avatar_6" className="text-primaryPurple">
                    <span>{userName}</span>
                  </Link>
                </div>
                <span className="dark:text-jacarta-100 text-sm">{itemsCount} Items</span>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default Review_adProposal_items;
