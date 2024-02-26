import AdsOfferModel from "../models/AdsOffersModel";
import { fetchDataFromIPFS } from "../services/ipfsService";
import { ethers } from "ethers"; // Assurez-vous d'avoir installé ethers

const AdsOffersMapper = async (graphData) => {
  console.log("graphData", graphData);
  const data = graphData.data.newDSponsorNFTs;
  const mappedData = [];

  for (const element of data) {
    const IPFSLink = element.contractURI;
    const destructuredIPFSResult = await fetchDataFromIPFS(IPFSLink);

    try {
      if (!element || !destructuredIPFSResult) {
        throw new Error("L'élément ou le résultat IPFS est null.");
      }

      const adsOffer = new AdsOfferModel({
        id: element.id || 0,
        Name: element.name || "Default",
        OwnerAddress: element.owner || "Default",
        OwnerName: element.ownerName || "Default",
        Image: destructuredIPFSResult.image && destructuredIPFSResult.image[0] ? destructuredIPFSResult.image[0] : "Default",
        Maxsupply: element.maxSupply || 0,
        ExternalLink: destructuredIPFSResult.external_link || "Default",
        Description: destructuredIPFSResult.description || "Default",
        CurrencyAddress: element.currencies[0] || "Default",
        CurrencyName: destructuredIPFSResult.currencyName || "Default",
        Price: destructuredIPFSResult.price || 0,
        Royalties: element.royaltyBps ? element.royaltyBps / 100 : 0,
        NumberTokenAllowed: element.allowedTokenIds ? element.allowedTokenIds.length : 0,
      });

      mappedData.push(adsOffer);
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
  }
  return mappedData;
};

export default AdsOffersMapper;
