import { sepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import marketplaceContractAbi from "../marketplace/marketplace-contact-abi.json";
import { client } from "../../data/services/client";
import erc20ContractAbi from "../marketplace/erc20-contract-abi.json";

export const marketplaceConfig = {
  // Sepolia Testnet
  11155111: {
    dsponsor_marketplace_contract_address:
      "0xaC03B675FA9644279b92F060BF542EED54F75599",
    erc20_contract_address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    marketplace_offer_gql_endpoint:
      "https://api.studio.thegraph.com/proxy/65744/dsponsor-sepolia/version/latest",
    chain: sepolia,
  },
};

export const marketplaceContract = (chainId) => {
  const chainConfig = marketplaceConfig[chainId];
  return getContract({
    client,
    chain: chainConfig.chain,
    address: chainConfig.dsponsor_marketplace_contract_address,
    abi: marketplaceContractAbi,
  });
};

export const erc20Contract = (chainId, nftCurrencyAddress) => {
  const chainConfig = marketplaceConfig[defaultChainId];
  return getContract({
    client,
    chain: chainConfig.chain,
    address: nftCurrencyAddress,
    abi: erc20ContractAbi,
  });
};

export const defaultChainId = 11155111;
