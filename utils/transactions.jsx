import { useAddress } from "@thirdweb-dev/react";
import { toWei } from "thirdweb";

export const useTransaction = () => {
  const address = useAddress();

  const handleERC20approve = async (
    amount,
    tokenContract,
    spender,
    approveERC20
  ) => {
    try {
      const allowance = await tokenContract.call("allowance", [
        address,
        spender,
      ]);

      if (allowance > amount) return;
      await approveERC20({
        args: [spender, amount.toString()],
      });
      console.log("Approval successful");
    } catch (error) {
      console.error("Approval error:", error);
      throw new Error("Approval failed");
    }
  };

  const handleBid = async (bid, listingId, enteredBid) => {
    console.log("enteredBid", enteredBid);
    try {
      await bid({
        args: [listingId, enteredBid.toString(), ""],
      });
      console.log("bid réussie");
    } catch (error) {
      console.error("Erreur de bid:", error);
    }
  };

  const handleBuy = async (buy, listingId, currency, buyoutPrice) => {
    try {
      await buy({
        args: [
          [
            {
              listingId: listingId,
              buyFor: address,
              quantity: 1,
              currency: currency,
              totalPrice: buyoutPrice.toString(),
              referralAdditionalInformation: "",
            },
          ],
        ],
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

  const handleERC721approval = async (
    nftContract,
    owner,
    operator,
    setApprovalForAll
  ) => {
    try {
      const isApprovedForAll = await nftContract.call("isApprovedForAll", [
        owner,
        operator,
      ]);

      if (isApprovedForAll) return;
      await setApprovalForAll({
        args: [operator, true],
      });
      console.log("Approval successful");
    } catch (error) {
      console.error("Approval error:", error);
      throw new Error("Approval failed");
    }
  };

  return {
    handleApprove: handleERC20approve,
    handleBid,
    handleBuy,
    handleCreateListing,
    handleERC721approval,
  };
};
