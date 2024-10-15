import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { ClipboardIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { getAddress } from "ethers/lib/utils";
import Input from "@/components/ui/Input";
import { useActiveAccount } from "thirdweb/react";

const JoinSiBorgApp = ({ manageAddress }) => {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);

  const wallet = useActiveAccount();
  const address = wallet?.address;

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
          <div className="max-w-2xl mx-auto mb-4 text-center">
            Ad spaces token owners from the{" "}
            <Link href={`/8453/offer/1`} className="text-primaryPurple hover:text-opacity-80">
              SiBorg Ads
            </Link>{" "}
            offer can submit an ad to be displayed on the SiBorg App. Here is your exclusive code to{" "}
            <Link
              href="https://beta.siborg.io"
              target="_blank"
              className="text-primaryPurple hover:text-opacity-80"
            >
              join the beta
            </Link>
            .
          </div>

          <div className="flex items-center justify-center max-w-sm mx-auto mb-4 text-center">
            <div className="relative w-full">
              <Input value={code ?? "Loading..."} readOnly type="text" />
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
        </>
      )}

      {!isUserConnected && (
        <div className="max-w-2xl py-24 mx-auto mb-4 text-center">
          To get your code to join the SiBorg App, you need to connect your wallet.
        </div>
      )}
    </>
  );
};

export default JoinSiBorgApp;
