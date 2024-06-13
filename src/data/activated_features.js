// This is not a secure way to handle feature flags.
// If a new feature is added there, it shall be known that one user can just devtool change it

const env = process.env.NODE_ENV;
const isProduction = env === "production";
const isDevelopment = env === "development";

// In development mode, we display create offer and multiple currencies (by default to allow easier dev).
// We also later have those put in env variables to allow for easier testing
export const activated_features = {
  canCreateOffer: !!isDevelopment,
  // by default, first item used
  canHaveMultipleCurrencies: !!isDevelopment,
  // crossmint payment enabled
  canPayWithCrossmintEnabled: !!isDevelopment,
  // Whether to show the "Submitted Ads" in offer details
  canSeeSubmittedAds: false,
  // Whether to show the Integration tab in offer details
  canSeeIntegrationDetails: true
};
