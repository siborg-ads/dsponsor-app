const shortenAddress = (address) => {
  if (!address) return "unknown.eth";
  if (address === "You") return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default shortenAddress;
