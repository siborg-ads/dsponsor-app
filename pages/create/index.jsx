import React, { useEffect, useState, useRef, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import Meta from "../../components/Meta";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddress, useSwitchChain, useContract, useContractWrite, Web3Button, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { Mumbai, Polygon } from "@thirdweb-dev/chains";
import styles from "../../styles/createPage/style.module.scss";
import PreviewModal from "../../components/modal/previewModal";
import Step_1_Create from "../../components/sliderForm/PageCreate/Step_1_Create";
import Step_2_Create from "../../components/sliderForm/PageCreate/Step_2_Create";
import Step_3_Create from "../../components/sliderForm/PageCreate/Step_3_Create";
import Step_4_Create from "../../components/sliderForm/PageCreate/Step_4_Create";
import SliderForm from "../../components/sliderForm/sliderForm";

const { BigNumber } = require("ethers");

const Create = () => {
  const [file, setFile] = useState(null);
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(200);
  const [selectedCurrency, setSelectedCurrency] = useState("JEUR");
  const [customContract, setCustomContract] = useState(null);
  const [selectedRoyalties, setSelectedRoyalties] = useState(10);
  const [validate, setValidate] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const stepsRef = useRef([]);

  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value, 10));
  };

  const handleUnitPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    if (!isNaN(price)) {
      setSelectedUnitPrice(price);
    }
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleCustomContractChange = (event) => {
    setCustomContract(event.target.value);
  };

  const handleRoyaltiesChange = (e) => {
    setSelectedRoyalties(parseInt(e.target.value, 10));
  };

  const address = useAddress();
  const { contract } = useContract("0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"); // dsponsor admin mumbai contract address

  const { mutateAsync, isLoading: isLoadingContractWrite, error } = useContractWrite(contract, "createDSponsorNFTAndOffer");

  const handleLogoUpload = (file) => {
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsOfferPreviewDisplayed(true);
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateInputs = () => {
    let isValid = true;
    let newErrors = {};

    if (!file) {
      newErrors.imageError = "Image is missing.";
      isValid = false;
    }

    if (!name) {
      newErrors.nameError = "Name is missing.";
      isValid = false;
    }

    if (!link || !isValidURL(link)) {
      newErrors.linkError = "The link is missing or invalid.";
      isValid = false;
    }

    if (!description) {
      newErrors.descriptionError = "Description is missing.";
      isValid = false;
    }

    const currentDate = new Date();
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

    if (!startDate) {
      newErrors.startDateError = "Start date is missing.";
      isValid = false;
    } else if (new Date(startDate) < yesterday) {
      newErrors.startDateError = "Start date cannot be in the past.";
      isValid = false;
    }

    if (!endDate) {
      newErrors.endDateError = "End date is missing.";
      isValid = false;
    } else if (new Date(endDate) < yesterday) {
      newErrors.endDateError = "End date cannot be in the past.";
      isValid = false;
    }

    if (selectedUnitPrice < 0.01) {
      newErrors.unitPriceError = "Unit price must be at least 0.01.";
      isValid = false;
    }
    if (selectedNumber < 0) {
      newErrors.numberError = "Number of ad spaces is missing or invalid.";
      isValid = false;
    }
    if (!selectedCurrency) {
      newErrors.currencyError = "Currency is missing or invalid.";
      isValid = false;
    }

    if (selectedRoyalties < 0 || selectedRoyalties > 100) {
      newErrors.royaltyError = "Royalties are missing or invalid. They should be between 0% and 100%.";
      isValid = false;
    }
    setValidate(isValid);
    setErrors(newErrors);
    return isValid;
  };

  const handlePreviewModal = () => {
    setShowPreviewModal(!showPreviewModal);
    validateInputs();
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    if (name && link) {
      onUpload(name, link);
    } else {
      console.error("Missing name or link");
    }

    const json = JSON.stringify({
      name: name,
      description: description,
      image: uploadUrl,
      external_link: link,
      collaborators: [address],
      validFromDate: startDate,
      validToDate: endDate,
      currencyName: selectedCurrency,
      price: selectedUnitPrice,
    });

    // upload json to IPFS
    const jsonUrl = await upload({
      data: [json],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    const jsonIpfsLink = jsonUrl[0];

    const args = [
      JSON.stringify({
        name: name, // name
        symbol: "DSPONSORNFT", // symbol
        baseURI: "https://api.dsponsor.com/tokenMetadata/", // baseURI
        contractURI: jsonIpfsLink, // contractURI from json
        minter: address,
        maxSupply: selectedNumber, // max supply
        forwarder: "0x0000000000000000000000000000000000000000", // forwarder
        initialOwner: address, // owner
        royaltyBps: selectedRoyalties * 100, // royalties
        currencies: [selectedCurrencyContract(selectedCurrency)], // accepted token
        prices: [BigNumber.from(selectedUnitPrice).mul(BigNumber.from(10).pow(getDecimals(selectedCurrency)))], // prices with decimals
        allowedTokenIds: Array.from({ length: selectedNumber }, (_, i) => i), // allowed token ids
      }),
      JSON.stringify({
        name: name, // name
        rulesURI: jsonIpfsLink, // rulesURI
        options: {
          admins: [address], // admin
          validators: [], // validator
          adParameters: ["squareLogoURL", "linkURL"], // ad parameters
        },
      }),
    ];
    const preparedArgs = [Object.values(JSON.parse(args[0])), Object.values(JSON.parse(args[1]))];

    try {
      await mutateAsync({ args: preparedArgs });
      setSuccessFullUpload(true);
    } catch (error) {
      setSuccessFullUpload(false);
    }
  };

  const onUpload = (updatedName, updatedLink) => {
    setName(updatedName);
    setLink(updatedLink);
  };

  const { contract: JEURTokenContract } = useContract("0xd409F17095a370800A9C352124C6a1e82695203E", "token"); // mumbai

  const { contract: USDCTokenContract } = useContract("0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97", "token");

  const { contract: MaticTokenContract } = useContract("0x0000000000000000000000000000000000001010", "token");

  const { contract: WETHTokenContract } = useContract("0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa", "token"); // mumbai

  const { contract: customTokenContract } = useContract(customContract, "token");

  const { data: JEURdecimals } = useTokenDecimals(JEURTokenContract);
  const { data: USDCDecimals } = useTokenDecimals(USDCTokenContract);
  const { data: WETHDecimals } = useTokenDecimals(WETHTokenContract);
  const { data: MaticDecimals } = useTokenDecimals(MaticTokenContract);
  const { data: customDecimals } = useTokenDecimals(customTokenContract);

  const selectedCurrencyContract = useCallback(() => {
    switch (selectedCurrency) {
      case "JEUR":
        return "0xd409F17095a370800A9C352124C6a1e82695203E"; // on mumbai
      case "USDC":
        return "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97";
      case "MATIC":
        return "0x0000000000000000000000000000000000001010"; // to change
      case "WETH":
        return "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"; // on mumbai
      case "custom":
        return customContract;
      default:
        return "0xd409F17095a370800A9C352124C6a1e82695203E"; // JEUR by default (to change)
    }
  }, [customContract, selectedCurrency]);

  const getDecimals = useCallback(
    (currency) => {
      switch (currency) {
        case "JEUR":
          return JEURdecimals;
        case "USDC":
          return USDCDecimals;
        case "MATIC":
          return MaticDecimals;
        case "WETH":
          return WETHDecimals;
        case "custom":
          return customDecimals;
        default:
          return JEURdecimals; // JEUR by default (to change)
      }
    },
    [JEURdecimals, USDCDecimals, WETHDecimals, MaticDecimals, customDecimals]
  );

 
  
  

 
  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 pt-16 pb-8 text-center text-4xl font-medium dark:text-white">Create and ad space offer</h1>

          <div className="mx-auto max-w-[48.125rem]">
            <p className="text-center pt-8 pb-16 dark:text-white">
              Finance your activity by selling ad space ownerships. The sponsors, the buyers of ad spaces, will have the exclusive right to propose an ad on your media interfaces, as your website. You always have the
              power to accept or reject the submitted ad.{" "}
            </p>
          </div>
        </div>
        <SliderForm styles={styles} handlePreviewModal={handlePreviewModal} stepsRef={stepsRef}>
          <Step_1_Create stepsRef={stepsRef} styles={styles} setName={setName} setDescription={setDescription} />

          <Step_2_Create stepsRef={stepsRef} styles={styles} setLink={setLink} file={file} handleLogoUpload={handleLogoUpload} />

          <Step_3_Create
            stepsRef={stepsRef}
            styles={styles}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedNumber={selectedNumber}
            handleNumberChange={handleNumberChange}
          />

          <Step_4_Create
            stepsRef={stepsRef}
            styles={styles}
            selectedUnitPrice={selectedUnitPrice}
            handleUnitPriceChange={handleUnitPriceChange}
            selectedCurrency={selectedCurrency}
            handleCurrencyChange={handleCurrencyChange}
            customContract={customContract}
            handleCustomContractChange={handleCustomContractChange}
            selectedRoyalties={selectedRoyalties}
            handleRoyaltiesChange={handleRoyaltiesChange}
          />
        </SliderForm>
        
      </section>
      {showPreviewModal && (
        <div className="modal fade show bloc">
          <PreviewModal
            handlePreviewModal={handlePreviewModal}
            handleSubmit={handleSubmit}
            name={name}
            link={link}
            file={file}
            description={description}
            startDate={startDate}
            endDate={endDate}
            selectedNumber={selectedNumber}
            selectedUnitPrice={selectedUnitPrice}
            selectedCurrency={selectedCurrency}
            customContract={customContract}
            selectedRoyalties={selectedRoyalties}
            previewImage={previewImage}
            validate={validate}
            errors={errors}
            successFullUpload={successFullUpload}
            address={address}
          />
        </div>
      )}

      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;
