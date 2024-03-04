// 'function reviewAdProposal(uint256 offerId, uint256 tokenId, uint256 proposalId, string adParameter, bool validated, string reason)',
export default function reviewAdProposal(offerId, tokenId, proposalId, adParameter, validated, reason) {
    return this.contract.reviewAdProposal(offerId, tokenId, proposalId, adParameter, validated, reason);
}
