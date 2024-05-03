import { useAddress } from "@thirdweb-dev/react";
import { toWei } from "thirdweb";

export const useTransaction = () => {
  const address = useAddress();

  const handleApprove = async (
    amount,
    tokenContract,
    spender,
    approveERC20
  ) => {
    try {
      console.log("amount", amount);
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

      //args
      // {
      //   listingId,
      //   buyFor: user2Addr,
      //   quantity: 1,
      //   currency: ERC20MockAddress,
      //   totalPrice,
      //   referralAdditionalInformation
      // }

      // { buyParams: {
      //   listingId,
      //   buyFor: user2Addr,
      //   quantity: 1,
      //   currency: ERC20MockAddress,
      //   totalPrice,
      //   referralAdditionalInformation
      // }}
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
