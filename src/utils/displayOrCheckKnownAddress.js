import knownAddresses from "../data/known-addresses.js";
export default function displayOrCheckKnownAddress(address) {
  const known = knownAddresses[address];
  if (known) {
    return `${known.name} ${address.slice(0, 6)}...${address.slice(-4)} - ✅ Identity verified by SiBorg Team`;
  } else {
    return `${address}`;
  }
}
