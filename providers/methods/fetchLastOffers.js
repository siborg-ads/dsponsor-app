export default async function fetchLastOffers(options) {
    const chainId = options?.chainId || '11155111';

    // const path = new URL(`https://relayer.dsponsor.com/api/${chainId}/graph/query`);
    const path = new URL(`http://localhost:3001/api/${chainId}/graph/query`);
    path.searchParams.append('method', 'raw');
    path.searchParams.append('withMetadata', 'true');
    path.searchParams.append('query', `query Homepage_LastOffers {
      adOffers(orderBy: creationTimestamp, orderDirection: desc, first: 20, where: { and: [{ disable: false }] }) {
        id # offerId
        # --> Fetch and parse https://github.com/dcast-media/dips/blob/dip-0002/antho31/dip-0002.md#example-schema-json
        # to get creator & offer info  (you may have token_metadata info too)
        # offer.name, offer.image
        metadataURL

        nftContract {
          id # DSponsorNFT smart contract address
          allowList # defines if there is a token allowlist
          # default mint price
          prices {
            currency # ERC20 smart contract
            amount # wei, mind decimals() function to transform in human readable value !
            enabled
          }

          # get all tokens
          tokens {
            tokenId
            mint {
              transactionHash # if = null => not minted yet, so it's available
            }
            setInAllowList # define if is in allowlist
            
          }
        }
      }
    }`);

    const response = await fetch(path,{
        cache: 'force-cache'
    });
    return response.json();
}
