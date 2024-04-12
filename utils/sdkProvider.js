import { DSponsorAdmin } from "@dsponsor/sdk"; 

const adminInstance = new DSponsorAdmin({
  chain: {
    alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chainName: "ethereum-sepolia",
  },
});

export default adminInstance;
