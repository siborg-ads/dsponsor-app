import { ethers } from "ethers";
import contractABI from "../abi/dsponsorAdmin.json";
const provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
const contractAddress = "0xE442802706F3603d58F34418Eac50C78C7B4E8b3";

const contract = new ethers.Contract(contractAddress, contractABI, signer);

export {  contract };
