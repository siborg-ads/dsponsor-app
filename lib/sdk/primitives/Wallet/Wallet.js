import {ethers} from "ethers";

class Wallet {
    constructor({privateKey} = {}) {

        this.signer = new ethers.Wallet(privateKey);
    }
}

export default Wallet;
