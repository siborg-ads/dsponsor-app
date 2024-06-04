// This is not a secure way to handle feature flags.
// If a new feature is added there, it shall be known that one user can just devtool change it
export const activated_features = {
    canCreateOffer: false,
    // by default, first item used
    canHaveMultipleCurrencies: false,
}
