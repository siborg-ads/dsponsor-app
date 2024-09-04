import React, { SetStateAction, useEffect, useState } from "react";
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import config from "@/config/config";
import { useChainContext } from "@/hooks/useChainContext";
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
import { isAddress } from "ethers/lib/utils";

const isDisabledMessage = (disableMint: boolean) => {
  return disableMint
    ? `The minting feature has been disabled for this offer.`
    : `The minting feature has been enabled for this offer.`;
};

const Payments = ({ offer }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [royaltiesAmount, setRoyaltiesAmount] = useState<number | undefined>(undefined);
  const [initialAmount, setInitialAmount] = useState<number | undefined>(undefined);
  const [initialRoyaltiesAmount, setInitialRoyaltiesAmount] = useState<number | undefined>(
    undefined
  );
  const [isValidRoyalties, setIsValidRoyalties] = useState(true);
  const [isValidReceiver, setIsValidReceiver] = useState(true);
  const [receiver, setReceiver] = useState<Address | null>(null);
  const [initialReceiver, setInitialReceiver] = useState<Address | null>(null);
  const [currentOwner, setCurrentOwner] = useState<Address | null>(null);
  const [initialOwner, setInitialOwner] = useState<Address | null>(null);
  const [isValidOwner, setIsValidOwner] = useState(true);
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

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const { contract } = useContract(nftContractAddress);
  const { mutateAsync: mutateDefaultMintPrice } = useContractWrite(contract, "setDefaultMintPrice");
  const { mutateAsync: mutateTokenAsync } = useContractWrite(contract, "setMintPrice");
  const { mutateAsync: mutateRoyalties } = useContractWrite(contract, "setRoyalty");
  const { mutateAsync: mutateOwner } = useContractWrite(contract, "transferOwnership");

  const { data: owner } = useContractRead(contract, "owner");

  useEffect(() => {
    if (offer) {
      // fallback to WETH from config if no currency is found
      let currency = offer?.nftContract?.prices[0]?.currency;
      if (initialDisabled) {
        setCurrency(config[chainId as number]?.smartContracts?.currencies?.WETH?.address);
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

        const royalties = offer?.nftContract?.royalty?.bps / 100;
        setRoyaltiesAmount(royalties);
        setInitialRoyaltiesAmount(royalties);

        setReceiver(offer?.nftContract?.royalty.receiver);
        setInitialReceiver(offer?.nftContract?.royalty?.receiver);
      } else {
        setAmount(undefined);
        setInitialAmount(undefined);
      }
    }
  }, [chainId, currencyDecimals, initialDisabled, offer]);

  useEffect(() => {
    if (owner) {
      setCurrentOwner(owner);
      setInitialOwner(owner);
    }
  }, [owner]);

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

  const handleRoyaltiesAmount = (value) => {
    if (!value) {
      setRoyaltiesAmount(undefined);
      setIsValidRoyalties(false);
      return;
    }

    if (value.includes(",")) {
      value = value.replace(",", ".");
    }

    setRoyaltiesAmount(value);

    // only allow numbers, commas and dots
    if (!/^[0-9.,]*$/.test(value)) {
      setIsValidRoyalties(false);
    } else if (parseFloat(value) > 100) {
      setIsValidRoyalties(false);
    } else if (value.includes(".") && value.split(".")[1].length > 2) {
      setIsValidRoyalties(false);
    } else {
      setIsValidRoyalties(true);
    }
  };

  const handleAddress = (
    value: string,
    setValue: (value: SetStateAction<`0x${string}` | null | string>) => void,
    setIsValidValue: (value: boolean) => void
  ) => {
    if (!value) {
      setValue(null);
      setIsValidValue(false);
      return;
    }

    setValue(value);
    setIsValidValue(isAddress(value));
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
      await mutateDefaultMintPrice({
        args: [currency, !disableMint, finalFormattedAmountBN]
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

      setDisabled(disableMint);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleChangeRoyaltiesPercentage = async () => {
    if (!royaltiesAmount) {
      toast("Please enter a valid royalties percentage", { type: "error" });
      throw new Error("Please enter a valid royalties percentage");
    }
    let finalFormattedAmount = royaltiesAmount * 100;

    if (disableMint) {
      finalFormattedAmount = 0;
    }

    try {
      await mutateRoyalties({
        args: [receiver, finalFormattedAmount]
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

      setDisabled(disableMint);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleTransferOwner = async () => {
    if (!isValidOwner) {
      toast("Please enter a valid owner address", { type: "error" });
      throw new Error("Please enter a valid owner address");
    }

    try {
      await mutateOwner({
        args: [currentOwner]
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
    <div className="flex flex-col justify-center gap-4">
      <div className="p-4 rounded-md bg-secondaryBlack">
        <span className="dark:text-jacarta-100 text-jacarta-100">
          Offer contract owner has the exclusive right to set up mint price and royaties settings.
          Mint funds are sent to offer contract owner
        </span>
      </div>
      {disabled && (
        <p className="text-sm text-red">The minting feature is currently disabled for this offer</p>
      )}
      {!disabled && (
        <p className="text-sm text-green">
          The minting feature is currently enabled for this offer
        </p>
      )}
      <div className="flex items-center gap-2 mb-4">
        <Switch.Root
          checked={disableMint}
          onCheckedChange={setDisableMint}
          id="disable"
          disabled={isLoading}
          className="w-[42px] h-[25px] rounded-full relative data-[state=checked]:bg-primaryPurple border border-white border-opacity-10 outline-none cursor-default"
        >
          <Switch.Thumb className="block w-[19px] h-[19px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label className="block text-sm font-semibold text-white">Disable mint</label>
      </div>
      {features?.canChangeTokenMintPrice && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Offer tokens</label>
          <span className="text-xs font-semibold text-jacarta-200">
            When selecting a token, the mint price will be changed for that token however the new
            mint price will be the same for all tokens.
          </span>
          <div className="flex flex-wrap items-center gap-4 mt-4">
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
                  <p className="text-sm font-semibold text-white">Token #{token?.tokenId}</p>

                  <p className="text-sm font-semibold text-white">
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
          <label className="block text-sm font-semibold text-gray-700">Mint price</label>

          <ResponsiveTooltip text="The mint price is the amount of currency required to mint a token, this price will be the same for all tokens in the offer. However, the user will have to pay the protocol fees in addition to this price.">
            <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
          </ResponsiveTooltip>
        </div>

        <div className="relative flex items-center w-full max-w-xs">
          <Input
            type="number"
            className={`w-full rounded-lg p-2 text-white ${disableMint ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disableMint}
            value={amount ?? ""}
            placeholder={amount?.toString() ?? "Enter the amount"}
            onChange={(e) => handleAmount(e.target.value)}
          />
          <div className="absolute text-sm font-semibold text-white transform -translate-y-1/2 right-2 top-1/2">
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
      <div className="flex flex-col gap-6 my-6">
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Royalties percentage
          </label>
          <div className="relative flex items-center w-full max-w-xs">
            <Input
              type="number"
              className={`w-full rounded-lg p-2 text-white ${disableMint ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={disableMint}
              value={royaltiesAmount}
              placeholder={royaltiesAmount?.toString() ?? "Enter the amount"}
              onChange={(e) => handleRoyaltiesAmount(e.target.value)}
            />
            <div className="absolute text-sm font-semibold text-white transform -translate-y-1/2 right-2 top-1/2">
              %
            </div>
          </div>

          {!initialDisabled && (
            <button
              onClick={() => {
                setRoyaltiesAmount(initialRoyaltiesAmount);
                setIsValidRoyalties(true);
              }}
              className="flex items-center gap-2 mt-2 text-sm cursor-pointer text-primaryPurple hover:text-opacity-80"
            >
              Set to current royalties amount
            </button>
          )}
          {!isValidRoyalties && royaltiesAmount !== null && (
            <p className="flex items-center gap-2 mt-2 text-sm text-red">
              Please enter a valid royalties percentage with maximum 2 decimals
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Royalties receiver
          </label>
          <div className="relative flex items-center w-full max-w-md">
            <Input
              className={`w-full rounded-lg p-2 text-white ${disableMint ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={disableMint}
              value={receiver}
              placeholder={receiver ?? "Enter the receiver address"}
              onChange={(e) => handleAddress(e.target.value, setReceiver, setIsValidReceiver)}
            />
          </div>

          {!initialDisabled && (
            <button
              onClick={() => {
                setReceiver(initialReceiver);
                setIsValidReceiver(true);
              }}
              className="flex items-center gap-2 mt-2 text-sm cursor-pointer text-primaryPurple hover:text-opacity-80"
            >
              Set to current royalties receiver
            </button>
          )}
          {!isValidReceiver && receiver !== null && (
            <p className="flex items-center gap-2 mt-2 text-sm text-red">
              Please enter a valid address
            </p>
          )}
        </div>
        <StyledWeb3Button
          onClick={async () => {
            if (!nftContractAddress || !isValidRoyalties || !isValidReceiver) return;

            setIsLoading(true);
            await toast.promise(handleChangeRoyaltiesPercentage, {
              pending: "Waiting for confirmation 🕒",
              success: "The royalies settings has been updated for this offer 🎉",
              error: "Transaction rejected 🤯"
            });
            setIsLoading(false);
          }}
          isDisabled={!nftContractAddress || !isValidRoyalties || !isValidReceiver}
          contractAddress={nftContractAddress as Address}
          defaultText="Change Royalties Settings"
        />
      </div>

      <div className="my-4">
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-semibold text-gray-700">Owner</label>

          <ResponsiveTooltip text="The mint price is the amount of currency required to mint a token, this price will be the same for all tokens in the offer. However, the user will have to pay the protocol fees in addition to this price.">
            <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
          </ResponsiveTooltip>
        </div>

        <div className="relative flex items-center w-full max-w-md">
          <Input
            className={`w-full rounded-lg p-2 text-white`}
            value={currentOwner ?? ""}
            placeholder={currentOwner ?? "Enter the owner address"}
            onChange={(e) => handleAddress(e.target.value, setCurrentOwner, setIsValidOwner)}
          />
        </div>

        <button
          onClick={() => setCurrentOwner(initialOwner)}
          className="flex items-center gap-2 mt-2 text-sm cursor-pointer text-primaryPurple hover:text-opacity-80"
        >
          Set to current owner
        </button>
        {!isValidOwner && owner !== null && (
          <p className="flex items-center gap-2 mt-2 text-sm text-red">
            Please enter a valid address
          </p>
        )}
      </div>
      <StyledWeb3Button
        onClick={async () => {
          if (!nftContractAddress) return;

          if (!currentOwner) {
            return;
          }

          /* TODO: Add modal to ensure the user understands the consequences of this action
          when transfering if the new owner is not an admin, set the new owner as an admin*/

          await toast
            .promise(handleTransferOwner, {
              pending: "Waiting for confirmation 🕒",
              success: "The owner of the token has been transfered 🎉",
              error: "Transaction rejected 🤯"
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        isDisabled={!isValidOwner || !nftContractAddress}
        contractAddress={nftContractAddress as Address}
        defaultText="Transfer Ownership"
      />
    </div>
  );
};

export default Payments;
