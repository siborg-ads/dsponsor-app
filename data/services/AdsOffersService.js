import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";
import AdsOffersMapper from "../mappers/AdsOffersMapper";

export const GetAllAdsOffers = async () => {
  // Requête pour récupérer tous les NewDSponsorNFTs
  const GET_DATA = gql`
    query MyQuery {
      newDSponsorNFTs {
        contractURI
        contractAddr
        id
        maxSupply
        name
        owner
        prices
        currencies
        allowedTokenIds
        royaltyBps
      }
    }
  `;

  // Requête pour récupérer l'offerId basé sur contractAddr
  const GET_OFFERID = gql`
    query GetOfferId($addressContract: ID!) {
      updateOffers(where: { nftContract: $addressContract }) {
        offerId
      }
    }
  `;

  // Exécutez la requête pour obtenir tous les NFTs
  const resultat = await execute(GET_DATA, {});
  const newDSponsorNFTs = resultat.data?.newDSponsorNFTs || [];

  // Pour chaque NFT, récupérez l'offerId correspondant
  for (const nft of newDSponsorNFTs) {
    const resultatOfferId = await execute(GET_OFFERID, { addressContract: nft.contractAddr });
    const offerId = resultatOfferId.data?.updateOffers[0]?.offerId;

    // Ajoutez l'offerId à l'objet NFT
    nft.offerId = offerId;
  }

  // Appliquez le mapper pour ajuster les données si nécessaire
  const mapperResult = AdsOffersMapper(newDSponsorNFTs);

  return mapperResult;
};

export const GetAdOfferById = async (adId) => {
  const GET_AD_OFFER = gql`
    query GetAdOffer($id: ID!) {
      newDSponsorNFTs(where: { id: $id }) {
        contractURI
        contractAddr
        id
        maxSupply
        name
        owner
        prices
        currencies
        allowedTokenIds
        royaltyBps
      }
    }
  `;

  const GET_OFFERID_AD_OFFER = gql`
    query GetOfferId($addressContract: ID!) {
      updateOffers(where: { nftContract: $addressContract }) {
        offerId
      }
    }
  `;

 const variables_1 = { id: adId };
 const resultat_1 = await execute(GET_AD_OFFER, variables_1);
 const newDSponsorNFTs = resultat_1.data?.newDSponsorNFTs || [];

 // Pour chaque NewDSponsorNFT, enrichissez-le avec l'offerId en exécutant la seconde requête
 for (const nft of newDSponsorNFTs) {
   const variables_2 = { addressContract: nft.contractAddr };
   const resultat_2 = await execute(GET_OFFERID_AD_OFFER, variables_2);
   const offerId = resultat_2.data?.updateOffers[0]?.offerId;

   // Ajoutez offerId à l'objet NFT
   nft.offerId = offerId;
 }

const mapperResult = AdsOffersMapper(newDSponsorNFTs);
 // À ce stade, chaque objet NewDSponsorNFT dans `newDSponsorNFTs` a un `offerId` intégré
 return mapperResult;
};
