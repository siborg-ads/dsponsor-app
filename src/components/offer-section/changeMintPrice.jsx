import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import config from "../../config/config";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { toast } from "react-toastify";
import { parseUnits, formatUnits } from "ethers/lib/utils";
import * as Switch from "@radix-ui/react-switch";
import { BigNumber } from "ethers";

const ChangeMintPrice = ({ offer }) => {
  const [amount, setAmount] = useState(undefined);
  const [currency, setCurrency] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState(null);
  const [formattedAmountBN, setFormattedAmountBN] = useState(undefined);
  const [disableMint, setDisableMint] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [nftContractAddress, setNftContractAddress] = useState(null);
  const [tokensContractAddress, setTokensContractAddress] = useState(["0x"]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [currencyDecimals, setCurrencyDecimals] = useState(null);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const { contract } = useContract(nftContractAddress);
  const { mutateAsync } = useContractWrite(contract, "setDefaultMintPrice");
  const { mutateAsync: mutateTokenAsync } = useContractWrite(contract, "setMintPrice");

  useEffect(() => {
    if (offer) {
      setCurrency(offer?.nftContract?.tokens[0]?.mint?.currency);
      setTokens(offer?.nftContract?.tokens);
      setNftContractAddress(offer?.nftContract?.id);

      let tokensContractAddress = [];
      offer?.nftContract?.tokens?.forEach((token) => {
        tokensContractAddress.push(token?.tokenId);
      });
      setTokensContractAddress(tokensContractAddress);
    }
  }, [offer]);

  useEffect(() => {
    if (currency) {
      const smartContracts = config[chainId]?.smartContracts;
      const currency = Object?.values(smartContracts)?.find(
        (contract) =>
          contract?.address?.toLowerCase() ===
          offer?.nftContract?.tokens[0]?.mint?.currency?.toLowerCase()
      );
      setCurrencySymbol(currency?.symbol);
      setCurrencyDecimals(currency?.decimals);
    }
  }, [chainId, currency, offer?.nftContract?.tokens]);

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

  const handleChangeMintPrice = async () => {
    try {
      await mutateAsync({
        args: [currency, !disableMint, formattedAmountBN]
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const handleChangeTokenMintPrice = async () => {
    if (selectedToken === null) return;

    try {
      await mutateTokenAsync({
        args: [tokensContractAddress[selectedToken], currency, !disableMint, formattedAmountBN]
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <div className="container">
      <Divider className="my-4" />
      <h2 className="text-jacarta-900 font-semibold font-display mb-6 text-center text-3xl dark:text-white ">
        Change Mint Price
      </h2>
      <div className="flex flex-col gap-4 justify-center">
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
                    if (selectedToken === index) {
                      setSelectedToken(null);
                    } else {
                      setSelectedToken(index);
                    }
                  }}
                  className={`flex flex-col cursor-pointer border-2 items-center gap-2 bg-secondaryBlack p-4 rounded-lg ${selectedToken === index ? "border-primaryPurple" : "border-transparent"}`}
                >
                  <p className="text-white text-sm font-semibold">Token #{token?.tokenId}</p>

                  <p className="text-white text-sm font-semibold">
                    {formatUnits(BigNumber.from(token?.mint?.amount ?? "0"), currencyDecimals)}{" "}
                    {currencySymbol}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Mint price {currencySymbol && `(${currencySymbol})`}
          </label>
          <input
            type="text"
            className="bg-secondaryBlack rounded-lg p-2 text-white"
            value={amount ?? ""}
            placeholder={amount ?? "Enter the amount"}
            onChange={(e) => handleAmount(e.target.value)}
          />
        </div>

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

        {selectedToken !== null ? (
          <Web3Button
            action={() => {
              toast
                .promise(handleChangeTokenMintPrice, {
                  pending: "Waiting for confirmation 🕒",
                  success: "Transaction confirmed 👌",
                  error: "Transaction rejected 🤯"
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            contractAddress={nftContractAddress}
            className="!mt-4 !bg-primaryPurple !hover:bg-opacity-80 !px-4 !py-2 !text-white !font-semibold !rounded-full mb-4"
          >
            Change Token Mint Price
          </Web3Button>
        ) : (
          <Web3Button
            action={() => {
              toast
                .promise(handleChangeMintPrice, {
                  pending: "Waiting for confirmation 🕒",
                  success: "Transaction confirmed 👌",
                  error: "Transaction rejected 🤯"
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            contractAddress={nftContractAddress}
            className="!mt-4 !bg-primaryPurple !hover:bg-opacity-80 !px-4 !py-2 !text-white !font-semibold !rounded-full mb-4"
          >
            Change Mint Price
          </Web3Button>
        )}
      </div>
    </div>
  );
};

export default ChangeMintPrice;
