import React, { useState } from "react";
import { useRouter } from "next/router";
import { collection_item_data } from "../../data/collection_data";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import Collection_items from "../../components/collectrions/Collection_items";
import Image from "next/image";
import Link from "next/link";
import Meta from "../../components/Meta";

const Collection = () => {
  const [likesImage, setLikesImage] = useState(false);
  const router = useRouter();
  const pid = router.query.collection;

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  return (
    <>
      <Meta title={`${pid} || Xhibiter | NFT Marketplace Next.js Template`} />

      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <Image
            src="/images/collections/collection_banner.jpg"
            alt="banner"
            width={1519}
            height={300}
            className="w-full h-full object-center object-cover"
          />
        </div>
        {/* <!-- end banner --> */}

        {/* <!-- Profile --> */}
        {collection_item_data
          .filter((item) => item.id === pid)
          .map((item) => {
            const { id, title, image, icon, creator, text, details } = item;

            return (
              <section
                key={id}
                className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28"
              >
                {/* <!-- Avatar --> */}
                <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
                    <Image
                      width={141}
                      height={141}
                      src={image}
                      alt={title}
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                    />
                    <div
                      className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      {icon && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-[.875rem] w-[.875rem] fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      )}
                    </div>
                  </figure>
                </div>

                <div className="container">
                  <div className="text-center">
                    <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                      {title}
                    </h2>
                    <div className="mb-8">
                      <span className="text-jacarta-400 text-sm font-bold">
                        Created by{" "}
                      </span>
                      <Link
                        href="/user/avatar_6"
                        className="text-accent text-sm font-bold"
                      >
                        {creator}
                      </Link>
                    </div>

                    <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                      {details.map(({ id, detailsNumber, detailsText }) => {
                        return (
                          <Link
                            href="#"
                            key={id}
                            className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32"
                          >
                            <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                              {detailsNumber}
                            </div>
                            <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                              {detailsText}
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">
                      {text}
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                      <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                        {/* <Likes data={} /> */}
                        <div
                          className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                          onClick={() => handleLikes()}
                        >
                          <button>
                            {likesImage ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                              >
                                <path fill="none" d="M0 0H24V24H0z" />
                                <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={24}
                                height={24}
                                className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                              >
                                <path fill="none" d="M0 0H24V24H0z" />
                                <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <Social_dropdown />

                      <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

        {/* <!-- end profile --> */}
      </div>
      <Collection_items />
    </>
  );
};

export default Collection;
