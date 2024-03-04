//                'function updateOffer(uint256 offerId, bool disable, string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) addOptions, (address[] admins, address[] validators, string[] adParameters) removeOptions)',
export default function updateOffer(offerId, disable, name, rulesURI, addOptions, removeOptions) {
    return this.contract.updateOffer(offerId, disable, name, rulesURI, addOptions, removeOptions);
}
