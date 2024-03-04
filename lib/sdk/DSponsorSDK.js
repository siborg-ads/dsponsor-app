import ChainNetwork from "./ChainNetwork/ChainNetwork.js";
import DSponsorAdmin from "./services/DSponsorAdmin/DSponsorAdmin.js";
import {ethers} from "ethers";


function generatePrivateKey() {
    return ethers.Wallet.createRandom().privateKey;
}
class DSponsorSDK {
    constructor({chain, privateKey} = {}) {
        // this.sdk = new ThirdwebSDK("mumbai");
        this.chain = new ChainNetwork(chain);

        let key = privateKey || generatePrivateKey();
        const signer = new ethers.Wallet(key, this.chain.provider);

        this.contracts = {
            "DSponsorAdmin": new DSponsorAdmin({
                address: this.chain.contracts.DSponsorAdmin,
                signer
            })
        }
    }
}

export default DSponsorSDK;
