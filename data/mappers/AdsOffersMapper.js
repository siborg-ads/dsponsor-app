import AdsOfferModel from "../models/AdsOffersModel";
import { fetchDataFromIPFS } from "../services/ipfsService";

const AdsOffersMapper = async (graphData) => {
  const data = graphData.data.newDSponsorNFTs;

  const mappedData = [];

  for (const element of data) {

    const IPFSLink = element.contractURI;
    const destructuredIPFSResult = await fetchDataFromIPFS(IPFSLink);

    console.log(element);

    const adsOffer = new AdsOfferModel({
      id: "",
      Name: element.name,
      OwnerAddress: element.owner,
      OwnerName: element.ownerName,
      Image: destructuredIPFSResult.image[0],
      Price: element.prices,
      Maxsupply: element.maxSupply,
      ExternalLink: destructuredIPFSResult.external_link,
      Description: destructuredIPFSResult.description,
      Currency: element.currency,
      Royalties: element.royaltyBps / 100,
      NumberTokenAllowed: element.allowedTokenIds.length,
    });

    mappedData.push(adsOffer);
  }
  console.log(mappedData);
};

const PrepareTokenName = (tokenAddress) => {
  const { ethers } = require("ethers");
  const provider = new ethers.providers.JsonRpcProvider("YOUR_PROVIDER_URL");
  const tokenAbi = ["function name() view returns (string)"];
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
  return tokenContract.name();
};

const GetTokenName = async(tokenAddress) => {
  try {
    const name = await PrepareTokenName(tokenAddress);
    console.log("Le nom du token est :", name);
    return name;
  } catch (error) {
    console.error("Impossible de récupérer le nom du token :", error);
  }
}

export default AdsOffersMapper;
