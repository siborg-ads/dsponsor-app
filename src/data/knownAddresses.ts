import { Address } from "thirdweb";

interface KnownAddress {
  isKnown: boolean;
  name: string;
}

const siborg: Record<Address, KnownAddress> = {
  "0x9a7FAC267228f536A8f250E65d7C4CA7d39De766": {
    isKnown: true,
    name: "SiBorg"
  },
  "0xAC9055cDaF2F2aC1a9e140D918135C1D3AA7aa35": {
    isKnown: true,
    name: "Cryptoast"
  }
};

export default siborg;
