import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const argumentsData: { title: string; description: string }[] = [
  {
    title: "Boost Visibility",
    description: "Use tokens to increase your brand’s presence."
  },
  {
    title: "Ad Space as a New Opportunity",
    description: "Convert ad spaces into valuable assets."
  },
  {
    title: "Effortless Ad Submission",
    description: "Easily submit your ad to publishers."
  }
];

const ClientsRedirection = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold text-white ">
        Make Your Marketing Budget Work Smarter
      </span>

      <div className="rounded-xl w-full bg-secondaryBlack flex flex-col gap-8 p-8">
        <span className="text-white text-center font-semibold text-2xl">
          Be part of the Web3 Monetization evolution
        </span>

        <div className="grid md:grid-cols-3 gap-4">
          {argumentsData.map((argument, index) => (
            <div
              className="flex flex-col justify-between gap-4 p-6 bg-primaryBlack rounded-lg relative w-full"
              key={index}
            >
              <div className="gap-4 flex flex-col justify-between h-full">
                <span className="text-white text-lg text-center font-semibold">
                  {argument.title}
                </span>

                <span className="text-jacarta-100 text-center text-sm">{argument.description}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <Link href="/marketplace" className="w-full flex items-center justify-center">
            <button className="bg-primaryPurple hover:bg-opacity-80 text-white rounded-lg w-full px-4 py-2">
              I am looking for visibility
            </button>
          </Link>

          <Link
            target="_blank"
            href="mailto:contact@dsponsor.com"
            className="w-full flex items-center justify-center"
          >
            <button className="bg-primaryPurple hover:bg-opacity-80 text-white rounded-lg w-full px-4 py-2">
              <span className="flex items-center justify-center gap-1">
                I am looking for sponsors <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientsRedirection;
