import Image from "next/image";
import Link from "next/link";

const ListItems = () => {
  const tableData = [
    {
      id: 1,
      avatarSrc: "/images/avatars/avatar_1.jpg",
      name: "NFT Funny Cat",
      ethValue: "0.12",
      ethVolume: "3.265",
      ethChange: "-49.99%",
      views: "10.0K",
      likes: "3.5K",
      isVerified: true,
      isIncrease: true
    },
    {
      id: 2,
      avatarSrc: "/images/avatars/avatar_2.jpg",
      name: "Cryptopank",
      ethValue: "0.017",
      ethVolume: "5.344",
      ethChange: "+531.8%",
      views: "9.8K",
      likes: "868",
      isVerified: false,
      isIncrease: true
    },
    {
      id: 3,
      avatarSrc: "/images/avatars/avatar_3.jpg",
      name: "NFT Funny Cat",
      ethValue: "0.12",
      ethVolume: "3.265",
      ethChange: "-49.99%",
      views: "10.0K",
      likes: "3.5K",
      isVerified: false,
      isIncrease: true
    },
    {
      id: 4,
      avatarSrc: "/images/avatars/avatar_4.jpg",
      name: "Cryptopank",
      ethValue: "0.017",
      ethVolume: "5.344",
      ethChange: "+531.8%",
      views: "9.8K",
      likes: "868",
      isVerified: false,
      isIncrease: true
    },
    {
      id: 5,
      avatarSrc: "/images/avatars/avatar_5.jpg",
      name: "NFT Funny Cat",
      ethValue: "0.12",
      ethVolume: "3.265",
      ethChange: "-49.99%",
      views: "10.0K",
      likes: "3.5K",
      isVerified: false,
      isIncrease: true
    },
    {
      id: 6,
      avatarSrc: "/images/avatars/avatar_6.jpg",
      name: "Cryptopank",
      ethValue: "0.017",
      ethVolume: "5.344",
      ethChange: "+531.8%",
      views: "9.8K",
      likes: "868",
      isVerified: true,
      isIncrease: false
    },
    {
      id: 7,
      avatarSrc: "/images/avatars/avatar_7.jpg",
      name: "Cryptopank",
      ethValue: "0.017",
      ethVolume: "5.344",
      ethChange: "+531.8%",
      views: "9.8K",
      likes: "868",
      isVerified: true,
      isIncrease: false
    }
  ];

  return (
    <>
      {tableData.map((row) => (
        <Link href="/user/avatar_6" key={row.id} className="flex transition-shadow hover:shadow-lg">
          <tr className="flex md:w-2/5 w-1/4 items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            <span className="mr-3 lg:mr-5">{row.id}</span>
            <figure className="relative mr-2 w-8 shrink-0 self-start lg:mr-5 lg:w-12">
              <Image
                width={48}
                height={48}
                src={row.avatarSrc ?? ""}
                alt={`avatar ${row.id}`}
                className="rounded-2lg"
                loading="lazy"
              />
              {row.isVerified && (
                <div
                  className="absolute -right-2 -bottom-1 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
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
            </figure>
            <span className="font-display text-sm font-semibold text-jacarta-900 dark:text-white">
              {row.name}
            </span>
          </tr>
          <tr className="flex justify-end items-center md:w-[12%] w-[15%] whitespace-nowrap border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            <span className="-ml-1" title="ETH">
              <Image
                width={14}
                height={14}
                src="/images/eth.png"
                className="mr-1 h-4 w-4"
                alt="etherium icon"
              />
            </span>
            <span className="text-sm font-medium tracking-tight">{row.ethValue}</span>
          </tr>
          <tr className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            <span className="-ml-1" title="ETH">
              <Image
                width={14}
                height={14}
                src="/images/eth.png"
                className="mr-1 h-4 w-4"
                alt="etherium icon"
              />
            </span>
            <span className="text-sm font-medium tracking-tight">{row.ethVolume}</span>
          </tr>
          <tr className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            <span className={row.isIncrease ? "text-green" : "text-red"}>{row.ethChange}</span>
          </tr>
          <tr className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            {row.views}
          </tr>
          <tr className="flex justify-end md:w-[12%] w-[15%] items-center border-t border-jacarta-100 py-4 px-4 dark:border-jacarta-600">
            {row.likes}
          </tr>
        </Link>
      ))}
    </>
  );
};

export default ListItems;
