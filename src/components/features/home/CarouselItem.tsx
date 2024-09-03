import React from "react";
import Image from "next/image";
import Link from "next/link";

const CarouselItem = ({
  logo,
  description,
  buttonText,
  buttonLink
}: {
  logo: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <div className="rounded-xl w-full bg-secondaryBlack h-full flex flex-col justify-between gap-8 p-6 min-h-64">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:h-full md:grow">
        <div className="relative flex justify-center items-center h-16 md:h-full">
          <Image src={logo} fill={true} className="object-contain" alt="logo" />
        </div>

        <div className="flex flex-col gap-8 justify-between">
          <p className="text-white">{description}</p>
        </div>
      </div>

      <Link href={buttonLink}>
        <button className="bg-primaryPurple hover:bg-opacity-80 text-white rounded-lg py-2 px-4 mt-4">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default CarouselItem;
