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
      <Meta title={`${pid} || d>sponsor | Media sponsor Marketplace `} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}

          <div className="md:flex md:flex-wrap" key={id}>
            {/* <!-- Image --> */}
            <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
              <button className=" w-full" onClick={() => setImageModal(true)}>
                <Image width={585} height={726} src={image} alt="image" className="rounded-2xl cursor-pointer h-full object-cover w-full" />
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
                      <Image width={48} height={48} src={image} alt={name} className="rounded-2lg h-12 w-12" loading="lazy" />
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
                <div className="mb-8 sm:flex sm:flex-wrap">
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    Buying the ad space give you the exclusive right to submit an ad. The media still has the power to validate or reject ad assets. You re free to change the ad at anytime. And free to resell on the open
                    market your ad space.{" "}
                  </span>
                </div>
                <Web3Button
                  contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                  action={() =>
                    mutateAsync({
                      args: [args],
                    })
                  }
                  className="!bg-accent !cursor-pointer !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all"
                >
                  Mint NFT
                </Web3Button>
                {address ? (
                  <Link href="#">
                    <button className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                      Upload IPFS
                    </button>
                  </Link>
                ) : (
                  <div className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full px-8 text-center font-semibold text-white transition-all">
                    <ConnectWallet
                      theme={darkTheme({
                        colors: {
                          primaryButtonText: "#ffffff",
                          primaryButtonBg: "bg-transparent",
                        },
                      })}
                    />
                    {/* <Link href="#" >
                            <button className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all">Connexion</button>
                          </Link> */}
                  </div>
                )}
              </div>
              {/* <!-- end bid --> */}
            </div>
            {/* <!-- upload file --> */}
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Image, Video, Audio, or 3D Model
                <span className="text-red">*</span>
              </label>

              {file ? <p className="dark:text-jacarta-300 text-2xs mb-3">successfully uploaded : {file.name}</p> : <p className="dark:text-jacarta-300 text-2xs mb-3">Drag or choose your file to upload</p>}

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <FileUploader handleChange={handleLogoUpload} name="file" types={fileTypes} classes="file-drag" maxSize={100} minSize={0} />
                </div>
              </div>
              {imageError && <p className="text-red-500">{imageError}</p>}
            </div>
            {/* <!-- preview image --> */}
            {previewImage && (
              <div className="mb-6">
                <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Offer preview
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">Your offer will look like this.</p>
                <Image src={previewImage} width={300} height={100} alt="Preview" />
              </div>
            )}
            {/* <!-- external link --> */}
            <div className="mb-6">
              <label htmlFor="item-external-link" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                External link<span className="text-red">*</span>
              </label>
              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="https://yoursite.com"
                onChange={(e) => setLink(e.target.value)}
              />
              {linkError && <p className="text-red-500">{linkError}</p>}
            </div>
            {/* <!-- end details --> */}
          </div>

          <ItemsTabs />
        </div>
      </section>
      {/* <!-- end item --> */}


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
