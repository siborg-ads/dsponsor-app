import {ethers} from "ethers";
import getOfferContract from "./methods/getOfferContract.js";
import getBPS from "./methods/getBPS.js";
import getOfferProposals from "./methods/getOfferProposals.js";
import isAllowedAdParameter from "./methods/isAllowedAdParameter.js";
import isOfferAdmin from "./methods/isOfferAdmin.js";
import isOfferDisabled from "./methods/isOfferDisabled.js";
import getNFTFactoryContractAddress from "./methods/getNFTFactoryContractAddress.js";
import getCurrentTrustedForwarder from "./methods/getCurrentTrustedForwarder.js";
import getOwnerAddress from "./methods/getOwnerAddress.js";
import getRecipientAddress from "./methods/getRecipientAddress.js";
import getSwapRouterAddress from "./methods/getSwapRouterAddress.js";

class DSponsorAdmin {
    constructor({address, signer} = {}) {
        this.address = address


        this.contract = new ethers.Contract(
            this.address,
            [
                'function bps() public view returns (uint96)',
                'function nftFactory() public view returns (address)',
                'function owner() public view returns (address)',
                'function recipient() public view returns (address)',
                'function swapRouter() public view returns (address)',
                'function trustedForwarder() public view returns (address)',
                'function getOfferContract(uint256 offerId) external view returns(address)',
                'function getOfferProposals(uint256 offerId, uint256 tokenId, string adParameter) external view returns(uint256,uint256,uint256)',
                'function isOfferAdmin(uint256 offerId, address admin) external view returns(bool)',
                'function isOfferDisabled(uint256 offerId) external view returns(bool)',
                'function isOfferValidator(uint256 offerId, address validator) external view returns(bool)',
                'function isTrustedForwarder(address forwarder) external view returns(bool)',
            ],
            signer
        )
    }
}

DSponsorAdmin.prototype.getBPS = getBPS;
DSponsorAdmin.prototype.getCurrentTrustedForwarder = getCurrentTrustedForwarder;
DSponsorAdmin.prototype.getNFTFactoryContractAddress = getNFTFactoryContractAddress;
DSponsorAdmin.prototype.getOfferContract = getOfferContract;
DSponsorAdmin.prototype.getOfferProposals = getOfferProposals;
DSponsorAdmin.prototype.getOwnerAddress = getOwnerAddress;
DSponsorAdmin.prototype.getRecipientAddress = getRecipientAddress;
DSponsorAdmin.prototype.getSwapRouterAddress = getSwapRouterAddress;
DSponsorAdmin.prototype.isAllowedAdParameter = isAllowedAdParameter;
DSponsorAdmin.prototype.isOfferAdmin = isOfferAdmin;
DSponsorAdmin.prototype.isOfferDisabled = isOfferDisabled;
export default DSponsorAdmin;
