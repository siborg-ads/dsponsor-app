import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);
  const router = useRouter();
  const pid = router.query.collection;

  useEffect(() => {
    if (pid) {
      const fetchAdsOffers = async () => {
        setData(result);
      };

      fetchAdsOffers();
    }
  }, [pid]);

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  if (!data || data.length === 0) {
    return <div>Chargement...</div>;
  }
  const { currencyName, description, externalLink, id, image, maxSupply, name, numberTokenAllowed, ownerAddress, ownerName, price, royalties } = data[0];
  return (
    <>
      <Meta title={`${pid} || DSponsor | smarter monetization for your content`} />

      <div className="pt-[5.5rem] lg:pt-32">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <Image src="/images/collections/collection_banner.jpg" alt="banner" width={1519} height={300} className="w-full h-full object-center object-cover" />
        </div>
        {/* <!-- end banner --> */}

        {/* <!-- Profile --> */}
        <section key={id} className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <figure className="relative h-36 w-36 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <Image width={141} height={141} src={image} alt="image" className="h-full object-cover" />
              <div className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                </svg>
              </div>
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">{name}</h2>
              <div className="mb-8">
                <span className="text-jacarta-400 text-sm font-bold">Created by </span>
                <Link href="/user/avatar_6" className="text-accent text-sm font-bold">
                  {ownerAddress}
                </Link>
              </div>

              <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                <Link href="#" key={id} className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">{maxSupply}</div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">Max Supply</div>
                </Link>
                <Link href="#" key={id} className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">{price}</div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">{currencyName}</div>
                </Link>
              </div>

              <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">{description}</p>
            </div>
          </div>
        </section>

        {/* <!-- end profile --> */}
      </div>
      <Collection_items />
    </>
  );
};

export default Collection;
