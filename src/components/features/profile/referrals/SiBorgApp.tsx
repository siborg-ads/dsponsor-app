import Link from "next/link";
import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import "tippy.js/dist/tippy.css";
import Input from "@/components/ui/Input";
import { useActiveAccount } from "thirdweb/react";

const SiBorgApp = () => {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const wallet = useActiveAccount();
  const address = wallet?.address;

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

    if (address) fetchCode();
  }, [address]);

  return (
    <div className="relative flex flex-col gap-4 p-6 rounded-lg bg-secondaryBlack">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold md:text-2xl">
          <span className="text-primaryPurple">Download the SiBorg app</span>
          <span className="text-white"> & manage your ads.</span>
        </div>

        <div className="w-3/4 text-sm text-jacarta-100 md:text-base">
          <span>
            Ad spaces token owners from the{" "}
            <Link href={`/8453/offer/1`} className="text-primaryPurple hover:text-opacity-80">
              SiBorg Ads
            </Link>{" "}
            offer can submit an ad to be displayed on the SiBorg App.
          </span>
          <br />
          <span>
            Here is your exclusive code to{" "}
            <Link
              href="https://beta.siborg.io"
              target="_blank"
              className="underline text-primaryPurple hover:text-opacity-80"
            >
              join the beta
            </Link>
            .
          </span>
        </div>

        <div className="relative w-full md:w-2/5">
          <Input type="text" value={code ?? "Loading..."} readOnly />
          <Tippy content={copied ? "Copied!" : "Copy"} placement="top" trigger="click">
            <button
              onClick={() => {
                navigator.clipboard.writeText(code as string);
                setCopied(true);
              }}
              className="absolute top-0 right-0 h-full px-4 text-white rounded-r-lg hover:text-jacarta-100"
            >
              <ClipboardIcon className="w-5 h-5" />
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default SiBorgApp;
