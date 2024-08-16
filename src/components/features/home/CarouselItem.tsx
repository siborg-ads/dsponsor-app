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
    <div className="rounded-xl w-full bg-secondaryBlack flex flex-col justify-between gap-8 p-6 h-64">
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="relative h-full w-full flex justify-center items-center">
          <Image src={logo} fill={true} alt="logo" />
        </div>

        <div className="flex flex-col gap-8 justify-between">
          <p className="text-white">{description}</p>
        </div>
      </div>

      <Link href={buttonLink} target="_blank">
        <button className="bg-primaryBlack hover:bg-opacity-80 text-white rounded-lg py-2 px-4 mt-4">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default CarouselItem;
