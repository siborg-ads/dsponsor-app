import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const ClientsRedirection = () => {
  return (
    <div className="rounded-xl w-full bg-secondaryBlack flex flex-col gap-8 p-8">
      <span className="text-white text-center font-semibold text-2xl">
        Be part of the Web3 Monetization evolution
      </span>

      <div className="grid grid-cols-2 gap-8">
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
  );
};

export default ClientsRedirection;
