import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tippy.js/dist/tippy.css";

import Meta from "../../components/Meta";
import { ethers } from "ethers";
import Image from "next/image";
import { useContract, useContractWrite, useContractRead, useAddress } from "@thirdweb-dev/react";
import Tippy from "@tippyjs/react";
import handleCopy from "../../utils/handleCopy";
import "tippy.js/dist/tippy.css";

import OfferSkeleton from "../../components/skeleton/offerSkeleton";

import Form from "../../components/collections-wide/sidebar/collections/Form";
import { Divider } from "@nextui-org/react";
import "tippy.js/dist/tippy.css";
import Validation from "../../components/offer-section/validation";
import ModalHelper from "../../components/Helper/modalHelper";
import { ItemsTabs } from "../../components/component";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { fetchOffer } from "../../providers/methods/fetchOffer";
import config from "../../providers/utils/config";
import { useSwitchChainContext } from "../../contexts/hooks/useSwitchChainContext";
import {activated_features} from "../../data/activated_features";

const OfferPageContainer = () => {
  const router = useRouter();

  const offerId = router.query?.offerId;
  const chainId = router.query?.chainName;
  const userAddress = useAddress();
  const [refusedValidatedAdModal, setRefusedValidatedAdModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [offerData, setOfferData] = useState([]);
  const [royalties, setRoyalties] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [price, setPrice] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { contract: DsponsorAdminContract } = useContract(
    config[chainId]?.smartContracts?.DSPONSORADMIN?.address,
    config[chainId]?.smartContracts?.DSPONSORADMIN?.abi
  );
  const { mutateAsync, isLoadingreviewAdProposal } = useContractWrite(
    DsponsorAdminContract,
    "reviewAdProposals"
  );
  const [urlFromChild, setUrlFromChild] = useState("");
  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const [isWordAlreadyTaken, setIsWordAlreadyTaken] = useState(false);
  const { contract: tokenContract } = useContract(
    offerData?.nftContract?.prices[0]?.currency,
    "token"
  );
  const { data: symbolContract } = useContractRead(tokenContract, "symbol");
  const { data: decimalsContract } = useContractRead(tokenContract, "decimals");
  const NATIVECurrency = config[chainId]?.smartContracts?.NATIVE;
  const { setSelectedChain } = useSwitchChainContext();

  const { data: bps } = useContractRead(DsponsorAdminContract, "feeBps");
  const maxBps = 10000;

  let tokenCurrencyAddress = offerData?.nftContract?.prices[0]?.currency;

  useEffect(() => {
    if (offerId && chainId) {
      const fetchAdsOffers = async () => {
        const offer = await fetchOffer(offerId, chainId);

        console.log("combinedData", offer);
        setOfferData(offer);
        if (userAddress?.toLowerCase() === offer?.initialCreator) {
          setIsOwner(true);
        }
      };
      setSelectedChain(config[chainId]?.chainNameProvider);
      fetchAdsOffers();
    }
  }, [offerId, successFullRefuseModal, userAddress, chainId, setSelectedChain]);

  useEffect(() => {
    if (!offerData) return;
    try {
      const currencyTokenObject = {};
      if (
        !decimalsContract &&
        !symbolContract &&
        tokenCurrencyAddress === "0x0000000000000000000000000000000000000000"
      ) {
        currencyTokenObject.symbol = NATIVECurrency.symbol;
        currencyTokenObject.decimals = NATIVECurrency.decimals;
      } else {
        currencyTokenObject.symbol = symbolContract;
        currencyTokenObject.decimals = decimalsContract;
      }

      const bigIntPrice =
        (BigInt(offerData?.nftContract?.prices[0]?.amount) * (BigInt(bps) + BigInt(maxBps))) /
        BigInt(maxBps);
      const formatPrice = ethers.utils.formatUnits(bigIntPrice, currencyTokenObject.decimals);

      setPrice(Number(Math.ceil(formatPrice * 1000) / 1000));
      setCurrency(currencyTokenObject);
    } catch (e) {
      console.error("Error: Currency not found for address", offerData?.nftContract?.prices[0], e);
    }
  }, [symbolContract, decimalsContract, offerData, bps]);

  useEffect(() => {
    if (offerData?.nftContract?.royaltyBps) setRoyalties(offerData?.nftContract?.royaltyBps / 100);
  }, [offerData]);

  const handleSubmit = async (submissionArgs) => {
    try {
      await mutateAsync({
        args: [submissionArgs]
      });
      setRefusedValidatedAdModal(true);
      setSuccessFullRefuseModal(true);
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      setSuccessFullRefuseModal(false);
      throw error;
    }
  };
  const handleUrlChange = (newUrl, tokenData) => {
    setIsWordAlreadyTaken(false);
    setUrlFromChild(newUrl);
    setTokenData(tokenData);
    for (const token of offerData.nftContract.tokens) {
      if (token.mint === null) return;
      if (tokenData?.toLowerCase() === token.mint.tokenData?.toLowerCase()) {
        setIsWordAlreadyTaken(true);
      }
    }
  };
  const metadata = {
    title: `Offer || SiBorg Ads | Smarter monetization for your content`,
    keyword:
      "audience engagement, web3, creator economic, NFT, creator monetization, creator economy, creator token, creator coin, creator tokenization, creator economy",

    desc: "Explore the future of media monetization. SiBorg Ads decentralized platform offers tokenized advertising spaces for dynamic and sustainable media funding."
  };
  if (!offerData || offerData.length === 0) {
    return (
      <div>
        <OfferSkeleton />
      </div>
    );
  }
  const modalHelper = {
    title: "Protocol Fees",
    body: `The protocol fees (4%) are used to maintain the platform and the services provided. The fees are calculated based on the price of the ad space and are automatically deducted from the total amount paid by the buyer.`
  };
  const {
    description = "description not found",
    id = "1",
    image = ["/images/gradient_creative.jpg"],
    name = "DefaultName",
    nftContract = "N/A"
  } = offerData.metadata.offer ? offerData.metadata.offer : {};

  return (
    <>
      <Meta {...metadata} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
        <div className="container flex justify-center mb-6">
          <h1 className="text-jacarta-900 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">
            Offer{" "}
          </h1>
        </div>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            width={1519}
            height={773}
            priority
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full flex justify-center">
              <button
                className=" w-full"
                onClick={() => setImageModal(true)}
                style={{ height: "450px" }}
              >
                {image && (
                  <Image
                    width={585}
                    height={726}
                    src={image}
                    alt="image"
                    className="rounded-2xl cursor-pointer h-full object-contain w-full"
                  />
                )}
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex  items-center justify-center">
                  <Image
                    width={582}
                    height={722}
                    src={image}
                    alt="image"
                    className="h-full object-cover w-full rounded-2xl"
                  />
                </div>

                <button
                  type="button"
                  className="btn-close absolute top-6 right-6"
                  onClick={() => setImageModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-6 w-6 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>
              {/* <!-- end modal --> */}
            </figure>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              {/* <!-- Collection / Likes / Actions --> */}
              <div className="mb-3 flex">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link
                    href={`/manage/${offerData?.initialCreator}`}
                    className="text-primaryPurple mr-2 text-sm font-bold"
                  >
                    {offerData?.initialCreator}
                  </Link>
                </div>
              </div>

              <h2 className="font-display text-jacarta-900 mb-4 text-3xl font-semibold dark:text-white">
                {name}
              </h2>

              <div className="mb-8 flex items-center flex-wrap gap-2 space-x-4 whitespace-nowrap">
                {currency?.symbol && (
                  <div className="flex items-center">
                    <span className="text-green text-sm font-medium tracking-tight mr-2">
                      {price} {currency?.symbol}
                    </span>
                    <ModalHelper {...modalHelper} size="small" />
                  </div>
                )}

                {offerData.nftContract.allowList && (
                  <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                    {offerData.nftContract.maxSupply -
                      offerData.nftContract.tokens.filter((item) => item.mint != null).length}
                    /{offerData.nftContract.maxSupply} available
                  </span>
                )}
                <span className="text-jacarta-100 block text-sm dark:text-white">
                  Creator <strong>{royalties}% royalties</strong>
                </span>
              </div>

              <p className="dark:text-jacarta-100 mb-10">{description}</p>

              {isOwner && (
                <div className="dark:bg-secondaryBlack dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                  <div className=" sm:flex sm:flex-wrap">
                    <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                      This page allows you to oversee submitted ads, offering tools to either
                      approve or reject them. Approve ads to make them live or reject those that
                      don&apos;t meet your standards, streamlining the content that reaches your
                      audience while maintaining quality control on your platform.{" "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="container mb-12">
        <Divider className="my-4" />
        <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
          Details{" "}
        </h2>
        <ItemsTabs
          contractAddress={offerData?.nftContract.id}
          offerId={offerId}
          initialCreator={offerData?.initialCreator}
          isToken={false}
        />
      </div>
      {!offerData.nftContract.allowList && (
        <div className="container flex flex-col justify-center mb-6">
          <Divider className="my-4" />
          <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white md:text-center">
            Search{" "}
          </h2>
          <div className="dark:bg-secondaryBlack dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
            <div className=" sm:flex sm:flex-wrap">
              <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                You can check if a word is available for purchase by using the search bar. Simply
                type the word into the search bar and press enter to see if it is available. This
                feature allows you to quickly find out if the word you are interested in is free for
                acquisition.{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Form offerId={offerId} onUrlChange={handleUrlChange} />
          </div>
          {urlFromChild && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
              <article className="relative">
                <div className="dark:bg-secondaryBlack dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100">
                  {isWordAlreadyTaken ? (
                    <span className="text-red  ">This word is already taken ❌</span>
                  ) : (
                    <span className="text-green ">This word is available 🎉</span>
                  )}
                  <figure className="mt-2">
                    <Link href={urlFromChild}>
                      {image && (
                        <Image
                          src={image}
                          alt="logo"
                          height={230}
                          width={230}
                          className="rounded-[0.625rem] w-full lg:h-[230px] object-contain"
                          loading="lazy"
                        />
                      )}
                    </Link>
                  </figure>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <Tippy content={<span className="p-2">{name}</span>}>
                      <Link
                        href={urlFromChild}
                        className="overflow-hidden text-ellipsis whitespace-nowrap min-w-[120px]"
                      >
                        <span className="font-display  text-jacarta-900 hover:text-primaryPurple text-base dark:text-white ">
                          {name}
                        </span>
                      </Link>
                    </Tippy>

                    <Tippy content={<span className="p-2">{tokenData}</span>}>
                      <div className="dark:border-jacarta-600 border-jacarta-100 max-w-[100px] overflow-hidden text-ellipsis flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                        <span className="text-green text-sm font-medium tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                          {" "}
                          {tokenData}
                        </span>
                      </div>
                    </Tippy>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      )}

      {(activated_features.canSeeSubmittedAds && (
          <Validation
              chainId={chainId}
              setSuccessFullRefuseModal={setSuccessFullRefuseModal}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              offer={offerData}
              offerId={offerId}
              isOwner={isOwner}
              handleSubmit={handleSubmit}
              successFullRefuseModal={successFullRefuseModal}
              setRefusedValidatedAdModal={setRefusedValidatedAdModal}
              refusedValidatedAdModal={refusedValidatedAdModal}
          />
      ))}


      {isOwner && activated_features.canSeeIntegrationDetails && (
        <div className="container">
          <Divider className="my-4" />
          <h2 className="text-jacarta-900 font-bold font-display mb-6 text-center text-3xl dark:text-white ">
            Display{" "}
          </h2>
          <div className="dark:bg-secondaryBlack dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8 mb-4">
            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm ">
              You can integrate this offer on your website by using the following iframe code.
              Simply copy and paste the code into your website to display the offer.{" "}
            </span>
            <br />

            <div className="flex gap-4 w-full md:w-auto items-start mt-2 ">
              <pre
                style={{
                  backgroundColor: "#010101",
                  borderRadius: "5px",
                  fontFamily: "'Courier New', monospace",
                  padding: "10px",
                  overflowX: "auto"
                }}
              >
                <code>
                  {" "}
                  {`<iframe src="https://relayer.dsponsor.com/${chainId}/integrations/${offerId}/ClickableLogosGrid/iFrame" height="315" width="1000px" className={'h-screen w-full'} />`}
                </code>
              </pre>
              <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                <div className=" cursor-pointer">
                  <button
                    text={`<iframe src="https://relayer.dsponsor.com/${chainId}/integrations/${offerId}/ClickableLogosGrid/iFrame" height="315" width="1000px" className={'h-screen w-full'} />`}
                    onClick={() =>
                      handleCopy(
                        `<iframe
                      src="https://relayer.dsponsor.com/${chainId}/integrations/${offerId}/ClickableLogosGrid/iFrame"
                      height="315"
                      width="1000px"
                      className={"h-screen w-full"}
                    />`,
                        setCopied
                      )
                    }
                  >
                    <Image
                      src="/images/copy.svg"
                      alt="icon"
                      width={20}
                      height={20}
                      className="mt-2 min-w-[20px] "
                    />
                  </button>
                </div>
              </Tippy>
            </div>
          </div>
          <iframe
            loading="lazy"
            src={`https://relayer.dsponsor.com/${chainId}/integrations/${offerId}/ClickableLogosGrid/iFrame`}
            height="315"
            width="1000px"
            className={"h-screen w-full"}
          />
        </div>
      )}
      {/* <ItemsTabs /> */}
      {/* <div className="container mb-12">
        <ItemsTabs />
      </div> */}
    </>
  );
};

export default OfferPageContainer;
