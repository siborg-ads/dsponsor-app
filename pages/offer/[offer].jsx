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
import { ItemsTabs } from "../../components/component";
import Review_carousel from "../../components/carousel/review_carousel";
import Validated_refused_items from "../../components/collectrions/validated_refused_items";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";
import { ethers } from "ethers";
import { bufferAdParams } from "../../utils/formatedData";

const Offer = () => {
  const router = useRouter();

  const offerId = router.query.offer;
  const userAddress = useAddress();

  const [offerData, setOfferData] = useState([]);
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [validatedProposalData, setValidatedProposalData] = useState([]);
  const [refusedProposalData, setRefusedProposalData] = useState([]);
  const [royalties, setRoyalties] = useState(null);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
const [currency, setCurrency] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const { contract: DsponsorNFTContract } = useContract(offerData[0]?.nftContract);
  const { contract: DsponsorAdminContract } = useContract("0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09");
  const { data: royaltiesInfo } = useContractRead(DsponsorNFTContract, "royaltyInfo", ["0", 100]);

  const { mutateAsync, isLoadingreviewAdProposal } = useContractWrite(DsponsorAdminContract, "reviewAdProposals");

  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);

  useEffect(() => {
    if (offerId) {
      const admin = new DSponsorAdmin({ chain: { alchemyAPIKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, chainName: "ethereum-sepolia" } });
      const fetchAdsOffers = async () => {
        const ads = await admin.getPendingAds({ offerId: offerId });
        console.log(ads, "ads");
        const formattedPendingAds = [];

       
        for (let i = 0; i < ads.length; i += 2) {
          
          if (i + 1 < ads.length) {
        formattedPendingAds.push({
            groupKey: `${ads[i].proposalId}-${ads[i+1].proposalId}`,
            ads: [ads[i], ads[i+1]]
        });
        }
      }
        console.log(formattedPendingAds, "formattedPendingAds");
        const offer = await admin.getOffer({ offerId: offerId });
        const validatedAds = await admin.getValidatedAds({ offerId: offerId });
        const refusedAds = await admin.getRejectedAds({ offerId: offerId });
        const proposals = await admin.getAdProposals({ offerId: offerId });
        console.log(validatedAds, "proposals");
       const params = await admin.getAdParameters({ offerId: offerId });
        // const normalizedParams = bufferAdParams(params);
       
       
        const destructuredIPFSResult = await fetchDataFromIPFS(offer.offerMetadata);
        const combinedData = {
          ...offer,
          ...destructuredIPFSResult,
        };
        
        try {
          const currencyToken = admin.chain.getCurrencyByAddress(offer.currencies[0]);
          const formatPrice = offer.prices[0] / 10 ** currencyToken.decimals;
          setPrice(formatPrice);
          setCurrency(currencyToken);
        } catch (e) {
          console.error("Error: Currency not found for address");
        }
       
        setOfferData([combinedData]);
        setValidatedProposalData(validatedAds);
        setRefusedProposalData(refusedAds);
        setPendingProposalData(formattedPendingAds);
      };

      fetchAdsOffers();
    }
  }, [offerId, router]);
  useEffect(() => {
    if (royaltiesInfo) setRoyalties(ethers.BigNumber.from(royaltiesInfo[1]?._hex).toNumber());
    
  }, [royaltiesInfo]);

  const handleSubmit = async (submissionArgs) => {
    try {
      await mutateAsync({
        args: [submissionArgs],
      });
      setSuccessFullRefuseModal(true);
    } catch (error) {
      console.error("Erreur de validation du token:", error);
      setSuccessFullUpload(false);
    }
  };

  const [itemActive, setItemActive] = useState(1);
  const tabItem = [
    {
      id: 1,
      text: "Pending",
      icon: "owned",
    },
    {
      id: 2,
      text: "Validated",
      icon: "owned",
    },

    {
      id: 3,
      text: "Refused",
      icon: "activity",
    },
  ];

  if (!offerData || offerData.length === 0) {
    return <div>Chargement...</div>;
  }
 
   const { description = "description not found", id = "1", image = ["/images/gradient_creative.jpg"], name = "DefaultName", nftContract = "N/A" } = offerData[0].offer ? offerData[0].offer : {};

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
                <Image width={585} height={726} src={image[0]} alt="image" className="rounded-2xl cursor-pointer h-full object-contain w-full" />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                  <Image width={582} height={722} src={image[0]} alt="image" className="h-full object-cover w-full rounded-2xl" />
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
                  <Link href="#" className="text-accent mr-2 text-sm font-bold">
                    0X000000000000215
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

                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  {offerData[0].allowedTokens.length - validatedProposalData.length - refusedProposalData.length - pendingProposalData.length}/{offerData[0].allowedTokens.length} available
                </span>
                <span className="text-jacarta-400 block text-sm dark:text-white">
                  Creator <strong>{royalties}% royalties</strong>
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{description}</p>

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                <div className=" sm:flex sm:flex-wrap">
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    This page allows you to oversee submitted ads, offering tools to either approve or reject them. Approve ads to make them live or reject those that don&apos;t meet your standards, streamlining the
                    content that reaches your audience while maintaining quality control on your platform.{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {userAddress === collaborators[0] && ( */}
      {userAddress && (
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab className="nav-item" role="presentation" key={id} onClick={() => setItemActive(id)}>
                    <button
                      className={
                        itemActive === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="font-display text-base font-medium">{text}</span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div className="container mb-12 relative p-0">
                {/* <!-- Filter --> */}
                <Review_carousel handleSubmit={handleSubmit} pendingProposalData={pendingProposalData} successFullRefuseModal={successFullRefuseModal} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container mb-12 relative p-0">
                {/* <!-- Filter --> */}
                <Validated_refused_items statut={true} proposalData={validatedProposalData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container mb-12 relative p-0">
                {/* <!-- Filter --> */}
                <Validated_refused_items statut={false} proposalData={refusedProposalData} />
              </div>
            </TabPanel>
          </Tabs>
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
