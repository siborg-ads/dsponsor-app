import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";
import AdsOffersMapper from "../mappers/AdsOffersMapper";

export const GetAllAdsOffers = async () => {
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
  const resultat = await execute(GET_DATA, {});

  const mapperResult = AdsOffersMapper(resultat);

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

  const variables_1 = {
    id: adId,
  };

  const resultat_1 = await execute(GET_AD_OFFER, variables_1);
   const mapperResult = AdsOffersMapper(resultat_1);

  console.log(resultat_1.data);
  const variables_2 = {
    addressContract: resultat_1.data?.newDSponsorNFTs[0]?.contractAddr,
  };
  console.log(variables_2);
  const resultat_2 = await execute(GET_OFFERID_AD_OFFER, variables_2);
  console.log(resultat_2);

  return mapperResult;
};
