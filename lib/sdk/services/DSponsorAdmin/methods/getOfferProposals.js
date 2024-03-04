export default function getOfferProposals(offerId, tokenId, adParameter){
    return this.contract.getOfferProposals(offerId, tokenId, adParameter);
}
