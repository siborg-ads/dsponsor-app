import DSponsorSDK from "./DSponsorSDK.js";
import getNFTFactoryContractAddress from "./services/DSponsorAdmin/methods/getNFTFactoryContractAddress.js";
import getCurrentTrustedForwarder from "./services/DSponsorAdmin/methods/getCurrentTrustedForwarder.js";

// Provide `chain: 'ethereum-sepolia'` to the constructor to other than default polygon-mumbai
// Provide `privateKey` to the constructor to use a specific private key for signing.
const dsponsor = new DSponsorSDK();

console.log(`DSponsorSDK: `, dsponsor.contracts.DSponsorAdmin.address);
console.log(`Current BPS:`, await dsponsor.contracts.DSponsorAdmin.getBPS());
console.log(`NFT Factory:`, await dsponsor.contracts.DSponsorAdmin.getNFTFactoryContractAddress());
console.log(`Owner:`, await dsponsor.contracts.DSponsorAdmin.getOwnerAddress());
console.log(`Current Trusted Forwarder:`, await dsponsor.contracts.DSponsorAdmin.getCurrentTrustedForwarder());
