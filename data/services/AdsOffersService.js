
import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";
import AdsOffersMapper from "../mappers/AdsOffersMapper";

export const GetAllAdsOffers = async () => {
  const GET_DATA = gql`
    query MyQuery {
      newDSponsorNFTs(first: 2) {
        contractURI
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
  
   
  return resultat;
};


