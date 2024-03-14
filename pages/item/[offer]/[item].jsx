import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tippy.js/dist/tippy.css";
import styles from "../../../styles/createPage/style.module.scss";
import More_items from ".././more_items";
import Meta from "../../../components/Meta";
import Image from "next/image";
import { GetAdOfferById } from "../../../data/services/AdsOffersService";
import { useAddress, darkTheme, useTokenBalance, useContract, useContractRead, useContractWrite, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import SliderForm from "../../../components/sliderForm/sliderForm";
import Step_1_Mint from "../../../components/sliderForm/PageMint/Step_1_Mint";
import Step_2_Mint from "../../../components/sliderForm/PageMint/Step_2_Mint";
import PreviewModal from "../../../components/modal/previewModal";

const Item = () => {
  const router = useRouter();
  const offerAddress = router.query.offer;
  const tokenId = router.query.item;

  const [data, setData] = useState([]);
  const address = useAddress();
  const [file, setFile] = useState(null);
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
  const { data: isAllowedToMint } = useContractRead(DsponsorNFTContract, "tokenIdIsAllowedToMint", "4");
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
  }, [offerAddress]);

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
    await uploadJsonToIPFS();
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

        const jsonIpfsLink = "jsonUrl[0]";

        const args = {
          tokenId: parseInt(data[0]?.maxSupply) - 1,
          to: address,
          currency: data[0]?.currencyAddress,
          tokenData: jsonIpfsLink,
          offerId: data[0]?.offerId,
          adParameters: ["squareLogoURL", "linkURL"],
          adDatas: [jsonIpfsLink, link],
          referralAdditionalInformation: "",
        };

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

  if (!data || data.length === 0) {
    return <div>Chargement...</div>;
  }
  const { currencyName, description, externalLink, id, image, maxSupply, name, numberTokenAllowed, ownerAddress, ownerName, price, royalties, contractAddress } = data[0];

  return (
    <>
      <Meta title={`${offerAddress} || d>sponsor | Media sponsor Marketplace `} />

      <div className="pt-[5.5rem] lg:pt-32">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <Image src="/images/collections/Banner-item.webp" alt="banner" width={1519} height={300} className="w-full h-full object-center object-cover" />
        </div>
        {/* <!-- end banner --> */}

        {/* <!-- Profile --> */}

        <section key={id} className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <figure className="relative h-36 w-36 dark:border-jacarta-600 rounded-xl border-[5px] border-white ">
              <Link href={`/collection/${offerAddress}`}>
                <Image width={141} height={141} src={image} alt="{title}" className="h-full object-cover" />
              </Link>
              <div className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white" data-tippy-content="Verified Collection">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                </svg>
              </div>
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">{name}</h2>
              <div className="mb-8">
                <span className="text-jacarta-400 text-sm font-bold">Created by </span>
                <Link href="#" className="text-accent text-sm font-bold">
                  {ownerAddress}
                </Link>
              </div>

              <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                <Link href="#" className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">{price}</div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">{currencyName}</div>
                </Link>
                <Link href="#" className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">{tokenId}</div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">N°</div>
                </Link>
                <Link href="#" className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">{royalties} %</div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight"> royalties</div>
                </Link>
              </div>

              <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">{description}</p>
            </div>
          </div>
        </section>

        {/* <!-- end profile --> */}
      </div>

      {/*  <!-- Item --> */}
      <section className="relative lg:mt-5 lg:pt-5 lg:pb-24 mt-5 pt-12 pb-5">
        <div className="container">
          {/* <!-- Item --> */}

          <div >
            {isAllowedToMint ? (
              <div>
                <div className="flex justify-center">
                  {/* <!-- Details --> */}
                  <div className="w-9/12 ">
                    {/* <!-- Collection / Likes / Actions --> */}

                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                      <div className=" sm:flex sm:flex-wrap">
                        <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                          Buying the ad space give you the exclusive right to submit an ad. The media still has the power to validate or reject ad assets. You re free to change the ad at anytime. And free to resell on
                          the open market your ad space.{" "}
                        </span>
                      </div>
                    </div>
                    {/* <!-- end bid --> */}
                  </div>
                </div>

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

            {/* <!-- end details --> */}
          </div>

          {/* <ItemsTabs /> */}
        </div>
      </section>
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
          />
        </div>
      )}
      {/* <!-- end item --> */}

      <More_items />
    </>
  );
};

export default Item;
