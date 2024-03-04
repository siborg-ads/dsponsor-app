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
                // Public variables
                'function bps() public view returns (uint96)',
                'function nftFactory() public view returns (address)',
                'function owner() public view returns (address)',
                'function recipient() public view returns (address)',
                'function swapRouter() public view returns (address)',
                'function trustedForwarder() public view returns (address)',
                // External read fn
                'function getOfferContract(uint256 offerId) external view returns(address)',
                'function getOfferProposals(uint256 offerId, uint256 tokenId, string adParameter) external view returns(uint256,uint256,uint256)',
                'function isOfferAdmin(uint256 offerId, address admin) external view returns(bool)',
                'function isOfferDisabled(uint256 offerId) external view returns(bool)',
                'function isOfferValidator(uint256 offerId, address validator) external view returns(bool)',
                'function isTrustedForwarder(address forwarder) external view returns(bool)',
                // External exec fn
                'function createDSponsorNFTAndOffer((string name, string symbol, string baseURI, string contractURI, address minter, uint256 maxSupply, address forwarder, address initialOwner, uint96 royaltyBps, address[] currencies, uint256[] prices, uint256[] allowedTokenIds) nftParams, (string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) options) offerParams)',
                'function createOffer(address nftContract, (string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) options) offerParams)',
                'function mintAndSubmit((uint256 tokenId, address to, address currency, string tokenData, uint256 offerId, string[] adParameters, string[] adDatas, string referralAdditionalInformation) params) payable',
                'function reviewAdProposal(uint256 offerId, uint256 tokenId, uint256 proposalId, string adParameter, bool validated, string reason)',
                'function setTrustedForwarder(address forwarder)',
                'function submitAdProposal(uint256 offerId, uint256 tokenId, string adParameter, string data)',
                'function transferOwnership(address newOwner)',
                'function updateOffer(uint256 offerId, bool disable, string name, string rulesURI, (address[] admins, address[] validators, string[] adParameters) addOptions, (address[] admins, address[] validators, string[] adParameters) removeOptions)',
                'function updateProtocolFee(address _recipient, uint96 _bps)',
                // constructor
                'constructor(address _nftFactory, address forwarder, address initialOwner, address _swapRouter, address _recipient, uint96 _bps)',
                // Events
                'event CallWithProtocolFee(address indexed target, address indexed currency, uint256 fee, address enabler, address spender, string additionalInformation)',
                'event FeeUpdate(address recipient, uint96 bps)',
                'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
                'event UpdateAdProposal(uint256 indexed offerId, uint256 indexed tokenId, uint256 indexed proposalId, string adParameter, string data)',
                'event UpdateAdValidation(uint256 indexed offerId, uint256 indexed tokenId, uint256 indexed proposalId, string adParameter, bool validated, string reason)',
                'event UpdateOffer(uint256 indexed offerId, bool indexed disable, string name, string rulesURI, address indexed nftContract)',
                'event UpdateOfferAdParameter(uint256 indexed offerId, string indexed adParameter, bool indexed enable)',
                'event UpdateOfferAdmin(uint256 indexed offerId, address indexed admin, bool indexed enable)',
                'event UpdateOfferValidator(uint256 indexed offerId, address indexed validator, bool indexed enable)',
                // Errors
                'error AddressEmptyCode(address target)',
                'error AddressInsufficientBalance(address account)',
                'error CannotRemoveSelfAsAdmin()',
                'error DisabledOffer(uint256 offerId)',
                'error EmptyString(string key)',
                'error ExternalCallError()',
                'error FailedInnerCall()',
                'error InsufficientAllowance()',
                'error InsufficientFunds()',
                'error InvalidAdData()',
                'error MathOverflowedMulDiv()',
                'error NoAdDataSubmitted()',
                'error NoAdParametersProvided()',
                'error NoAdminsProvided()',
                'error OfferDoesNotExist()',
                'error OwnableInvalidOwner(address owner)',
                'error OwnableUnauthorizedAccount(address account)',
                'error ProposalNotSubmittedBySponsor(uint256 offerId, uint256 tokenId, string adParameter, uint256 proposalId)',
                'error ReentrancyGuardReentrantCall()',
                'error SafeERC20FailedOperation(address token)',
                'error UnallowedAdParameter(uint256 offerId, string adParameter)',
                'error UnallowedAdminOperation(address msgSender, uint256 offerId)',
                'error UnallowedSponsorOperation(address msgSender, uint256 offerId, uint256 tokenId)',
                'error UnallowedValidatorOperation(address msgSender, uint256 offerId)',
                'error ZeroAddress()',
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
