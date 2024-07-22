import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getAddress } from "ethers/lib/utils";

const JoinSiBorgApp = ({ manageAddress }) => {
  const [code, setCode] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);

  const address = useAddress();

  useEffect(() => {
    if (!address || !manageAddress) {
      setIsUserConnected(false);
      return;
    }

    if (address === "" || manageAddress === "") {
      setIsUserConnected(false);
      return;
    }

    if (getAddress(address) === getAddress(manageAddress)) {
      setIsUserConnected(true);
    } else {
      setIsUserConnected(false);
    }
  }, [address, manageAddress]);

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

    if (address) {
      fetchCode();
    }
  }, [address]);

  return (
    <>
      {isUserConnected && (
        <>
          <div className="mb-4 max-w-2xl text-center mx-auto">
            Ad spaces token owners will soon be able to submit an ad to be displayed in the SiBorg
            App. Here is your exclusive code to{" "}
            <Link
              href="https://beta.siborg.io"
              target="_blank"
              className="text-primaryPurple hover:text-opacity-80"
            >
              join the beta
            </Link>
            .
          </div>

          <div className="mb-4 max-w-sm text-center flex items-center justify-center mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                value={code ?? "Loading..."}
                className="pr-2 h-full w-full bg-secondaryBlack border hover:border-opacity-20 border-white border-opacity-10 rounded-2lg p-2 focus:border-white focus:border-opacity-20 focus:ring-transparent dark:bg-secondaryBlack dark:text-white"
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
        </>
      )}

      {!isUserConnected && (
        <div className="mb-4 max-w-2xl text-center mx-auto py-24">
          To get your code to join the SiBorg App, you need to connect your wallet.
        </div>
      )}
    </>
  );
};

export default JoinSiBorgApp;
