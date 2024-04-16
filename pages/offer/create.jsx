import React, { useEffect, useState, useRef, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import Meta from "../../components/Meta";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddress, useSwitchChain, useContract, useContractWrite, Web3Button,useContractRead, useStorageUpload, useTokenDecimals, CheckoutWithCard, CheckoutWithEth } from "@thirdweb-dev/react";
import { Mumbai, Polygon } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import styles from "../../styles/createPage/style.module.scss";
import PreviewModal from "../../components/modal/previewModal";
import Step_1_Create from "../../components/sliderForm/PageCreate/Step_1_Create";
import Step_2_Create from "../../components/sliderForm/PageCreate/Step_2_Create";
import Step_3_Create from "../../components/sliderForm/PageCreate/Step_3_Create";
import Step_4_Create from "../../components/sliderForm/PageCreate/Step_4_Create";

import SliderForm from "../../components/sliderForm/sliderForm";
import adminInstance from "../../utils/sdkProvider";


const Create = () => {
  const [file, setFile] = useState(null);
  const { mutateAsync: upload, isLoading } = useStorageUpload();

  const [link, setLink] = useState(null);
  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [customContract, setCustomContract] = useState(null);
  const [selectedRoyalties, setSelectedRoyalties] = useState(10);
  const [validate, setValidate] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [successFullUpload, setSuccessFullUpload] = useState(false);
  const [selectedParameter, setSelectedParameter] = useState(["imageURL", "linkURL"]);
  const [displayedParameter, setDisplayedParameter] = useState("Logo Grid & Link");
  const [selectedTypeParameter, setSelectedTypeParameter] = useState(0);
  const [name, setName] = useState(false);
  const stepsRef = useRef([]);

  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value, 10));
  };
  const handleParameterChange = (e) => {
    setSelectedTypeParameter(e.target.value);
    if (e.target.value === 0){
      setSelectedParameter(["imageURL", "linkURL"]);
      setDisplayedParameter("Logo Grid & Link");
    } 
    // if (e.target.value === 1) setSelectedParameter(["bannerURL", "linkURL"]);
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
    setSelectedRoyalties(parseFloat(e.target.value));
  };

  const address = useAddress();
  const { contract } = useContract("0xdf42633BD40e8f46942e44a80F3A58d0Ec971f09"); 

  const { mutateAsync, isLoading: isLoadingContractWrite, error } = useContractWrite(contract, "createDSponsorNFTAndOffer");

  const handleLogoUpload = (file) => {
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
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
    if (!file) {
      newErrors.imageError = "Image is missing.";
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
    if (!selectedParameter) {
      newErrors.typeAdError = "Type of ad spaces is missing or invalid.";
      isValid = false;
    }

    if (!selectedCurrency) {
      newErrors.currencyError = "Currency is missing or invalid.";
      isValid = false;
    }

    if (selectedRoyalties < 0.01 || selectedRoyalties > 100) {
      newErrors.royaltyError = "Royalties are missing or invalid. They should be between 0.01% and 100%.";
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
    try{
      const uploadUrl = await upload({
        data: [file],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });

      if (name && link) {
        onUpload(name, link);
      } else {
        console.error("Missing name or link");
      }
      const jsonMetadata = JSON.stringify({
        creator: {
          name: "",
          description: "",
          image: "",
          external_link: "",
          categories: ["dApp", "social", "media", "education"],
        },
        offer: {
          name: name,
          description: description,
          image: uploadUrl[0],
          terms: null,
          external_link: link,
          valid_from: startDate || "1970-01-01T00:00:00Z",
          valid_to: endDate || "2100-01-01T00:00:00Z",
          categories: ["Community", "NFT", "Crypto"],
          token_metadata: {},
        },
      });

      const jsonContractURI = JSON.stringify({
        name: name,
        description: description,
        image: uploadUrl,
        external_link: link,
        collaborators: [address],
      });
      // upload json to IPFS
      const jsonMetadataURL = await upload({
        data: [jsonMetadata],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });

      // upload json to IPFS
      const jsonContractURIURL = await upload({
        data: [jsonContractURI],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });

      const jsonIpfsLinkContractURI = jsonContractURIURL[0];
      const jsonIpfsLinkMetadata = jsonMetadataURL[0];

      const args = [
        JSON.stringify({
          name: name, // name
          symbol: "DSPONSORNFT", // symbol
          baseURI: "https://api.dsponsor.com/tokenMetadata/", // baseURI
          contractURI: jsonIpfsLinkContractURI, // contractURI from json
          minter: address,
          maxSupply: selectedNumber, // max supply
          forwarder: "0x0000000000000000000000000000000000000000", // forwarder
          initialOwner: address, // owner
          royaltyBps: selectedRoyalties * 100, // royalties
          currencies: [selectedCurrencyContract(selectedCurrency)], // accepted token
          prices: [ethers.utils.parseUnits(selectedUnitPrice.toString(), getDecimals(selectedCurrency))], // prices with decimals
          allowedTokenIds: Array.from({ length: selectedNumber }, (_, i) => i), // allowed token ids
        }),
        JSON.stringify({
          name: name, // name
          offerMetadata: jsonIpfsLinkMetadata, // rulesURI
          options: {
            admins: [address], // admin
            validators: [], // validator
            adParameters: selectedParameter, // ad parameters
          },
        }),
      ];
      const preparedArgs = [Object.values(JSON.parse(args[0])), Object.values(JSON.parse(args[1]))];
      console.log("preparedArgs", preparedArgs);

      await mutateAsync({ args: preparedArgs });
      setSuccessFullUpload(true);

      
      

    }catch(error){
      setSuccessFullUpload(false);
      throw error;
    }

    

  };

  const onUpload = (updatedName, updatedLink) => {
    setName(updatedName);
    setLink(updatedLink);
  };

  const USDCCurrency = adminInstance.chain.getCurrencyAddress("USDC");
  const ETHCurrency = adminInstance.chain.getCurrencyAddress("ETH");
  const WETHCurrency = adminInstance.chain.getCurrencyAddress("WETH");
  const USDTCurrency = adminInstance.chain.getCurrencyAddress("USDT");
  

  const { contract: customTokenContract } = useContract(customContract, "token");
  const { data: customSymbolContract } = useContractRead(customTokenContract, "symbol");
 
  
  const { data: customDecimals } = useTokenDecimals(customTokenContract);
  

  const selectedCurrencyContract = useCallback(() => {
    switch (selectedCurrency) {
      case "USDC":
        return USDCCurrency.contract;
      case "ETH":
        return ETHCurrency.contract;
      case "WETH":
        return WETHCurrency.contract;
      case "USDT":
        return USDTCurrency.contract;
      case "custom":
        return customContract;
      default:
        return USDCCurrency.contract;
    }
  }, [USDCCurrency, ETHCurrency, WETHCurrency, USDTCurrency, customContract, selectedCurrency]);

  const getDecimals = useCallback(
    (currency) => {
      switch (currency) {
        case "USDC":
          return USDCCurrency.decimals;
        case "ETH":
          return ETHCurrency.decimals;
        case "WETH":
          return WETHCurrency.decimals;
        case "USDT":
          return USDTCurrency.decimals;
        case "custom":
          return customDecimals;
        default:
          return USDCCurrency.decimals;
      }
    },
    [USDCCurrency, ETHCurrency, WETHCurrency, USDTCurrency ,customDecimals]
  );

  const numSteps = 4;
  const successFullUploadModal = {
    body: "Your offer has been created successfully",
    subBody: "⚠️ Don't forget to display the adSpaces on your website ! copy paste the link in your offer details to display automatically your sponsor logo.",
    buttonTitle: "Manage Spaces",
    hrefButton: `/manageSpaces/${address}`,
  };

  return (
    <div>
      <Meta title="Create || DSponsor - Unlock smarter monetization for your content." />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 pt-16 pb-8 text-center text-4xl font-medium dark:text-white">Create ad space offer</h1>

          <div className="mx-auto max-w-[48.125rem]">
            <p className="text-center pt-8 pb-16 dark:text-white">
              Finance your activity by selling ad space ownerships. The sponsors, the buyers of ad spaces, will have the exclusive right to propose an ad on your media interfaces, as your website. You always have the
              power to accept or reject the submitted ad.{" "}
            </p>
          </div>
        </div>
        <SliderForm styles={styles} handlePreviewModal={handlePreviewModal} stepsRef={stepsRef} numSteps={numSteps}>
          <Step_1_Create
            stepsRef={stepsRef}
            styles={styles}
            selectedTypeParameter={selectedTypeParameter}
            selectedNumber={selectedNumber}
            handleNumberChange={handleNumberChange}
            selectedParameter={selectedParameter}
            handleParameterChange={handleParameterChange}
          />
          <Step_2_Create stepsRef={stepsRef} styles={styles} setName={setName} setDescription={setDescription} />

          <Step_3_Create stepsRef={stepsRef} styles={styles} setLink={setLink} link={link} previewImage={previewImage} file={file} handleLogoUpload={handleLogoUpload} />

          <Step_4_Create
            stepsRef={stepsRef}
            styles={styles}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
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
            customSymbolContract={customSymbolContract}
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
            selectedParameter={selectedParameter}
            displayedParameter={displayedParameter}
            validate={validate}
            errors={errors}
            successFullUpload={successFullUpload}
            address={address}
            buttonTitle="Create ad space offer"
            modalTitle="Ad Space Offer "
            successFullUploadModal={successFullUploadModal}
          />
        </div>
      )}

      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;
