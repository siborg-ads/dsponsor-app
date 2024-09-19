import { executeQuery } from "@/utils/graphql/helper/executeQuery";
import config from "@/config/config";
import { Address } from "@thirdweb-dev/sdk";

/**
 * Fetches all offers profile for a given user address and chain ID.
 *
 * @param {string} userAddress - The address of the user. - Hard fix : for now userAddress is not used in the query
 * @param {number} chainId - The ID of the blockchain chain.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of offer profiles.
 */
export const fetchAllOffersProfile = async (userAddress: Address, chainId: number) => {
  const relayerURL = config[chainId].relayerURL;

  const path = new URL(`${relayerURL}/api/${chainId}/graph`);

  const GET_DATA = /* GraphQL */ `
    query OffersManagedByUser {
      adOffers(first: 1000) {
        metadataURL
        disable
        name
        admins
        initialCreator
        id
        allProposals {
          id
          adOffer
          token
          adParameter
          status
          data
          rejectReason
          creationTimestamp
          lastUpdateTimestamp
        }
        creationTimestamp
        adParameters(where: { enable: true }) {
          enable
          adParameter {
            id
            base
            variants
          }
        }
        nftContract {
          id
          prices {
            currency
            amount
            enabled
          }
          owner
          tokens(first: 1000, orderBy: tokenId) {
            tokenId
            mint {
              transactionHash
              to
              tokenData
            }
            marketplaceListings {
              id
              quantity
              token {
                tokenId
                nftContract {
                  id
                  royalty {
                    bps
                  }
                  owner {
                    newOwner
                    previousOwner
                  }
                  adOffers {
                    id
                    disable
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
              bids(orderBy: totalBidAmount, orderDirection: desc, first: 1000) {
                id
                bidder
                quantity
                refundBonus
                refundAmount
                refundProfit
                paidBidAmount
                status
                currency
                creationTimestamp
                lastUpdateTimestamp
                creationTxHash
                listing {
                  token {
                    tokenId
                    mint {
                      tokenData
                    }
                    nftContract {
                      adOffers(first: 1, orderBy: creationTimestamp, orderDirection: desc) {
                        id
                        name
                      }
                    }
                  }
                }
              }
              lister
              startTime
              endTime
              status
              tokenType
              transferType
              rentalExpirationTimestamp
            }
            setInAllowList
            currentProposals {
              adOffer {
                id
              }
              adParameter {
                id
                base
                variants
              }
              acceptedProposal {
                id
                status
                data
                creationTimestamp
              }
              pendingProposal {
                id
                status
                data
                creationTimestamp
              }
              rejectedProposal {
                id
                status
                data
                rejectReason
                creationTimestamp
              }
            }
            allProposals(orderBy: creationTimestamp, orderDirection: desc) {
              adParameter {
                id
              }
              status
              data
              rejectReason
              creationTimestamp
              lastUpdateTimestamp
            }
          }
        }
      }
    }
  `;

  type QueryType = {
    adOffers: {
      metadataURL: string;
      disable: boolean;
      name: string;
      admins: Address[];
      initialCreator: Address;
      id: string;
      allProposals: {
        id: string;
        adOffer: string;
        token: string;
        adParameter: string;
        status: string;
        data: string;
        rejectReason: string;
        creationTimestamp: string;
        lastUpdateTimestamp: string;
      }[];
      creationTimestamp: string;
      adParameters: {
        enable: boolean;
        adParameter: {
          id: string;
          base: string;
          variants: string[];
        };
      }[];
      nftContract: {
        id: string;
        prices: {
          currency: Address;
          amount: string;
          enabled: boolean;
        }[];
        owner: Address;
        tokens: {
          tokenId: string;
          mint: {
            transactionHash: string;
            to: Address;
            tokenData: string;
          };
          marketplaceListings: {
            id: string;
            quantity: string;
            token: {
              tokenId: string;
              nftContract: {
                id: string;
                royalty: {
                  bps: string;
                };
                owner: {
                  newOwner: Address;
                  previousOwner: Address;
                };
                adOffers: {
                  id: string;
                  metadataURL: string;
                  disable: boolean;
                }[];
                prices: {
                  currency: Address;
                  amount: string;
                  enabled: boolean;
                }[];
              };
              mint: {
                tokenData: string;
              };
            };
            listingType: string;
            currency: Address;
            reservePricePerToken: string;
            buyoutPricePerToken: string;
            bids: {
              id: string;
              bidder: Address;
              quantity: string;
              refundBonus: string;
              refundAmount: string;
              refundProfit: string;
              paidBidAmount: string;
              status: string;
              currency: Address;
              creationTimestamp: string;
              lastUpdateTimestamp: string;
              creationTxHash: string;
              listing: {
                token: {
                  tokenId: string;
                  mint: {
                    tokenData: string;
                  };
                  nftContract: {
                    adOffers: {
                      id: string;
                      name: string;
                    }[];
                  };
                };
              };
            }[];
            lister: Address;
            startTime: string;
            endTime: string;
            status: string;
            tokenType: string;
            transferType: string;
            rentalExpirationTimestamp: string;
          };
          setInAllowList: boolean;
          currentProposals: {
            adOffer: {
              id: string;
            };
            adParameter: {
              id: string;
              base: string;
              variants: string[];
            };
            acceptedProposal: {
              id: string;
              status: string;
              data: string;
              creationTimestamp: string;
            };
            pendingProposal: {
              id: string;
              status: string;
              data: string;
              creationTimestamp: string;
            };
            rejectedProposal: {
              id: string;
              status: string;
              data: string;
              rejectReason: string;
              creationTimestamp: string;
            };
          }[];
          allProposals: {
            adParameter: {
              id: string;
            };
            status: string;
            data: string;
            rejectReason: string;
            creationTimestamp: string;
            lastUpdateTimestamp: string;
          }[];
        }[];
      };
    }[];
  };

  const variables = {
    // userAddress: userAddress
  };
  const options = {
    populate: true,
    // next: { tags: [`${chainId}-userAddress-${userAddress}`] }
    next: { tags: [`${chainId}-adOffers`] }
  };
  const response = (await executeQuery(path.href, GET_DATA, variables, options)) as QueryType;
  const chainConfig = config[chainId];

  const resultMappedData = response?.adOffers
    .map((element) => {
      const sortByTokenId = element.nftContract.tokens.sort((a, b) => {
        const tokenIdA = BigInt(a.tokenId);
        const tokenIdB = BigInt(b.tokenId);
        if (tokenIdA < tokenIdB) return -1;
        if (tokenIdA > tokenIdB) return 1;
        return 0;
      });

      const tokenIdAllowedToMint =
        sortByTokenId.find((token) => token.mint === null)?.tokenId || false;

      const combinedData = {
        ...element,
        chainConfig: chainConfig,
        tokenIdAllowedToMint: tokenIdAllowedToMint
      };

      return combinedData;
    })
    .filter((item) => item !== null);

  return resultMappedData;
};
