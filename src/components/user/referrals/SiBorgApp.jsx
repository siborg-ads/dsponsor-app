import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import "tippy.js/dist/tippy.css";

const SiBorgApp = () => {
  const [code, setCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const address = useAddress();

  useEffect(() => {
    if (!address) return;

    const fetchCode = async () => {
      await fetch(`https://api.siborg.io/users/code?ethAddr=${address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setCode(data.code);
        })
        .catch((error) => {
          console.error("Error getting SiBorg code:", error);
        });
    };

    fetchCode();
  }, [address]);

  return (
    <div className="bg-secondaryBlack p-6 rounded-lg relative flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-xl md:text-2xl">
          <span className="text-primaryPurple">Download the SiBorg app</span>
          <span className="text-white"> & manage your ads.</span>
        </div>

        <div className="text-jacarta-100 text-sm md:text-base w-3/4">
          <span>
            Ad spaces token owners will soon be able to submit an ad to be displayed on the SiBorg
            App.
          </span>
          <br />
          <span>
            Here is your exclusive code to{" "}
            <Link
              href="https://beta.siborg.io"
              target="_blank"
              className="text-primaryPurple hover:text-opacity-80 underline"
            >
              join the beta
            </Link>
            .
          </span>
        </div>

        <div className="relative md:w-2/5 w-full">
          <input
            type="text"
            value={code ?? "Loading..."}
            className="pr-12 h-full w-full bg-primaryBlack border hover:border-opacity-20 border-white border-opacity-10 rounded-2lg p-2 focus:border-white focus:border-opacity-20 focus:ring-transparent dark:bg-primaryBlack dark:text-white"
            readOnly
          />
          <Tippy content={copied ? "Copied!" : "Copy"} placement="top" trigger="click">
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopied(true);
              }}
              className="absolute right-0 top-0 h-full px-4 text-white hover:text-jacarta-100 rounded-r-lg"
            >
              <ClipboardIcon className="h-5 w-5" />
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default SiBorgApp;
