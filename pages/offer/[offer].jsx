import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Meta from "../../components/Meta";
import Image from "next/image";
import { useContract, useContractWrite, useAddress } from "@thirdweb-dev/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ItemsTabs } from "../../components/component";
import Review_carousel from "../../components/carousel/review_carousel";
import Validated_refused_items from "../../components/collectrions/validated_refused_items";
import { DSponsorAdmin } from "@dsponsor/sdk";
import { fetchDataFromIPFS } from "../../data/services/ipfsService";

const Offer = () => {
  const router = useRouter();

  const offerId = router.query.offer;
  const userAddress = useAddress();

  const [offerData, setOfferData] = useState([]);
  const [pendingProposalData, setPendingProposalData] = useState([]);
  const [validatedProposalData, setValidatedProposalData] = useState([]);
  const [refusedProposalData, setRefusedProposalData] = useState([]);

  const [imageModal, setImageModal] = useState(false);

  const { contract: DsponsorAdminContract } = useContract("0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3");

  const { mutateAsync, isLoadingreviewAdProposal } = useContractWrite(DsponsorAdminContract, "reviewAdProposal");

  const [successFullRefuseModal, setSuccessFullRefuseModal] = useState(false);

  useEffect(() => {
    if (offerId) {
      const admin = new DSponsorAdmin();
      const fetchAdsOffers = async () => {
        const ads = await admin.getPendingAds({ offerId: offerId });
        const offer = await admin.getOffer({ offerId: offerId });
        const validatedAds = await admin.getValidatedAds({ offerId: offerId });
        const refusedAds = await admin.getRejectedAds({ offerId: offerId });
        console.log("ads", refusedAds);
        const destructuredIPFSResult = await fetchDataFromIPFS(offer.rulesURI);
        const combinedData = {
          ...offer,
          ...destructuredIPFSResult,
        };
        setOfferData([combinedData]);
        setValidatedProposalData(validatedAds);
        setRefusedProposalData(refusedAds);
        setPendingProposalData(ads);
      };

      fetchAdsOffers();
    }
  }, [offerId, router]);

  const handleSubmit = async (submissionArgs) => {
    try {
      const { offerId, tokenId, proposalId, adParameter, validated, reason } = submissionArgs;
      await mutateAsync({
        args: [offerId, tokenId, proposalId, adParameter, validated, reason],
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

  const { currencyName, description, collaborators, id, image, maxSupply, name, allowedTokens, price, royalties } = offerData[0];

  return (
    <>
      <Meta title={` || d>sponsor | Media sponsor Marketplace `} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-12  mt-24 pt-12 pb-8">
        <div className="container flex justify-center mb-6">
          <h1 class="text-jacarta-700 font-bold font-display mb-6 text-center text-5xl dark:text-white md:text-left lg:text-6xl xl:text-6xl">Offer </h1>
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
                    {collaborators[0]}
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

              <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Tippy content={<span>{currencyName}</span>}>
                    <span className="-ml-1">
                      <svg className="icon mr-1 h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                  </Tippy>
                  <span className="text-green text-sm font-medium tracking-tight">
                    {price} {currencyName}
                  </span>
                </div>

                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                  {allowedTokens.length}/{maxSupply} available
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{description}</p>

              {/* <!-- Creator / Owner --> */}
              <div className="mb-8 flex flex-wrap">
                <div className="mr-8 mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href="/user/avatar_6" className="relative block">
                      <Image width={48} height={48} src={image[0]} alt={name} className="rounded-2lg h-12 w-12 object-contain" loading="lazy" />
                      <div className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                        <Tippy content={<span>Verified Collection</span>}>
                          <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                            <use xlinkHref="/icons.svg#icon-right-sign"></use>
                          </svg>
                        </Tippy>
                      </div>
                    </Link>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-jacarta-400 block text-sm dark:text-white">
                      Creator <strong>{royalties}% royalties</strong>
                    </span>
                    <Link href="/user/avatar_6" className="text-accent block">
                      <span className="text-sm font-bold">{name}</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                <div className=" sm:flex sm:flex-wrap">
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    Buying the ad space give you the exclusive right to submit an ad. The media still has the power to validate or reject ad assets. You re free to change the ad at anytime. And free to resell on the open
                    market your ad space.{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {userAddress === collaborators[0] && (
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
