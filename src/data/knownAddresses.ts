import { Address } from "thirdweb";

interface KnownAddress {
  isKnown: boolean;
  name: string;
}

const siborg: Record<Address, KnownAddress> = {
  "0x5b15Cbb40Ef056F74130F0e6A1e6FD183b14Cdaf": {
    isKnown: true,
    name: "SiBorg Protocol DAO"
  },
  "0x9a7FAC267228f536A8f250E65d7C4CA7d39De766": {
    isKnown: true,
    name: "SiBorg App"
  },
  "0xAC9055cDaF2F2aC1a9e140D918135C1D3AA7aa35": {
    isKnown: true,
    name: "Cryptoast"
  },
  "0xFf772b57acbF21D17254bAA3e286F3F7A6b28564": {
    isKnown: true,
    name: "DeFi France"
  }
};

export default siborg;
