import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import styles from "../../../styles/createPage/style.module.scss";

import Meta from "../../../components/Meta";
import Image from "next/image";
import { GetAdOfferById } from "../../../data/services/AdsOffersService";
import { useAddress, darkTheme, Web3Button, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import SliderForm from "../../../components/sliderForm/sliderForm";
import Step_1_Mint from "../../../components/sliderForm/PageMint/Step_1_Mint";
import Step_2_Mint from "../../../components/sliderForm/PageMint/Step_2_Mint";
import PreviewModal from "../../../components/modal/previewModal";
import { FileUploader } from "react-drag-drop-files";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ItemsTabs } from "../../../components/component";
import { useDispatch } from "react-redux";
import { ConnectWallet } from "@thirdweb-dev/react";

const Item = () => {
  const router = useRouter();

  const offerAddress = router.query.offer;
  const [tokenIdString, setTokenIdString] = useState(null);

  const [data, setData] = useState([]);
  const address = useAddress();
  const [file, setFile] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [link, setLink] = useState(null);
  const [amountToApprove, setAmountToApprove] = useState(null);
  const [errors, setErrors] = useState({});
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const { contract } = useContract(data[0]?.currencyAddress, "token");
  const { data: tokenBalance, isLoading, error } = useTokenBalance(contract, address);
  const { contract: DsponsorAdminContract } = useContract("0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3");
  const { contract: DsponsorNFTContract } = useContract(data[0]?.contractAddress);
  const { mutateAsync: uploadToIPFS, isLoading: isUploading } = useStorageUpload();
  const { mutateAsync, isLoadingMintAndSubmit } = useContractWrite(DsponsorAdminContract, "mintAndSubmit");
  const { contract: tokenContract } = useContract(data[0]?.currencyAddress, "token");
  const { mutateAsync: approve, isLoading: isLoadingApprove } = useContractWrite(tokenContract, "approve");
  const { data: bps } = useContractRead(DsponsorAdminContract, "bps");
  const { data: isAllowedToMint } = useContractRead(DsponsorNFTContract, "tokenIdIsAllowedToMint", tokenIdString);
  const { data: tokenDecimals } = useTokenDecimals(tokenContract);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [validate, setValidate] = useState(false);
  const stepsRef = useRef([]);
  const numSteps = 2;

  useEffect(() => {
    if (offerAddress) {
      const fetchAdsOffers = async () => {
        const result = await GetAdOfferById(offerAddress);
        setData(result);
      };

      fetchAdsOffers();
    }

    const tokenId = router.query.item;
    setTokenIdString(tokenId?.toString());
  }, [offerAddress, router]);

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    if (!file) {
      newErrors.imageError = "Image is missing.";
      isValid = false;
    }

    if (!link || !isValidURL(link)) {
      newErrors.linkError = "The link is missing or invalid.";
      isValid = false;
    }
    console.log(isValid, "isValid");
    setValidate(isValid);
    setErrors(newErrors);
    return isValid;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleLogoUpload = (file) => {
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (data[0]?.price && bps) {
      const price = data[0].price;

      const bpsValueHex = bps._hex;
      const bpsValueDecimal = ethers.BigNumber.from(bpsValueHex).toNumber();
      const bpsValuePercentage = bpsValueDecimal / 10000;
      const priceAsNumber = price * bpsValuePercentage + price;
      const priceAsNumberString = priceAsNumber.toString();
      const amountToApprove = ethers.utils.parseUnits(priceAsNumberString, tokenDecimals);

      setAmountToApprove(amountToApprove);
    }
  }, [data, bps, tokenDecimals]);

  const handleApprove = async () => {
    try {
      const allowance = await tokenContract.call("allowance", [address, "0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"]);
      if (allowance > amountToApprove) return;
      await approve({ args: ["0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3", amountToApprove] });
      console.log("Approvation réussie");
    } catch (error) {
      console.error("Erreur d'approbation:", error);
    }
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    // IPFS upload

    let userBalance = checkUserBalance(tokenBalance, data[0]?.price);
    if (userBalance) {
      try {
        await handleApprove();
      } catch (error) {
        console.error("Erreur d'approbation des tokens:", error);
      }
      try {
        const uploadUrl = await uploadToIPFS({
          data: [file],
          options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
        });

        const json = JSON.stringify({
          image: uploadUrl,
          external_link: link,
        });
        const jsonUrl = await uploadToIPFS({
          data: [json],
          options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
        });

        const jsonIpfsLink = jsonUrl[0];

        const args = {
          tokenId: tokenIdString,
          to: address,
          currency: data[0]?.currencyAddress,
          tokenData: jsonIpfsLink,
          offerId: data[0]?.offerId,
          adParameters: ["squareLogoURL", "linkURL"],
          adDatas: [jsonIpfsLink, link],
          referralAdditionalInformation: "",
        };
        console.log(args);

        await mutateAsync({ args: [args] });
        setSuccessFullUpload(true);
      } catch (error) {
        console.error("Erreur de soumission du token:", error);
        setSuccessFullUpload(false);
      }
    }
  };

  const checkUserBalance = (tokenAddressBalance, priceToken) => {
    try {
      const parsedTokenBalance = parseFloat(tokenAddressBalance.displayValue);
      const parsedPriceToken = parseFloat(priceToken);

      if (parsedTokenBalance >= parsedPriceToken) {
        console.log("user has enough balance");
        return true;
      } else {
        console.log("user has not enough balance");
        return false;
      }
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
      return null;
    }
  };
  const handlePreviewModal = () => {
    setShowPreviewModal(!showPreviewModal);
    validateInputs();
  };
  const successFullUploadModal = {
    title: "Mint NFT",
    body: "Your NFT has been minted successfully",
    buttonTitle: "Close",
    hrefButton: "/",
  };

  if (!data || data.length === 0) {
    return <div>Chargement...</div>;
  }
  const { currencyName, description, externalLink, id, image, maxSupply, name, numberTokenAllowed, ownerAddress, ownerName, price, royalties, contractAddress } = data[0];

  return (
    <>
      <Meta title={` || d>sponsor | Media sponsor Marketplace `} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-24  mt-24 pt-12 pb-8">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full flex justify-center">
              <button className=" w-full" onClick={() => setImageModal(true)} style={{ height: "450px" }}>
                <Image width={585} height={726} src={image} alt="image" className="rounded-2xl cursor-pointer h-full object-contain w-full" />
              </button>

              {/* <!-- Modal --> */}
              <div className={imageModal ? "modal fade show block" : "modal fade"}>
                <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
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
                  <Link href="#" className="text-accent mr-2 text-sm font-bold">
                    {name}
                  </Link>
                  <span className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                    <Tippy content={<span>Verified Collection</span>}>
                      <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                        <use xlinkHref="/icons.svg#icon-right-sign"></use>
                      </svg>
                    </Tippy>
                  </span>
                </div>

                {/* <!-- Likes / Actions --> */}
                {/* <div className="ml-auto flex items-stretch space-x-2 relative">
                  <Likes like={likes} classes="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 flex items-center space-x-1 rounded-xl border bg-white py-2 px-4" />

                  
                  <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white" />
                </div> */}
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
                  {numberTokenAllowed}/{maxSupply} available
                </span>
              </div>

              <p className="dark:text-jacarta-300 mb-10">{description}</p>

              {/* <!-- Creator / Owner --> */}
              <div className="mb-8 flex flex-wrap">
                <div className="mr-8 mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href="/user/avatar_6" className="relative block">
                      <Image width={48} height={48} src={image} alt={name} className="rounded-2lg h-12 w-12 object-contain" loading="lazy" />
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

                <div className="mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <Link href="/user/avatar_6" className="relative block">
                      {/* <Image width={48} height={48} src={ownerImage} alt={ownerName} className="rounded-2lg h-12 w-12" loading="lazy" /> */}
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
                    <span className="text-jacarta-400 block text-sm dark:text-white">Owned by</span>
                    <Link href="/user/avatar_6" className="text-accent block">
                      <span className="text-sm font-bold">{ownerName}</span>
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
      {/* <!-- end item --> */}

      <div>
        {isAllowedToMint ? (
          <div>
            <SliderForm styles={styles} handlePreviewModal={handlePreviewModal} stepsRef={stepsRef} numSteps={numSteps}>
              <Step_1_Mint stepsRef={stepsRef} styles={styles} file={file} handleLogoUpload={handleLogoUpload} />
              <Step_2_Mint stepsRef={stepsRef} styles={styles} setLink={setLink} />
            </SliderForm>
          </div>
        ) : (
          //Message to say that the NFT is not allowed to mint
          <div className="flex justify-center">
            <p>Sorry, someone already mint this NFT</p>
          </div>
        )}
      </div>

      {/* <ItemsTabs /> */}
      <div className="container mb-12">
        <ItemsTabs />
      </div>
      {showPreviewModal && (
        <div className="modal fade show bloc">
          <PreviewModal
            handlePreviewModal={handlePreviewModal}
            handleSubmit={handleSubmit}
            link={link}
            previewImage={previewImage}
            errors={errors}
            successFullUpload={successFullUpload}
            validate={validate}
            buttonTitle="Mint"
            modalTitle="Mint NFT Preview"
            successFullUploadModal={successFullUploadModal}
          />
        </div>
      )}
      
    </>
  );
};

export default Item;
