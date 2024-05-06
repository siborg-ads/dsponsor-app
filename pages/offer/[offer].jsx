import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Meta from "../../components/Meta";
import Image from "next/image";
import { useContract, useContractWrite, useContractRead, useAddress } from "@thirdweb-dev/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Review_carousel from "../../components/carousel/review_carousel";
import Validated_refused_items from "../../components/collections/validated_refused_items";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { ethers } from "ethers";
import adminInstance from "../../utils/sdkProvider";
import OfferSkeleton from "../../components/skeleton/offerSkeleton";
import { GetAdOffer } from "../../data/services/TokenOffersService";
import { contractABI } from "../../data/services/contract";
import { user } from "@nextui-org/react";
import Form from "../../components/collections-wide/sidebar/collections/Form";
import { Divider } from "@nextui-org/react";
import "tippy.js/dist/tippy.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Validation from "../../components/offer-section/validation";


const Offer = () => {
  const router = useRouter();

  const offerId = router.query.offer;
  const userAddress = useAddress();
  const [copied, setCopied] = useState(false);
  const [offerData, setOfferData] = useState([]);
  const [royalties, setRoyalties] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { contract: DsponsorAdminContract } = useContract("0xE442802706F3603d58F34418Eac50C78C7B4E8b3", contractABI);
  const { mutateAsync, isLoadingreviewAdProposal } = useContractWrite(DsponsorAdminContract, "reviewAdProposals");
  const [urlFromChild, setUrlFromChild] = useState("");
  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const [isWordAlreadyTaken, setIsWordAlreadyTaken] = useState(false);

  useEffect(() => {
    if (offerId) {
      const fetchAdsOffers = async () => {
        const offer = await GetAdOffer(offerId);
        const destructuredIPFSResult = await fetchDataFromIPFS(offer.metadataURL);
        const combinedData = {
          ...offer,
          ...destructuredIPFSResult,
        };
        console.log(combinedData, "ici");
        setOfferData(combinedData);
        if (userAddress?.toLowerCase() === offer.initialCreator) {
          setIsOwner(true);
        }

        try {
          const currencyToken = adminInstance.chain.getCurrencyByAddress(offer?.nftContract.prices[0].currency);
          const formatPrice = offer.nftContract.prices[0].amount / 10 ** currencyToken.decimals;

          setPrice(formatPrice);
          setCurrency(currencyToken);
        } catch (e) {
          console.error("Error: Currency not found for address");
        }
      };

      fetchAdsOffers();
    }
  }, [offerId, router, successFullRefuseModal, userAddress]);

  useEffect(() => {
    if (offerData?.nftContract?.royaltyBps) setRoyalties(offerData?.nftContract?.royaltyBps / 100);
  }, [offerData]);

  const handleSubmit = async (submissionArgs) => {
    try {
      await mutateAsync({
        args: [submissionArgs],
      });
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
   for(const token of offerData.nftContract.tokens){
    if(token.mint === null)return;
      if(tokenData.toLowerCase() === token.mint.tokenData.toLowerCase()){
        setIsWordAlreadyTaken(true);
      }
   }
  };


  if (!offerData || offerData.length === 0) {
    return (
      <div>
        <OfferSkeleton />
      </div>
    );
  }

  const { description = "description not found", id = "1", image = ["/images/gradient_creative.jpg"], name = "DefaultName", nftContract = "N/A" } = offerData.offer ? offerData.offer : {};

  return (
    <>
      <Meta title={` || d>sponsor | Media sponsor Marketplace `} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
        <div className="container flex justify-center mb-6">
          <h1 className="text-jacarta-700 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">Offer </h1>
        </div>
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full flex justify-center">
              <button className=" w-full" onClick={() => setImageModal(true)} style={{ height: "450px" }}>
                {image && <Image width={585} height={726} src={image} alt="image" className="rounded-2xl cursor-pointer h-full object-contain w-full" />}
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex  items-center justify-center">
                  <Image width={582} height={722} src={image} alt="image" className="h-full object-cover w-full rounded-2xl" />
                </div>

                <button type="button" className="btn-close absolute top-6 right-6" onClick={() => setImageModal(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-6 w-6 fill-white">
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
                  <Link href={`/manageSpaces/${offerData?.initialCreator}`} className="text-accent mr-2 text-sm font-bold">
                    {offerData?.initialCreator}
                  </Link>
                  <span className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                    <Tippy content={<span>Verified Collection</span>}>
                      <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                        <use xlinkHref="/icons.svg#icon-right-sign"></use>
                      </svg>
                    </Tippy>
                  </span>
                </div>
              </div>

              <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">{name}</h1>

              <div className="mb-8 flex items-center flex-wrap gap-2 space-x-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Tippy content={<span>{currency?.symbol ? currency?.symbol : "N/A"}</span>}>
                    <span className="-ml-1">
                      <svg className="icon mr-1 h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                  </Tippy>
                  <span className="text-green text-sm font-medium tracking-tight">
                    {price} {currency?.symbol ? currency?.symbol : "N/A"}
                  </span>
                </div>

                {offerData.nftContract.allowList && (
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    {offerData.nftContract.maxSupply - offerData.nftContract.tokens.filter((item) => item.mint != null).length}/{offerData.nftContract.maxSupply} available
                  </span>
                )}
                <span className="text-jacarta-400 block text-sm dark:text-white">
                  Creator <strong>{royalties}% royalties</strong>
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{description}</p>

              {isOwner && (
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                  <div className=" sm:flex sm:flex-wrap">
                    <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                      This page allows you to oversee submitted ads, offering tools to either approve or reject them. Approve ads to make them live or reject those that don&apos;t meet your standards, streamlining the
                      content that reaches your audience while maintaining quality control on your platform.{" "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {!offerData.nftContract.allowList && (
        <div className="container flex flex-col justify-center mb-6">
          <Divider className="my-4" />
          <h2 className="text-jacarta-700 font-bold font-display mb-6 text-center text-3xl dark:text-white md:text-left">Search </h2>
          <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
            <div className=" sm:flex sm:flex-wrap">
              <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                You can check if a word is available for purchase by using the search bar. Simply type the word into the search bar and press enter to see if it is available. This feature allows you to quickly find out
                if the word you are interested in is free for acquisition.{" "}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Form offerId={offerId} onUrlChange={handleUrlChange} />
          </div>
          {urlFromChild && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
              <article className="relative">
                <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                  {isWordAlreadyTaken ? <span className="text-red  ">This word is already taken ❌</span> : <span className="text-green ">This word is available 🎉</span>}
                  <figure className="mt-2">
                    <Link href={urlFromChild}>{image && <Image src={image} alt="logo" height={230} width={230} className="rounded-[0.625rem] w-full lg:h-[230px] object-contain" loading="lazy" />}</Link>
                  </figure>
                  <div className="mt-4 flex items-center justify-between">
                    <Link href={urlFromChild} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px]">
                      <span className="font-display max-w-[150px] text-jacarta-700 hover:text-accent text-base dark:text-white ">{name}</span>
                    </Link>

                    <div className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                      <span className="text-green text-sm font-medium tracking-tight"> {tokenData}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      )}

      <Validation offer={offerData} offerId={offerId} isOwner={isOwner} handleSubmit={handleSubmit} successFullRefuseModal={successFullRefuseModal} />

      {isOwner && (
        <div className="container">
          <Divider className="my-4" />
          <h2 className="text-jacarta-700 font-bold font-display mb-6 text-center text-3xl dark:text-white ">Display </h2>
          <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8 mb-4">
            <span className="dark:text-jacarta-300 text-jacarta-400 text-sm ">
              You can integrate this offer on your website by using the following iframe code. Simply copy and paste the code into your website to display the offer.{" "}
            </span>
            <br />
            <div className="flex gap-4 w-full md:w-auto items-start mt-2 ">
              <pre
                style={{
                  backgroundColor: "#010101",
                  borderRadius: "5px",
                  fontFamily: "'Courier New', monospace",
                  padding: "10px",
                  overflowX: "auto",
                }}
              >
                <code> {`<iframe src="https://relayer.dsponsor.com/11155111/iframe/${offerId}?bgColor=0d102d" height="315" width="1000px" className={'h-screen w-full'} />`}</code>
              </pre>
              <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                <div className="js-copy-clipboard cursor-pointer">
                  <CopyToClipboard text={`https://relayer.dsponsor.com/11155111/iframe/${offerId}?bgColor=0d102d`} onCopy={() => setCopied(true)}>
                    <Image src="/images/copy.svg" alt="icon" width={20} height={20} className="mt-2 min-w-[20px] " />
                  </CopyToClipboard>
                </div>
              </Tippy>
            </div>
          </div>
          <iframe src={`https://relayer.dsponsor.com/11155111/iframe/${offerId}?bgColor=0d102d`} height="315" width="1000px" className={"h-screen w-full"} />
        </div>
      )}
      {/* <ItemsTabs /> */}
      {/* <div className="container mb-12">
        <ItemsTabs />
      </div> */}
    </>
  );
};

export default Offer;
