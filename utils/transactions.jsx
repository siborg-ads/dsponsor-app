import { useAddress } from "@thirdweb-dev/react";
import { toWei } from "thirdweb";

export const useTransaction = () => {
  const address = useAddress();

  const handleApprove = async (ETHAmount, tokenContract, approveERC20) => {
    try {
      const allowance = await tokenContract.call("allowance", [
        address,
        "0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09",
      ]);
      if (allowance > toWei(ETHAmount)) return;
      await approveERC20({
        args: ["0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09", toWei(ETHAmount)],
      });
      console.log("Approval successful");
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleBid = async (approveBid, listingId, ETHAmount) => {
    try {
      await approveBid({
        args: [listingId, Number(toWei(ETHAmount)), ""],
      });

      console.log("bid réussie");
    } catch (error) {
      console.error("Erreur de bid:", error);
    }
  };

  const handleBuy = async (approveBuy, listingId, currency, buyoutPrice) => {
    try {
      await approveBuy({
        args: [listingId, address, 1, currency, buyoutPrice, ""],
      });

      console.log("buy réussie");
    } catch (error) {
      console.error("Erreur de buy:", error);
    }
  };

  const handleCreateListing = async (
    createListing,
    assetContract,
    tokenId,
    startTime,
    secondsUntilEndTime,
    currencyToAccept,
    reservePricePerToken,
    buyoutPricePerToken,
    listingType
  ) => {
    try {
      await createListing({
        args: [
          assetContract,
          tokenId,
          startTime,
          secondsUntilEndTime,
          1, //quantity
          currencyToAccept,
          reservePricePerToken,
          buyoutPricePerToken,
          1, //transferType
          0, //rentalExpirationTimestamp
          listingType,
        ],
      });
    } catch (error) {
      console.error("Erreur de création de listing:", error);
    }
  };

  return { handleApprove, handleBid, handleBuy, handleCreateListing };
};
