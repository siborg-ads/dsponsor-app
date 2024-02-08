import Image from "next/image";
import Link from "next/link";

const GridItems = () => {
  const items = [
    {
      id: 1,
      imageSrc: "/images/collections/collection_square_1.jpg",
      alt: "item 1",
      title: "Art Me Outside",
      price: "1.55 ETH",
      lastSale: "1.3 ETH",
      verified: true,
    },
    {
      id: 2,
      imageSrc: "/images/collections/collection_square_2.jpg",
      alt: "item 2",
      title: "PankySkal",
      price: "2.3 ETH",
      lastSale: "0.5 ETH",
      verified: true,
    },
    {
      id: 3,
      imageSrc: "/images/collections/collection_square_3.jpg",
      alt: "item 3",
      title: "VR Space_287",
      price: "5.6 ETH",
      lastSale: "3.4 ETH",
      verified: false,
    },
    {
      id: 4,
      imageSrc: "/images/collections/collection_square_4.jpg",
      alt: "item 4",
      title: "Metasmorf",
      price: "1.4 ETH",
      lastSale: "0.7 ETH",
      verified: false,
    },
    {
      id: 5,
      imageSrc: "/images/collections/collection_square_5.jpg",
      alt: "item 1",
      title: "Art Me Outside",
      price: "1.55 ETH",
      lastSale: "1.3 ETH",
      verified: false,
    },
    {
      id: 6,
      imageSrc: "/images/collections/collection_square_6.jpg",
      alt: "item 2",
      title: "PankySkal",
      price: "2.3 ETH",
      lastSale: "0.5 ETH",
      verified: true,
    },
    {
      id: 7,
      imageSrc: "/images/collections/collection_square_7.jpg",
      alt: "item 3",
      title: "VR Space_287",
      price: "5.6 ETH",
      lastSale: "3.4 ETH",
      verified: true,
    },
    {
      id: 8,
      imageSrc: "/images/collections/collection_square_8.jpg",
      alt: "item 4",
      title: "Metasmorf",
      price: "1.4 ETH",
      lastSale: "0.7 ETH",
      verified: true,
    },
    {
      id: 9,
      imageSrc: "/images/collections/collection_square_9.jpg",
      alt: "item 1",
      title: "Art Me Outside",
      price: "1.55 ETH",
      lastSale: "1.3 ETH",
      verified: false,
    },
    {
      id: 10,
      imageSrc: "/images/collections/collection_square_10.jpg",
      alt: "item 2",
      title: "PankySkal",
      price: "2.3 ETH",
      lastSale: "0.5 ETH",
      verified: false,
    },
    {
      id: 11,
      imageSrc: "/images/collections/collection_square_11.jpg",
      alt: "item 3",
      title: "VR Space_287",
      price: "5.6 ETH",
      lastSale: "3.4 ETH",
      verified: true,
    },
    {
      id: 12,
      imageSrc: "/images/collections/collection_square_12.jpg",
      alt: "item 4",
      title: "Metasmorf",
      price: "1.4 ETH",
      lastSale: "0.7 ETH",
      verified: false,
    },
  ];

  return (
    <>
      {items.map((item) => (
        <article key={item.id}>
          <div className="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
            <Link href="/collection/avatar_1">
              <Image
                width={270}
                height={270}
                src={item.imageSrc}
                alt={item.alt}
                className="w-full h-full object-cover rounded-[0.625rem]"
                loading="lazy"
              />
            </Link>

            <Link
              href="/collection/avatar_1"
              className="mt-5 mb-2 flex items-center font-display text-base text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
            >
              {item.title}
              {item.verified && (
                <div
                  className="flex h-[1.125rem] w-[1.125rem] ml-1 mb-px items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                  title="Verified Collection"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="h-[.875rem] w-[.875rem] fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                  </svg>
                </div>
              )}
            </Link>

            <div className="font-medium text-2xs text-jacarta-700 dark:text-white mb-2">
              {item.price}
            </div>
            <div className="font-medium text-2xs text-jacarta-500 dark:text-jacarta-300">
              Last Sale:{" "}
              <span className="text-jacarta-700 dark:text-white">
                {item.lastSale}
              </span>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default GridItems;
