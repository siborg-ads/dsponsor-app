const checkUserBalanceWithoutToast = (tokenAddressBalance, priceToken) => {
  try {
    const parsedTokenBalance = parseFloat(tokenAddressBalance.displayValue);
    const parsedPriceToken = parseFloat(priceToken);

    if (parsedTokenBalance >= parsedPriceToken) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to fetch token balance:", error);
    throw new Error("Failed to fetch token balance");
  }
};

export default checkUserBalanceWithoutToast;
