import React, { useEffect, useState, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import Meta from "../../components/Meta";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useAddress,
  useSwitchChain,
  useContract,
  useContractWrite,
  Web3Button,
  useStorageUpload,
  useTokenDecimals,
  CheckoutWithCard,
  CheckoutWithEth,
} from "@thirdweb-dev/react";
import { Mumbai, Polygon } from "@thirdweb-dev/chains";

const { BigNumber } = require("ethers");

const Create = () => {
  const fileTypes = ["JPG", "PNG", "GIF", "SVG"];
  const [file, setFile] = useState(null);
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [uploadUrl, setUploadUrl] = useState(null);
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [linkError, setLinkError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [currencyError, setCurrencyError] = useState(null);
  const [royaltyError, setRoyaltyError] = useState(null);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [description, setDescription] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(200);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [customContract, setCustomContract] = useState(null);
  const [selectedRoyalties, setSelectedRoyalties] = useState(10);
  const [jsonIpfsLink, setJsonIpfsLink] = useState(null);
  const [validate, setValidate] = useState(false);
  const [args, setArgs] = useState([]);

  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value, 10));
  };

  const handleUnitPriceChange = (e) => {
    setSelectedUnitPrice(parseInt(e.target.value, 10));

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
  const switchChain = useSwitchChain();
  const { contract } = useContract("0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"); // dsponsor admin mumbai contract address

  const {
    mutateAsync,
    isLoading: isLoadingContractWrite,
    error,
  } = useContractWrite(contract, "createDSponsorNFTAndOffer");

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

    if (!file) {
      setImageError("Image is missing.");
      isValid = false;
    } else {
      setImageError(null);
    }

    if (!name) {
      setNameError("Name is missing.");
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!link || !isValidURL(link)) {
      setLinkError("The link is missing or invalid.");
      isValid = false;
    } else {
      setLinkError(null);
    }

    if (!description) {
      setDescriptionError("Description is missing.");
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    const currentDate = new Date();
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

    if (!startDate) {
      setStartDateError("Start date is missing.");
      isValid = false;
    } else if (new Date(startDate) < yesterday) {
      setStartDateError("Start date cannot be in the past.");
      isValid = false;
    } else {
      setStartDateError(null);
    }

    if (!endDate) {
      setEndDateError("End date is missing.");
      isValid = false;
    } else if (new Date(endDate) < yesterday) {
      setEndDateError("End date cannot be in the past.");
      isValid = false;
    } else {
      setEndDateError(null);
    }

    if (selectedUnitPrice < 0) {
      setCurrencyError("Unit price is missing or invalid.");
      isValid = false;
    } else {
      setCurrencyError(null);
    }

    if (!selectedCurrency) {
      setCurrencyError("Currency is missing or invalid.");
      isValid = false;
    } else {
      setCurrencyError(null);
    }

    if (selectedRoyalties < 0 || selectedRoyalties > 100) {
      setRoyaltyError(
        "Royalties are missing or invalid. They should be between 0% and 100%."
      );
      isValid = false;
    } else {
      setRoyaltyError(null);
    }

    return isValid;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonIpfsLink);
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    setUploadUrl(uploadUrl);
    if (uploadUrl && name && link) {
      onUpload(uploadUrl, name, link);
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

    setJsonIpfsLink(jsonUrl[0]);

    setValidate(true);
  };

  const onUpload = (logo, updatedName, updatedLink) => {
    setIpfsLink(logo);
    setName(updatedName);
    setLink(updatedLink);
  };

  const popupItemData = [
    {
      id: 1,
      name: "proparties",
      text: "Textual traits that show up as rectangles.",
      icon: "proparties-icon",
    },
    {
      id: 2,
      name: "levels",
      text: "Numerical traits that show as a progress bar.",
      icon: "level-icon",
    },
    {
      id: 3,
      name: "stats",
      text: "Numerical traits that just show as numbers.",
      icon: "stats-icon",
    },
  ];

  const { contract: JEURTokenContract } = useContract(
    "0xd409F17095a370800A9C352124C6a1e82695203E",
    "token"
  ); // mumbai

  const { contract: USDCTokenContract } = useContract(
    "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
    "token"
  ); // mumbai

  const { contract: WETHTokenContract } = useContract(
    "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
    "token"
  ); // mumbai

  const { contract: customTokenContract } = useContract(
    customContract,
    "token"
  );

  const { data: JEURdecimals } = useTokenDecimals(JEURTokenContract);
  const { data: USDCDecimals } = useTokenDecimals(USDCTokenContract);
  const { data: WETHDecimals } = useTokenDecimals(WETHTokenContract);
  const { data: customDecimals } = useTokenDecimals(customTokenContract);

  const selectedCurrencyContract = useCallback(() => {
    switch (selectedCurrency) {
      case "JEUR":
        return "0xd409F17095a370800A9C352124C6a1e82695203E"; // on mumbai
      case "USDC":
        return "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747";
      case "MATIC":
        return "0x2"; // to change
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
          return 18;
        case "WETH":
          return WETHDecimals;
        case "custom":
          return customDecimals;
        default:
          return JEURdecimals; // JEUR by default (to change)
      }
    },
    [JEURdecimals, USDCDecimals, WETHDecimals, customDecimals]
  );

  const updateArgs = useCallback(() => {
    if (!selectedCurrency) return;
    if (!selectedUnitPrice) return;
    if (!selectedNumber) return;
    if (!selectedRoyalties) return;
    if (!name) return;
    if (!jsonIpfsLink) return;

    setArgs([
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
    ]);
  }, [
    address,
    getDecimals,
    jsonIpfsLink,
    name,
    selectedCurrency,
    selectedCurrencyContract,
    selectedNumber,
    selectedRoyalties,
    selectedUnitPrice,
  ]);

  useEffect(() => {
    updateArgs();
  }, [updateArgs]);

  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image width={1519} height={773} priority src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">Create</h1>

          {address && (
            <div className="flex flex-col justify-center gap-2 mb-10">
              <p className="text-center text-red-500">dev only</p>
              <div className="flex gap-10 justify-center">
                <button className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={() => switchChain(Polygon.chainId)}>
                  Polygon
                </button>
                <button className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={() => switchChain(Mumbai.chainId)}>
                  Mumbai
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col justify-center gap-2 mb-10 max-w-xl mx-auto">
            <p className="text-center text-red-500">buy nft test</p>
            <div className="flex gap-10 justify-center">
              <CheckoutWithCard
                clientId="9fe05bd603270a5b7b9a0d57596e4b0a"
                configs={{
                  // Registered contract ID
                  contractId: "9581760b-fc73-409f-9c5f-ec1e24ce42fd",
                  // Buyer wallet address
                  walletAddress: address,
                }}
                onPaymentSuccess={(result) => {
                  console.log("Payment successful:", result);
                }}
              />
            </div>
          </div>

          {/*<div className="flex flex-col justify-center gap-2 mb-10">
            <p className="text-center text-red-500">buy nft test</p>
            <div className="flex gap-10 justify-center">
              <CheckoutWithEth
                configs={{
                  contractId: "9581760b-fc73-409f-9c5f-ec1e24ce42fd",
                  walletAddress: address,
                }}
                onPaymentSuccess={(result) => {
                  console.log("Payment successful.", result);
                }}
              />
            </div>
            </div>*/}

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- File Upload --> */}
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

            {/* <!-- Name --> */}
            <div className="mb-6">
              <label htmlFor="item-name" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>
            {/* <!-- External Link --> */}
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

            {/* <!-- Description --> */}
            <div className="mb-6">
              <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Description<span className="text-red">*</span>
              </label>
              <textarea
                id="item-description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows="4"
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of your item."
              ></textarea>
              {descriptionError && <p className="text-red-500">{descriptionError}</p>}
            </div>

            {/* <!-- Offer preview --> */}
            {previewImage && (
              <div className="mb-6">
                <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Offer preview
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">Your offer will look like this.</p>
                <Image src={previewImage} width={300} height={100} alt="Preview" />
              </div>
            )}

            {/* <!-- Validity period --> */}
            <div className="mb-6">
              <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Validity period<span className="text-red">*</span>
              </label>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <div className="flex flex-col justify-center items-center gap-1">
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="text-jacarta-700 dark:text-white" />
                  <span className="text-jacarta-700 dark:text-white">Start date</span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="text-jacarta-700 dark:text-white" />
                  <span className="text-jacarta-700 dark:text-white">End date</span>
                </div>
              </div>
              {startDateError && <p className="text-red-500">{startDateError}</p>}
              {endDateError && <p className="text-red-500">{endDateError}</p>}
            </div>

            {/* <!-- Number of ad spaces --> */}
            <div className="mb-6">
              <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Number of ad spaces for this offer
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">Warning: d&gt;sponsor works with a fixed supply of ad spaces. You won&apos;t be able to modify this value. Max : 25</p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <label htmlFor="numberSelect">Select a number:</label>
                <select id="numberSelect" value={selectedNumber} onChange={handleNumberChange}>
                  {[...Array(25)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <!-- Unit selling price --> */}
            <div className="mb-6">
              <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Unit selling price
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                EUR payment means you&apos;ll receive JEUR tokens (1 JEUR = 1€). USD payment means you&apos;ll receive JUSD tokens (1 JUSD = 1$). You&apos;ll be able to cash out via wire transfer with a service like
                MtPelerin. You can change the pricing later.
              </p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <input id="numberInput" type="number" min="1" value={selectedUnitPrice} onChange={handleUnitPriceChange} placeholder="Unit selling price" />
                <div className="flex items-center gap-1">
                  <input type="radio" id="jeur" name="currency" value="JEUR" checked={selectedCurrency === "JEUR"} onChange={handleCurrencyChange} />
                  <label htmlFor="jeur">JEUR</label>
                </div>

                <div className="flex items-center gap-1">
                  <input type="radio" id="usdc" name="currency" value="USDC" checked={selectedCurrency === "USDC"} onChange={handleCurrencyChange} />
                  <label htmlFor="usdc">USDC</label>
                </div>

                <div className="flex items-center gap-1">
                  <input type="radio" id="matic" name="currency" value="MATIC" checked={selectedCurrency === "MATIC"} onChange={handleCurrencyChange} />
                  <label htmlFor="matic">MATIC</label>
                </div>

                <div className="flex items-center gap-1">
                  <input type="radio" id="weth" name="currency" value="WETH" checked={selectedCurrency === "WETH"} onChange={handleCurrencyChange} />
                  <label htmlFor="weth">WETH</label>
                </div>

                <div className="flex items-center gap-1">
                  <input type="radio" id="custom" name="currency" value="custom" checked={selectedCurrency === "custom"} onChange={handleCurrencyChange} />
                  <label htmlFor="custom">Custom</label>
                  <input className="ml-2" type="text" id="customContract" name="customContract" placeholder="Contract address" onChange={handleCustomContractChange} />
                </div>
              </div>
              <p className="dark:text-jacarta-300 text-2xs mt-3">You&apos;ll earn up to 1600 USDC. As d&gt;sponsor charges a fee of 4%, sponsors will pay 208 USDC.</p>
              {currencyError && <p className="text-red-500">{currencyError}</p>}
            </div>

            {/* <!-- Royalties --> */}
            <div className="mb-6">
              <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Royalties
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                Sponsors can sell an ad space ownership on the marketplace. Define the fee you want to get from secondary sales. Sponsors might refuse to buy an ad space if your royalty fee is too high. You can change
                this value pricing later.
              </p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <input id="numberInput" type="number" min="0" max="100" value={selectedRoyalties} onChange={handleRoyaltiesChange} placeholder="Royalties" />
                <span>%</span>
              </div>
              {royaltyError && <p className="text-red-500">{royaltyError}</p>}
            </div>

            {/* <!-- Submit --> */}
            <div className="flex items-center gap-4">
              {!validate && (
                <button className="bg-accent cursor-pointer rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                  Validate
                </button>
              )}
              {validate && (
                <button className="bg-accent cursor-pointer rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleSubmit}>
                  Revalidate
                </button>
              )}
              {validate && (
                <Web3Button
                  contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                  action={() =>
                    mutateAsync({
                      args: [Object.values(JSON.parse(args[0])), Object.values(JSON.parse(args[1]))],
                    })
                  }
                  className="!bg-accent !cursor-pointer !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all"
                >
                  Create Ad Space Offer
                </Web3Button>
              )}
            </div>
            {!jsonIpfsLink && <></>}
            <div className="flex justify-start gap-2 mt-4">
              {file && !jsonIpfsLink && isLoading && (
                <div className="flex items-center">
                  <div className="inline-block mr-2 h-4 w-4 animate-spin rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  Uploading...
                </div>
              )}
              {jsonIpfsLink && (
                <div className={`${jsonIpfsLink && "flex flex-col gap-4"}`}>
                  <div className="flex items-center gap-2">
                    <p className="font-light">The item has been uploaded to IPFS.</p>
                    <button onClick={copyToClipboard}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 active:text-black">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;
