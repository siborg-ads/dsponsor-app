//                'function createDSponsorNFTAndOffer((string name, string symbol, string baseURI, string contractURI, address minter, uint256 maxSupply, address forwarder, address initialOwner, uint96 royaltyBps, address[] currencies, uint256[] prices, uint256[] allowedTokenIds) nftParams, (string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) options) offerParams)',
export default function createDSponsorNFTAndOffer(nftParams, offerParams) {
    return this.contract.createDSponsorNFTAndOffer(nftParams, offerParams);
}
