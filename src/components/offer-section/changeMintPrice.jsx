import React, { useEffect, useState } from "react";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import config from "../../config/config";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { toast } from "react-toastify";
import { parseUnits, formatUnits } from "ethers/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { BigNumber } from "ethers";
import { activated_features } from "../../data/activated_features";

const ChangeMintPrice = ({ offer }) => {
  const [amount, setAmount] = useState(undefined);
  const [initialAmount, setInitialAmount] = useState(undefined);
  const [currency, setCurrency] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [formattedAmountBN, setFormattedAmountBN] = useState(undefined);
  const [disableMint, setDisableMint] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [nftContractAddress, setNftContractAddress] = useState(null);
  const [, setTokensContractAddress] = useState(["0x"]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [currencyDecimals, setCurrencyDecimals] = useState(null);
  const [indexSelectedToken, setIndexSelectedToken] = useState(null);
  const [disabledLocked, setDisabledLocked] = useState(false);
  const [initialDisabled, setInitialDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const { contract } = useContract(nftContractAddress);
  const { mutateAsync } = useContractWrite(contract, "setDefaultMintPrice");
  const { mutateAsync: mutateTokenAsync } = useContractWrite(contract, "setMintPrice");

  useEffect(() => {
    if (offer) {
      // fallback to WETH from config if no currency is found
      let currency =
        offer?.nftContract?.prices[0]?.currency ?? config[chainId]?.smartContracts?.WETH?.address;
      if (initialDisabled) {
        setCurrency(config[chainId]?.smartContracts?.WETH?.address);
      } else {
        setCurrency(currency);
      }

      setTokens(offer?.nftContract?.tokens);
      setNftContractAddress(offer?.nftContract?.id);

      let tokensContractAddress = [];
      offer?.nftContract?.tokens?.forEach((token) => {
        tokensContractAddress.push(token?.tokenId);
      });
      setTokensContractAddress(tokensContractAddress);

      if (offer?.nftContract?.prices[0]?.enabled === true) {
        setDisableMint(false);
        setInitialDisabled(false);
        setDisabled(false);
      } else {
        setDisableMint(true);
        setInitialDisabled(true);
        setDisabled(true);
      }

      if (offer?.nftContract?.prices[0]?.amount) {
        setAmount(
          formatUnits(
            BigNumber.from(offer?.nftContract?.prices[0]?.amount),
            offer?.nftContract?.prices[0]?.currencyDecimals
          )
        );
        setInitialAmount(
          formatUnits(
            BigNumber.from(offer?.nftContract?.prices[0]?.amount),
            offer?.nftContract?.prices[0]?.currencyDecimals
          )
        );
      } else {
        setAmount(undefined);
        setInitialAmount(undefined);
      }
    }
  }, [chainId, initialDisabled, offer]);

  useEffect(() => {
    if (currency) {
      const smartContracts = config[chainId]?.smartContracts;
      const currency = Object?.values(smartContracts)?.find(
        (contract) =>
          contract?.address?.toLowerCase() ===
          offer?.nftContract?.tokens[0]?.mint?.currency?.toLowerCase()
      );
      setCurrencySymbol(currency?.symbol ?? offer?.nftContract?.prices[0]?.currencySymbol);
      setCurrencyDecimals(currency?.decimals);
    }
  }, [chainId, currency, offer?.nftContract?.prices, offer?.nftContract?.tokens]);

  const handleAmount = (value) => {
    if (!value) {
      setAmount(undefined);
      return;
    }

    // only allow numbers, commas and dots
    if (!/^[0-9.,]*$/.test(value)) {
      return;
    }

    if (value.includes(",")) {
      value = value.replace(",", ".");
    }

    const smartContracts = config[chainId]?.smartContracts;
    const currency = Object?.values(smartContracts)?.find(
      (contract) =>
        contract?.address?.toLowerCase() ===
        offer?.nftContract?.tokens[0]?.mint?.currency?.toLowerCase()
    );
    const decimals = currency?.decimals;

    const formattedValue = parseUnits(value, decimals);

    setAmount(value);
    setFormattedAmountBN(formattedValue);
  };

  useEffect(() => {
    if (disableMint) {
      setAmount(0);
    } else {
      setAmount(initialAmount);
    }
  }, [disableMint, initialAmount]);

  const handleChangeMintPrice = async () => {
    setDisabledLocked(disableMint);

    let finalFormattedAmountBN = formattedAmountBN;

    if (disableMint) {
      finalFormattedAmountBN = BigNumber.from("0");
    }

    if (!finalFormattedAmountBN) {
      toast("Please enter a valid amount", { type: "error" });
      throw new Error("Please enter a valid amount");
    }

    try {
      await mutateAsync({
        args: [currency, !disableMint, finalFormattedAmountBN]
      });

      setDisabled(disableMint);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleChangeTokenMintPrice = async () => {
    if (selectedToken === null) return;

    setDisabledLocked(disableMint);

    try {
      await mutateTokenAsync({
        args: [selectedToken, currency, !disableMint, formattedAmountBN]
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      {disabled && (
        <p className="text-red text-sm">The minting feature is currently disabled for this offer</p>
      )}

      {!disabled && (
        <p className="text-green text-sm">
          The minting feature is currently enabled for this offer
        </p>
      )}

      <div className="mb-4 flex items-center gap-2">
        <Switch.Root
          checked={disableMint}
          onCheckedChange={setDisableMint}
          id="disable"
          className="w-[42px] h-[25px] rounded-full relative data-[state=checked]:bg-primaryPurple border border-white border-opacity-10 outline-none cursor-default"
        >
          <Switch.Thumb className="block w-[19px] h-[19px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label className="block text-white text-sm font-semibold">Disable mint</label>
      </div>

      {activated_features?.canChangeTokenMintPrice && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Offer tokens</label>
          <span className="text-jacarta-200 text-xs font-semibold">
            When selecting a token, the mint price will be changed for that token however the new
            mint price will be the same for all tokens.
          </span>
          <div className="flex items-center flex-wrap gap-4 mt-4">
            {tokens?.map((token, index) => {
              if (token?.mint !== null) return null;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (disableMint) return;

                    if (indexSelectedToken === index) {
                      setSelectedToken(null);
                    } else {
                      setIndexSelectedToken(index);
                      setSelectedToken(token?.tokenId);
                    }
                  }}
                  className={`flex flex-col cursor-pointer border-2 items-center gap-2 bg-secondaryBlack p-4 rounded-lg ${indexSelectedToken === index ? "border-primaryPurple" : disableMint ? "border-jacarta-100 border-opacity-20" : "border-transparent"}`}
                >
                  <p className="text-white text-sm font-semibold">Token #{token?.tokenId}</p>

                  <p className="text-white text-sm font-semibold">
                    {formatUnits(
                      BigNumber.from(token?.nftContract?.prices[0]?.amount ?? "0"),
                      currencyDecimals
                    )}{" "}
                    {currencySymbol}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Mint price</label>
        <div className="relative max-w-xs w-full flex items-center">
          <input
            type="text"
            className={`bg-secondaryBlack w-full rounded-lg p-2 text-white ${disableMint ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disableMint}
            value={amount ?? ""}
            placeholder={amount ?? "Enter the amount"}
            onChange={(e) => handleAmount(e.target.value)}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-sm font-semibold">
            {currencySymbol ?? "WETH"}
          </div>
        </div>

        {!initialDisabled && (
          <button
            onClick={() => setAmount(initialAmount)}
            className="flex items-center gap-2 mt-2 text-sm cursor-pointer text-primaryPurple hover:text-opacity-80"
          >
            Set to current mint price
          </button>
        )}
      </div>

      {selectedToken !== null ? (
        <Web3Button
          action={() => {
            if (!nftContractAddress) return;

            if (!formattedAmountBN || !currency || !amount) {
              return;
            }

            toast
              .promise(handleChangeTokenMintPrice, {
                pending: "Waiting for confirmation 🕒",
                success: disabledLocked
                  ? "The token mint has been disabled ❌"
                  : "The token mint price has been updated 🎉",
                error: "Transaction rejected 🤯"
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          isDisabled={!amount || !currency || !formattedAmountBN || !nftContractAddress}
          contractAddress={nftContractAddress}
          className={`!mt-4 !hover:bg-opacity-80 !px-4 !flex !py-2 !w-fit !text-white !font-semibold !rounded-full !mb-4 ${
            !amount || !currency || !formattedAmountBN || !nftContractAddress
              ? "!opacity-50 !cursor-not-allowed !bg-jacarta-100"
              : "!bg-primaryPurple"
          }`}
        >
          Change Token Mint Price
        </Web3Button>
      ) : (
        <Web3Button
          action={() => {
            if (!nftContractAddress || !currency) return;

            toast
              .promise(handleChangeMintPrice, {
                pending: "Waiting for confirmation 🕒",
                success: disabledLocked
                  ? "The tokens mint has been disabled ❌"
                  : "The mint price has been updated for this offer 🎉",
                error: "Transaction rejected 🤯"
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          isDisabled={!nftContractAddress || !currency}
          contractAddress={nftContractAddress}
          className={`!hover:bg-opacity-80 !px-4 !w-fit !flex !py-2 !text-white !font-semibold !rounded-full !mb-4 ${
            !currency || !nftContractAddress
              ? "!opacity-50 !cursor-not-allowed !bg-jacarta-100"
              : "!bg-primaryPurple"
          }`}
        >
          Change Mint Price
        </Web3Button>
      )}
    </div>
  );
};

export default ChangeMintPrice;
