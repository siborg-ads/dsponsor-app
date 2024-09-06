import React, { useEffect, useState } from "react";
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import config from "@/config/config";
import { toast } from "react-toastify";
import { parseUnits, formatUnits } from "ethers/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { BigNumber } from "ethers";
import { features } from "@/data/features";
import Input from "@/components/ui/Input";
import { Address } from "thirdweb";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import ERC20ABI from "@/abi/ERC20.json";
import { ChainObject } from "@/types/chain";

const isDisabledMessage = (disableMint: boolean) => {
  return disableMint
    ? `The minting feature has been disabled for this offer.`
    : `The minting feature has been enabled for this offer.`;
};

const ChangeMintPrice = ({ offer, chainConfig }: { offer: any; chainConfig: ChainObject }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [initialAmount, setInitialAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<Address | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState<string | null>(null);
  const [formattedAmountBN, setFormattedAmountBN] = useState<BigNumber | undefined>(undefined);
  const [disableMint, setDisableMint] = useState<boolean>(false);
  const [tokens, setTokens] = useState<any>(null);
  const [nftContractAddress, setNftContractAddress] = useState<Address | null>(null);
  const [, setTokensContractAddress] = useState<Address[] | null>(null);
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [currencyDecimals, setCurrencyDecimals] = useState<number | null>(null);
  const [indexSelectedToken, setIndexSelectedToken] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDisabled, setInitialDisabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { contract: currencyContract } = useContract(currency, ERC20ABI);
  const { data: currencyDecimalsData } = useContractRead(currencyContract, "decimals");
  const { data: currencySymbolData } = useContractRead(currencyContract, "symbol");

  useEffect(() => {
    if (currencyDecimalsData) {
      setCurrencyDecimals(currencyDecimalsData);
    }

    if (currencySymbolData) {
      setCurrencySymbol(currencySymbolData);
    }
  }, [currencyDecimalsData, currencySymbolData]);

  const chainId = chainConfig?.chainId;

  const { contract } = useContract(nftContractAddress);
  const { mutateAsync } = useContractWrite(contract, "setDefaultMintPrice");
  const { mutateAsync: mutateTokenAsync } = useContractWrite(contract, "setMintPrice");

  useEffect(() => {
    if (offer) {
      // fallback to WETH from config if no currency is found
      let currency = offer?.nftContract?.prices[0]?.currency;
      if (initialDisabled) {
        setCurrency(chainConfig?.smartContracts?.currencies?.WETH?.address);
      } else {
        setCurrency(currency);
      }

      setTokens(offer?.nftContract?.tokens);
      setNftContractAddress(offer?.nftContract?.id);

      let tokensContractAddress: Address[] = [];
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

      if (offer?.nftContract?.prices[0]?.amount && currencyDecimals) {
        setAmount(
          parseFloat(
            formatUnits(
              BigNumber.from(offer?.nftContract?.prices[0]?.amount),
              currencyDecimals as number
            )
          )
        );
        setInitialAmount(
          parseFloat(
            formatUnits(
              BigNumber.from(offer?.nftContract?.prices[0]?.amount),
              currencyDecimals as number
            )
          )
        );
      } else {
        setAmount(undefined);
        setInitialAmount(undefined);
      }
    }
  }, [chainConfig, currencyDecimals, initialDisabled, offer]);

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

    const formattedValue = parseUnits(
      parseFloat(value.toString()).toFixed(currencyDecimals as number),
      currencyDecimals as number
    );

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

      const relayerURL = chainConfig?.relayerURL;
      if (relayerURL) {
        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({
            tags: [`${chainId}-adOffer-${offer.id}`, `${chainId}-nftContract-${nftContractAddress}`]
          })
        });
      }

      setDisabled(disableMint);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleChangeTokenMintPrice = async () => {
    if (selectedToken === null) return;

    try {
      await mutateTokenAsync({
        args: [selectedToken, currency, !disableMint, formattedAmountBN]
      });
      const relayerURL = config[chainId as number]?.relayerURL;
      if (relayerURL) {
        await fetch(`${relayerURL}/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({
            tags: [`${chainId}-adOffer-${offer.id}`, `${chainId}-nftContract-${nftContractAddress}`]
          })
        });
      }
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
          disabled={isLoading}
          className="w-[42px] h-[25px] rounded-full relative data-[state=checked]:bg-primaryPurple border border-white border-opacity-10 outline-none cursor-default"
        >
          <Switch.Thumb className="block w-[19px] h-[19px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label className="block text-white text-sm font-semibold">Disable mint</label>
      </div>

      {features?.canChangeTokenMintPrice && (
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
                      Number(currencyDecimals)
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
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-gray-700 text-sm font-semibold">Mint price</label>

          <ResponsiveTooltip text="The mint price is the amount of currency required to mint a token, this price will be the same for all tokens in the offer. However, the user will have to pay the protocol fees in addition to this price.">
            <QuestionMarkCircleIcon className="h-4 w-4 text-white" />
          </ResponsiveTooltip>
        </div>

        <div className="relative max-w-xs w-full flex items-center">
          <Input
            type="number"
            className={`w-full rounded-lg p-2 text-white ${disableMint ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disableMint}
            value={amount ?? ""}
            placeholder={amount?.toString() ?? "Enter the amount"}
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
        <StyledWeb3Button
          onClick={async () => {
            if (!nftContractAddress) return;

            if (!formattedAmountBN || !currency || !amount) {
              return;
            }

            await toast
              .promise(handleChangeTokenMintPrice, {
                pending: "Waiting for confirmation 🕒",
                success: disableMint
                  ? isDisabledMessage(disableMint)
                  : "The token mint price has been updated 🎉",
                error: "Transaction rejected 🤯"
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          isDisabled={!amount || !currency || !formattedAmountBN || !nftContractAddress}
          contractAddress={nftContractAddress as Address}
          defaultText="Change Token Mint Price"
        />
      ) : (
        <StyledWeb3Button
          onClick={async () => {
            if (!nftContractAddress || !currency) return;

            setIsLoading(true);
            await toast.promise(handleChangeMintPrice, {
              pending: "Waiting for confirmation 🕒",
              success: disableMint
                ? isDisabledMessage(disableMint)
                : "The mint price has been updated for this offer 🎉",
              error: "Transaction rejected 🤯"
            });
            setIsLoading(false);
          }}
          isDisabled={!nftContractAddress || !currency}
          contractAddress={nftContractAddress as Address}
          defaultText="Change Mint Price"
        />
      )}
    </div>
  );
};

export default ChangeMintPrice;
