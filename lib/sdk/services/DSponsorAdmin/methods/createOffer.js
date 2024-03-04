//'function createOffer(address nftContract, (string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) options) offerParams)',
export default function createOffer(nftContract, offerParams) {
    return this.contract.createOffer(nftContract, offerParams);
}
