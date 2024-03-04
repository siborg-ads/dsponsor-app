import {ethers} from "ethers";

export default function convertABI(abi){
    return new ethers.Interface(abi).format();
}
