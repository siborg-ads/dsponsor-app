import OfferSkeleton from "@/components/ui/skeletons/OfferSkeleton";
import React, { useEffect, useState } from "react";
import { fetchToken } from "@/utils/graphql/fetchToken";
import { useChainContext } from "@/hooks/useChainContext";
import { useSearchParams } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import Meta from "@/components/Meta";
import {
  useAddress,
  useContractRead,
  useContract,
  useTokenDecimals,
  useBalance
} from "@thirdweb-dev/react";
import stringToUint256 from "@/utils/tokens/stringToUnit256";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import TokenImage from "@/components/features/token/TokenImage";
import TokenDetails from "@/components/features/token/TokenDetails";
import { formatUnits } from "ethers/lib/utils";
import Disable from "@/components/ui/misc/Disable";
import TokenEndedListing from "@/components/features/token/TokenEndedListing";
import Listing from "@/components/features/token/widgets/Listing";
import config from "@/config/config";
import { getCookie } from "cookies-next";

const metadata = {
  title: `Token || SiBorg Ads - The Web3 Monetization Solution`,
  keyword:
    "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",

  desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
};

export default function Token({ offerId, tokenId }) {
  const [accordionActiveTab, setAccordionActiveTab] = useState([]);
  const [isFetching, setIsFetching] = useState(null);

  const [offer, setOffer] = useState(null); // the offer object
  const [token, setToken] = useState(null); // the token object

  const [marketplaceListings, setMarketplaceListings] = useState(null); // all listings of the token
  const [latestListing, setLatestListing] = useState(null); // the latest listing of the token
  const [lister, setLister] = useState(false); // the address of the lister of the latest listing

  const [isLister, setIsLister] = useState(false); // whether the user is the lister of the token
  const [isTokenOwner, setIsTokenOwner] = useState(false); // whether the user is the owner of the token
  const [isOfferOwner, setIsOfferOwner] = useState(false); // whether the user is the owner of the offer
  const [isInitialOfferCreator, setIsInitialOfferCreator] = useState(false); // wether the user is the initial creator of the offer
  const [isListingDisabled, setIsListingDisabled] = useState(false); // whether the listing is disabled

  const [tokenMetadata, setTokenMetaData] = useState(null); // the metadata of the token
  const [tokenData, setTokenData] = useState(null); // the token data (ex: #testnet)
  const [isValidId, setIsValidId] = useState(false); // whether the token data is valid according to the token id

  const [tokenImage, setTokenImage] = useState(null); // the image of the token
  const [tokenName, setTokenName] = useState(null); // the name of the token
  const [tokenDescription, setTokenDescription] = useState(null); // the description of the token

  const [currencyAddress, setCurrencyAddress] = useState(null); // the address of the currency of the token

  const [creatorAmount, setCreatorAmount] = useState(null); // the amount sent to the creator
  const [protocolFeeAmount, setProtocolFeeAmount] = useState(null); // the protocol fees
  const [totalAmount, setTotalAmount] = useState(null); // the total amount
  const [listerAmount, setListerAmount] = useState(null); // the amount sent to the lister
  const [royaltiesAmount, setRoyaltiesAmount] = useState(null); // the royalties amount
  const [tokenPriceBN, setTokenPriceBN] = useState(null); // the price of the token (mint, direct or auction)
  const [tokenBuyoutPriceBN, setTokenBuyoutPriceBN] = useState(null); // buyout price in case of auction
  const [amountToApprove, setAmountToApprove] = useState(null); // the amount to approve
  const [bidsAmount, setBidsAmount] = useState(null); // the amount of the bids (entered by the user)
  const [isAllowanceGood, setIsAllowanceGood] = useState(false); // whether the allowance is good
  const [tokenEtherPriceRelayer, setTokenEtherPriceRelayer] = useState(null); // the token price in ether from the relayer
  const [tokenTotalEtherPrice, setTokenTotalEtherPrice] = useState(null); // the token price in ether
  const [amountInEthWithSlippage, setAmountInEthWithSlippage] = useState(null); // the amount in ether with slippage
  const [displayedUSDCPrice, setDisplayedUSDCPrice] = useState(null); // the displayed price in USDC

  const [isApproving, setIsApproving] = useState(false); // whether the user is approving
  const [isBidding, setIsBidding] = useState(false); // whether the user is bidding

  const [royalties, setRoyalties] = useState(null); // the royalties

  const [tokenStatus, setTokenStatus] = useState(null); // the status of the token (MINTABLE, MINTDISABLED, OFFERDISABLED, MINTED, DIRECT, AUCTION, COMPLETEDAUCTION, COMPLETEDDIRECT)
  const [isMintDisabled, setIsMintDisabled] = useState(false); // whether the mint is disabled for the token

  const [listingCreated, setListingCreated] = useState(false); // true when a new listing has been created
  const [bidded, setBidded] = useState(false); // true when the user has placed a bid

  const [showBidsModal, setShowBidsModal] = useState(false); // whether the bids modal is shown

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const searchParams = useSearchParams();
  const address = useAddress();
  const referralAddress = getCookie("_rid") ?? "";

  const { contract: dsponsorMarketplaceContract } = useContract(
    config[chainId]?.smartContracts?.DSPONSORMP?.address
  );
  const { contract: dsponsorNFTContract } = useContract(offer?.nftContract?.id);

  const { data: tokenBalance } = useBalance(currencyAddress);
  const { data: tokenOwner } = useContractRead(dsponsorNFTContract, "ownerOf", [
    tokenId?.toString()
  ]);

  const fetchOffersRef = React.useRef(false);
  const fetchOffers = React.useCallback(async () => {
    if (fetchOffersRef.current) return;
    fetchOffersRef.current = true;

    try {
      setIsFetching(true);
      const offers = await fetchToken(chainId, offerId, tokenId?.toString());

      const currentOffer = offers?.find((offer) => Number(offer?.id) === offerId);
      setOffer(currentOffer);

      const currentToken = currentOffer?.nftContract?.tokens?.find(
        (token) => !!token?.tokenId && BigInt(token?.tokenId) === tokenId
      );
      setToken(currentToken);

      setMarketplaceListings(currentToken?.marketplaceListings);

      const latestListing = currentToken?.marketplaceListings?.sort((a, b) => b?.id - a?.id)[0];
      setLatestListing(latestListing);

      const lister = latestListing?.lister?.toLowerCase();
      setLister(lister);

      const royalties = Number(currentOffer?.nftContract?.royalty?.bps) / 100;
      setRoyalties(royalties);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsFetching(false);
      fetchOffersRef.current = false;
    }
  }, [chainId, offerId, tokenId]);

  useEffect(() => {
    if (!!offerId && chainId && !!tokenId) {
      fetchOffers();
    }
  }, [fetchOffers, offerId, chainId, tokenId]);

  useEffect(() => {
    if (!tokenOwner || !marketplaceListings || !address) return;

    if (address?.toLowerCase() === lister && latestListing?.status === "CREATED") {
      setIsLister(true);
    }

    if (
      offer?.admins?.includes(address?.toLowerCase()) ||
      offer?.initialCreator?.toLowerCase() === address?.toLowerCase()
    ) {
      setIsOfferOwner(true);
    }

    if (tokenOwner?.toLowerCase() === address?.toLowerCase()) {
      setIsTokenOwner(true);
    }
  }, [tokenOwner, address, marketplaceListings, latestListing, offer, lister]);

  useEffect(() => {
    if (!tokenId || !offer) return;

    if (tokenId?.toString()?.length > 6) {
      let tokenData = searchParams.get("tokenData");
      setTokenData(tokenData);

      if (
        offer?.nftContract?.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === tokenId
        )?.mint?.tokenData?.length
      ) {
        tokenData = offer?.nftContract.tokens?.find(
          (token) => !!token?.tokenId && BigInt(token?.tokenId) === tokenId
        ).mint.tokenData;
        setTokenData(tokenData);
      }

      let isValidId = false;
      if (tokenData) {
        const stringToUnit = stringToUint256(tokenData);

        if (BigInt(stringToUnit) === tokenId) {
          isValidId = true;
        } else {
          isValidId = false;
        }
      }

      setIsValidId(isValidId);
    }
  }, [tokenId, tokenData, searchParams, offer]);

  useEffect(() => {
    let tokenMetadata = {};

    if (offer?.metadata?.offer?.token_metadata && isValidId) {
      tokenMetadata.description = offer?.metadata.offer?.token_metadata.description.replace(
        /{tokenData}/g,
        `${tokenData}`
      );
      tokenMetadata.image = offer?.metadata?.offer?.token_metadata?.image?.replace(
        /{tokenData}/g,
        `${tokenData}`
      );
      tokenMetadata.name = offer?.metadata?.offer?.token_metadata?.name?.replace(
        /{tokenData}/g,
        `${tokenData}`
      );
    }

    setTokenMetaData(tokenMetadata);
  }, [isValidId, offer, tokenData]);

  useEffect(() => {
    const fetchImage = async (image) => {
      // get url image instead of ipfs:// starting url
      if (image && image.startsWith("ipfs://")) {
        const storage = new ThirdwebStorage({ clientId: "6f375d41f2a33f1f08f6042a65d49ec9" });
        const ipfsUrl = await storage.resolveScheme(image);
        setTokenImage(ipfsUrl);
      } else {
        setTokenImage(image);
      }
    };

    let description = "Description not found";
    let image = "/images/gradient_creative.jpg";
    let name = "Unnamed Ad Space";

    if (offer?.metadata?.offer) {
      const embeddedTokenMetadata = offer?.metadata?.offer?.token_metadata;

      if (tokenMetadata && Object.keys(tokenMetadata)?.length > 0) {
        description = tokenMetadata?.description;
        image = tokenMetadata?.image;
        name = tokenMetadata?.name;
      } else if (embeddedTokenMetadata && Object.keys(embeddedTokenMetadata).length > 0) {
        description = embeddedTokenMetadata?.description;
        image = embeddedTokenMetadata?.image;
        name = embeddedTokenMetadata?.name;
      } else {
        description = offer?.metadata?.offer?.description;
        image = offer?.metadata?.offer?.image;
        name = offer?.metadata?.offer?.name;
      }
    }

    if (image) {
      fetchImage(image);
    } else {
      setTokenImage(null);
    }

    if (name) {
      setTokenName(name);
    }

    if (description) {
      setTokenDescription(description);
    }
  }, [offer, tokenMetadata]);

  useEffect(() => {
    if (token) {
      let currencyAddress = token?.nftContract?.prices[0]?.currency; // TODO: get the currency address from the token object

      if (currencyAddress) {
        setCurrencyAddress(currencyAddress);
      }

      if (token?.mint) {
        currencyAddress = token?.mint?.currency;
      }
    }
  }, [token]);

  const { contract: currencyContract } = useContract(
    currencyAddress ? currencyAddress : "",
    "token"
  );
  const { data: currencyDecimals } = useTokenDecimals(currencyContract);
  const { data: currencySymbol } = useContractRead(currencyContract, "symbol", []);

  useEffect(() => {
    if (offer?.nftContract?.prices?.length > 0) {
      const isMintDisabled = !offer?.nftContract?.prices?.[0]?.enabled;
      setIsMintDisabled(isMintDisabled);
    }

    const validTo = offer?.metadata?.offer?.valid_to;
    const disableCondition =
      offer?.disable === true ||
      new Date(validTo)?.getTime() < Date.now() ||
      (offer?.nftContract?.prices?.[0]?.enabled === false && token?.mint === null);

    setIsListingDisabled(disableCondition);
  }, [offer]);

  useEffect(() => {
    if (!offer || !tokenId) return;

    if (offer?.disable) {
      setTokenStatus("OFFERDISABLED");
    } else if (token?.mint === null && token?.nftContract?.prices?.[0].enabled) {
      setTokenStatus("MINTABLE");
    } else if (token?.mint === null && !token?.nftContract?.prices?.[0].enabled) {
      setTokenStatus("MINTDISABLED");
    } else if (token?.mint !== null && latestListing?.length === 0) {
      setTokenStatus("MINTED");
    } else if (latestListing?.status === "CREATED") {
      if (latestListing?.listingType === "Direct") {
        setTokenStatus("DIRECT");
      } else if (latestListing?.listingType === "Auction") {
        setTokenStatus("AUCTION");
      }
    } else if (latestListing?.status === "COMPLETED") {
      if (latestListing?.listingType === "Direct") {
        setTokenStatus("COMPLETEDDIRECT");
      } else if (latestListing?.listingType === "Auction") {
        setTokenStatus("COMPLETEDAUCTION");
      }
    }
  }, [latestListing, offer, token, tokenId]);

  useEffect(() => {
    if (tokenStatus && offer && token) {
      let currencyAddress;
      let creatorAmount;
      let protocolFeeAmount;
      let totalAmount;
      let listerAmount;
      let royaltiesAmount;

      if (
        tokenStatus === "MINTABLE" ||
        tokenStatus === "MINTDISABLED" ||
        tokenStatus === "MINTED"
      ) {
        if (offer?.nftContract?.prices?.[0]?.currency) {
          currencyAddress = offer?.nftContract?.prices?.[0]?.currency;
          const creatorAmountBNString =
            offer?.nftContract?.prices?.[0]?.mintPriceStructure?.creatorAmount;
          const protocolFeeAmountBNString =
            offer?.nftContract?.prices?.[0]?.mintPriceStructure?.protocolFeeAmount;
          const totalAmountBNString =
            offer?.nftContract?.prices?.[0]?.mintPriceStructure?.totalAmount;
          const tokenPriceBN = BigInt(
            offer?.nftContract?.prices?.[0]?.mintPriceStructure?.totalAmount
          );

          if (currencyDecimals) {
            creatorAmount = parseFloat(formatUnits(creatorAmountBNString, currencyDecimals));
            protocolFeeAmount = parseFloat(
              formatUnits(protocolFeeAmountBNString, currencyDecimals)
            );
            totalAmount = parseFloat(formatUnits(totalAmountBNString, currencyDecimals));
          }

          setTokenPriceBN(tokenPriceBN);
        }
      }

      if (tokenStatus === "DIRECT") {
        currencyAddress = latestListing?.currency;
        const listerAmountBNString = latestListing?.buyPriceStructure?.listerBuyAmount;
        const royaltiesAmountBNString = latestListing?.buyPriceStructure?.royaltiesBuyAmount;
        const protocolFeeAmountBNString = latestListing?.buyPriceStructure?.protocolFeeBuyAmount;
        const totalAmountBNString = latestListing?.buyPriceStructure?.buyoutPricePerToken;
        const tokenPriceBN = BigInt(latestListing?.buyPriceStructure?.buyoutPricePerToken);

        if (currencyDecimals) {
          listerAmount = parseFloat(formatUnits(listerAmountBNString, currencyDecimals));
          royaltiesAmount = parseFloat(formatUnits(royaltiesAmountBNString, currencyDecimals));
          protocolFeeAmount = parseFloat(formatUnits(protocolFeeAmountBNString, currencyDecimals));
          totalAmount = parseFloat(formatUnits(totalAmountBNString, currencyDecimals));
        }

        setTokenPriceBN(tokenPriceBN);
      }

      if (tokenStatus === "AUCTION") {
        currencyAddress = latestListing?.currency;
        const listerAmountBNString = latestListing?.bidPriceStructure?.listerAmount;
        const royaltiesAmountBNString = latestListing?.bidPriceStructure?.royaltyAmount;
        const protocolFeeAmountBNString = latestListing?.bidPriceStructure?.protocolFeeAmount;
        const totalAmountBNString = latestListing?.bidPriceStructure?.totalBidAmount;
        const tokenPriceBN = BigInt(latestListing?.bidPriceStructure?.minimalBidPerToken);
        console.log(latestListing);
        const buyoutPricePerTokenBN = BigInt(
          latestListing?.bidPriceStructure?.minimalBuyoutPerToken
        );

        if (currencyDecimals) {
          listerAmount = parseFloat(formatUnits(listerAmountBNString, currencyDecimals));
          royaltiesAmount = parseFloat(formatUnits(royaltiesAmountBNString, currencyDecimals));
          protocolFeeAmount = parseFloat(formatUnits(protocolFeeAmountBNString, currencyDecimals));
          totalAmount = parseFloat(formatUnits(totalAmountBNString, currencyDecimals));
        }

        setTokenPriceBN(tokenPriceBN);
        setTokenBuyoutPriceBN(buyoutPricePerTokenBN);
      }

      setCurrencyAddress(currencyAddress);
      setCreatorAmount(creatorAmount);
      setProtocolFeeAmount(protocolFeeAmount);
      setTotalAmount(totalAmount);
      setListerAmount(listerAmount);
      setRoyaltiesAmount(royaltiesAmount);
    }
  }, [tokenStatus, offer, token, currencyDecimals, latestListing]);

  const [debouncedBidsAmount, setDebouncedBidsAmount] = useState(bidsAmount);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBidsAmount(bidsAmount);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [bidsAmount]);

  useEffect(() => {
    const fetchBuyEtherPrice = async () => {
      try {
        let amount = 0;
        if (currencyDecimals && debouncedBidsAmount) {
          amount = ethers.utils.parseUnits(debouncedBidsAmount, Number(currencyDecimals));
        }

        const tokenEtherPrice = await fetch(
          `https://relayer.dsponsor.com/api/${chainId}/prices?token=${currencyAddress}&amount=${amount?.toString()}&slippage=0.3`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          });

        setTokenEtherPriceRelayer(tokenEtherPrice);
      } catch (error) {
        console.error(error);
      }
    };

    if (chainId && currencyAddress && currencyDecimals && debouncedBidsAmount) {
      fetchBuyEtherPrice();
    }
  }, [chainId, currencyDecimals, currencyAddress, debouncedBidsAmount]);

  useEffect(() => {
    if (tokenEtherPriceRelayer) {
      const tokenEtherPriceDecimals = formatUnits(
        tokenEtherPriceRelayer?.amountInEthWithSlippage,
        18
      );
      const amountInEthWithSlippageBN = ethers.BigNumber.from(
        tokenEtherPriceRelayer?.amountInEthWithSlippage
      );

      setBuyTokenEtherPrice(tokenEtherPriceDecimals);
      setAmountInEthWithSlippage(amountInEthWithSlippageBN);
      setTokenEtherPrice(ethers.utils.formatUnits(amountInEthWithSlippageBN, 18));
    }

    if (bidsAmount && currencyDecimals && tokenEtherPriceRelayer) {
      const amountUSDC = tokenEtherPriceRelayer?.amountUSDC;

      const usdcPriceToDisplay = formatUnits(amountUSDC, 6);

      setDisplayedUSDCPrice(formatAndRoundPrice(usdcPriceToDisplay));
    } else {
      setDisplayedUSDCPrice(0);
    }
  }, [bidsAmount, currencyDecimals, tokenEtherPriceRelayer]);

  const handleApproveMarketplace = async () => {
    try {
      setIsApproving(true);

      const amountToApproveBN = parseUnits(amountToApprove, currencyDecimals);

      if (marketplaceListings?.length > 0 && tokenStatus === "DIRECT") {
        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORMP?.address, amountToApproveBN]
        });
      } else if (marketplaceListings?.length > 0 && tokenStatus === "AUCTION") {
        const precision = bidsAmount.split(".")[1]?.length || 0;
        const bidsAmountBN = parseUnits(
          Number(bidsAmount).toFixed(Math.min(Number(currencyDecimals), precision)),
          Number(currencyDecimals)
        );

        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORMP?.address, bidsAmountBN.toString()]
        });
      } else {
        await approve({
          args: [config[chainId]?.smartContracts?.DSPONSORADMIN?.address, amountToApproveBN]
        });
      }
      setAllowanceTrue(false);
    } catch (error) {
      setIsApproving(false);
      console.error(error);
      console.error("Approval failed:", error.message);
      throw new Error("Approval failed.");
    } finally {
      setIsApproving(false);
    }
  };

  if (isFetching) {
    return <OfferSkeleton />;
  }

  return (
    <Accordion.Root
      type="multiple"
      value={accordionActiveTab}
      onValueChange={setAccordionActiveTab}
    >
      <Meta {...metadata} />

      <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
        <div className="mb-8 container flex justify-center flex-col items-center ">
          <div className=" flex justify-center ">
            <h1 className="text-jacarta-900 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">
              {isTokenOwner && isValidId ? "Your Ad Space" : "Buy Ad Space"}{" "}
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="md:flex md:flex-wrap">
            <TokenImage tokenImage={tokenImage} />

            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              <TokenDetails
                chainId={chainId}
                offerId={offerId}
                marketplaceListings={marketplaceListings}
                latestListing={latestListing}
                token={token}
                tokenId={tokenId}
                royalties={royalties}
                tokenName={tokenName}
                tokenDescription={tokenDescription}
                currencySymbol={currencySymbol}
                creatorAmount={creatorAmount}
                protocolFeeAmount={protocolFeeAmount}
                totalAmount={totalAmount}
                listerAmount={listerAmount}
                royaltiesAmount={royaltiesAmount}
                tokenPriceBN={tokenPriceBN}
                tokenStatus={tokenStatus}
                isMintDisabled={isMintDisabled}
                currencyDecimals={currencyDecimals}
              />

              <Disable isOffer={false} offer={offer} isDisabled={isListingDisabled} />

              <TokenEndedListing latestListing={latestListing} tokenStatus={tokenStatus} />

              <Listing
                isListingDisabled={isListingDisabled}
                latestListing={latestListing}
                tokenStatus={tokenStatus}
                isInitialOfferCreator={isInitialOfferCreator}
                listingCreated={listingCreated}
                setListingCreated={setListingCreated}
                dsponsorNFTContract={dsponsorNFTContract}
                offer={offer}
                royalties={royalties}
                dsponsorMarketplaceContract={dsponsorMarketplaceContract}
                tokenId={tokenId}
                isTokenOwner={isTokenOwner}
                isLister={isLister}
                fetchOffers={fetchOffers}
                marketplaceListings={marketplaceListings}
                setAmountToApprove={setAmountToApprove}
                bidsAmount={bidsAmount}
                setBidsAmount={setBidsAmount}
                chainId={chainId}
                handleApproveMarketplace={handleApproveMarketplace}
                currencySymbol={currencySymbol}
                tokenBalance={tokenBalance}
                currencyDecimals={currencyDecimals}
                bidded={bidded}
                setBidded={setBidded}
                address={address}
                isApproving={isApproving}
                setIsApproving={setIsApproving}
                token={token}
                isValidId={isValidId}
                tokenOwner={tokenOwner}
                referralAddress={referralAddress}
                currencyAddress={currencyAddress}
                tokenTotalEtherPrice={tokenTotalEtherPrice}
                amountInEthWithSlippage={amountInEthWithSlippage}
                displayedUSDCPrice={displayedUSDCPrice}
                setDisplayedUSDCPrice={setDisplayedUSDCPrice}
                showBidsModal={showBidsModal}
                setShowBidsModal={setShowBidsModal}
              />
            </div>
          </div>
        </div>
      </section>
    </Accordion.Root>
  );
}
