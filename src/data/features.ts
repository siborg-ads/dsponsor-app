// const isDevelopment = process.env.NEXT_PUBLIC_CONFIG_MODE === "dev";

// In development mode, we display create offer and multiple currencies (by default to allow easier dev).
// We also later have those put in env variables to allow for easier testing
export const features = {
  canCreateOffer: true,
  canSeeSubmittedAds: true,
  canAcceptNativeTokens: false,
  canFilterTransactionsWithWETH: true,
  canChangeTokenMintPrice: false,
  canChangeValidators: false,

  // Wether to use the new thirdweb provider
  thirdwebV5: false
};
