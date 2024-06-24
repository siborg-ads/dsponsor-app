import { isAddress } from "ethers/lib/utils";

const shortenAddress = (address) => {
  if (address === "You") return address;
  if (!isAddress(address)) return "unknown.eth";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default shortenAddress;
