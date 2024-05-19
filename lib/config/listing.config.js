import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../data/services/client";
import { dSponsorABI } from "../abi/dSponsorMarketplaceABI";
import { erc20ABI } from "../abi/erc20-contract-abi";
import { useChainId } from "@thirdweb-dev/react";

export const contractAddressConfig = {
  dsponsor_marketplace_contract_address: "0xaC03B675FA9644279b92F060BF542EED54F75599",
  erc20_contract_address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  marketplace_offer_gql_endpoint: "https://api.studio.thegraph.com/proxy/65744/dsponsor-sepolia/version/latest"
};



export const dSponsorMpContract = getContract({
  client,
  chain: sepolia,
  address: contractAddressConfig.dsponsor_marketplace_contract_address,
  abi: dSponsorABI,
});

export const erc20Contract = getContract({
  client,
  chain: sepolia,
  address: contractAddressConfig.erc20_contract_address,
  abi: erc20ABI,
});

export const currencyContract = (currencyAddress) => {
  const contract = getContract({
    client,
    chain: sepolia,
    address: currencyAddress,
    abi: erc20ABI,
  });

  return contract;
}

