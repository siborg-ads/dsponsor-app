//               'function submitAdProposal(uint256 offerId, uint256 tokenId, string adParameter, string data)',
export default function submitAdProposal(offerId, tokenId, adParameter, data) {
    return this.contract.submitAdProposal(offerId, tokenId, adParameter, data);
}
