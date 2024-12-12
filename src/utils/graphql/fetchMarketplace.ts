import { executeQuery } from "@/utils/graphql/helper/executeQuery";
import config from "@/config/config";

/**
 * Fetches all listed tokens from the marketplace for a specific blockchain chain ID.
 *
 * @param {number} chainId - The ID of the blockchain chain to fetch tokens from.
 * @param {boolean} allTokens - Flag to include all tokens or filter out tokens with no marketplace listings.
 * @returns {Promise<Array>} - A promise that resolves to an array of tokens with their details.
 */
export const fetchMarketplace = async (
  chainId: number,
  allTokens: boolean,
  offerIds,
  searchTerm = ""
) => {
  const relayerURL = config[chainId].relayerURL;
  const path = new URL(`${relayerURL}/api/${chainId}/graph`);

  const where = searchTerm.length
    ? `where: {
          or: [
                { name_contains_nocase: "${searchTerm}" },
                { metadata_ : { offer_name_contains_nocase: "${searchTerm}" } },
                { metadata_ : { offer_description_contains_nocase: "${searchTerm}" } }
              ]
    }`
    : `where: { id_in: [${offerIds.map((e) => `"${e}"`)}] }`;

  const GET_DATA = `
    query getAllMarketplaceListings {
      adOffers(first: 1000, ${where}) {
        id
        disable
        metadataURL
        metadata {
         content
        }
        nftContract {
          royalty {
            bps
          }
          tokens(first: 1000, orderBy: tokenId, orderDirection: asc) {
            tokenId
            mint {
              blockTimestamp
              tokenData
              totalPaid
              currency
            }
            nftContract {
              id 
                prices (orderBy: amount, orderDirection: desc) { # workaround cryptoast parcelles
                currency 
                amount 
                enabled
              }
            }
            marketplaceListings(
              where: { status_not_in: ["CANCELLED"]  }
              first: 2
              orderBy: id
              orderDirection: desc
            ) {
              id 
              quantity
              token {
                tokenId
                nftContract {
                  id 
                  royalty {
                    bps
                  }
                }
                mint {
                  tokenData
                }
              }
              
              listingType

              currency               
              reservePricePerToken
              buyoutPricePerToken
              bids(first: 1, orderBy: totalBidAmount, orderDirection: desc) {
                 creationTimestamp
                bidder
                totalBidAmount
                status
                newPricePerToken
                totalBidAmount
                paidBidAmount
                refundBonus
                refundAmount
                refundProfit
              }

              lister

              startTime
              endTime
             
              status

              tokenType
              transferType
              rentalExpirationTimestamp
            }
          }
        }
      }
    }
  `;

  type QueryType = {
    adOffers: [
      {
        id: string;
        disable: boolean;
        metadataURL: string;
        nftContract: {
          royalty: {
            bps: string;
          };
          tokens: [
            {
              tokenId: string;
              mint: {
                blockTimestamp: string;
                tokenData: string;
                totalPaid: string;
                currency: string;
              };
              nftContract: {
                id: string;
                adOffers: [
                  {
                    id: string;
                    metadataURL: string;
                    disable: boolean;
                  }
                ];
                prices: [
                  {
                    currency: string;
                    amount: string;
                    enabled: boolean;
                  }
                ];
              };
              marketplaceListings: [
                {
                  id: string;
                  quantity: string;
                  token: {
                    tokenId: string;
                    nftContract: {
                      id: string;
                      royalty: {
                        bps: string;
                      };
                      adOffers: [
                        {
                          id: string;
                          metadataURL: string;
                          disable: boolean;
                        }
                      ];
                    };
                    mint: {
                      tokenData: string;
                    };
                  };
                  listingType: string;
                  currency: string;
                  reservePricePerToken: string;
                  buyoutPricePerToken: string;
                  bids: [
                    {
                      creationTimestamp: string;
                      bidder: string;
                      totalBidAmount: string;
                      status: string;
                      newPricePerToken: string;
                      paidBidAmount: string;
                      refundBonus: string;
                      refundAmount: string;
                      refundProfit: string;
                    }
                  ];
                  lister: string;
                  startTime: string;
                  endTime: string;
                  status: string;
                  tokenType: string;
                  transferType: string;
                  rentalExpirationTimestamp: string;
                }
              ];
            }
          ];
        };
      }
    ];
  };

  const chainConfig = config[chainId];
  const variables = {};
  const options = {
    populate: true
    /*
    next: {
      tags:
        searchTerm.length || offerIds.length > 63
          ? []
          : offerIds.map((offerId) => `${chainId}-adOffer-${offerId}`)
    }
    */
  };

  const response = (await executeQuery(path.href, GET_DATA, variables, options)) as QueryType;

  const mappedListedToken = response?.adOffers
    .map((offer) => {
      const newOffer = {
        ...offer,
        disable: offer.disable,
        nftContract: {
          ...offer.nftContract,
          tokens: allTokens
            ? offer.nftContract.tokens
            : offer.nftContract.tokens.filter(
                (token) => token.mint && token.marketplaceListings.length > 0
              )
        }
      };

      return newOffer;
    })
    .flatMap((offer) =>
      offer.nftContract.tokens.map((token) => ({
        ...token,
        disable: offer.disable,
        offerId: offer.id,
        tokenData: token.mint?.tokenData ? token.mint.tokenData : null,
        chainConfig: chainConfig
      }))
    )
    .sort(
      (a, b) =>
        Number(b.marketplaceListings[0]?.startTime) - Number(a.marketplaceListings[0]?.startTime)
    );

  return mappedListedToken;
};
