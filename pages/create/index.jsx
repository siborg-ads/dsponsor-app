import React, { useEffect, useState, useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import Meta from "../../components/Meta";
import Image from "next/image";
import { useStorageUpload } from "@thirdweb-dev/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useAddress,
  useSwitchChain,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { Mumbai, Polygon } from "@thirdweb-dev/chains";
import { useToken } from "wagmi";

const Create = () => {
  const fileTypes = ["JPG", "PNG", "GIF", "SVG"];
  const [file, setFile] = useState(null);
  const { mutateAsync: upload, isLoading } = useStorageUpload();
  const [uploadUrl, setUploadUrl] = useState(null);
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [linkError, setLinkError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [description, setDescription] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUnitPrice, setSelectedUnitPrice] = useState(200);
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
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
  const { contract } = useContract(
    "0xE3aE42A640C0C00F8e0cB6C3B1Df50a0b45d6B44"
  ); // dsponsor admin mumbai contract address

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
    }

    if (!startDate) {
      setDateError("Start date is missing.");
      isValid = false;
    }

    if (!endDate) {
      setDateError("End date is missing.");
      isValid = false;
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
    });

    // upload json to IPFS
    const jsonUrl = await upload({
      data: [json],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });

    setJsonIpfsLink(jsonUrl);

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

  const { result: JEURToken } = useToken({
    address: "0xd409F17095a370800A9C352124C6a1e82695203E",
    chainId: Mumbai.chainId,
  }); // add others

  const { result: customToken } = useToken({
    address: customContract,
    chainId: Mumbai.chainId,
  });

  const selectedCurrencyContract = useCallback(() => {
    switch (selectedCurrency) {
      case "JEUR":
        return new Array(
          "0xd409F17095a370800A9C352124C6a1e82695203E",
          JEURToken.decimals
        ); // on mumbai
      case "USDC":
        return new Array("0x1", decimals); // to change
      case "MATIC":
        return new Array("0x2", decimals); // to change
      case "WETH":
        return new Array("0x3", decimals); // to change
      case "custom":
        return new Array(customContract, customToken.decimals);
      default:
        return new Array(
          "0xd409F17095a370800A9C352124C6a1e82695203E",
          JEURToken.decimals
        ); // JEUR by default (to change)
    }
  }, [
    JEURToken.decimals,
    customContract,
    customToken.decimals,
    selectedCurrency,
  ]);

  useEffect(() => {
    setArgs([
      JSON.stringify({
        name: name, // name
        symbol: "DSPONSORNFT", // symbol
        baseURI: "https://api.dsponsor.com/tokenMetadata/", // baseURI
        contractURI: jsonIpfsLink, // contractURI from json
        maxSupply: selectedNumber, // max supply
        forwarder: "0x0000000000000000000000000000000000000000", // forwarder
        initialOwner: address, // owner
        royaltyBps: selectedRoyalties * 100, // royalties
        currencies: [selectedCurrencyContract(selectedCurrency)], // accepted token
        prices: [selectedUnitPrice * 10 ** 18], // prices with decimals
        allowedTokenIds: Array.from(
          { length: selectedNumber + 1 },
          (_, i) => i
        ), // allowed token ids
      }),
      JSON.stringify({
        name: name, // name
        ruleURI: jsonIpfsLink, // rulesURI
        options: {
          admins: [address], // admin
          validators: [], // validator
          adParameters: ["squareLogoURL", "linkURL"], // ad parameters
        },
      }),
    ]);
  }, [
    address,
    jsonIpfsLink,
    name,
    selectedCurrency,
    selectedCurrencyContract,
    selectedNumber,
    selectedRoyalties,
    selectedUnitPrice,
  ]);

  console.log(
    new Array(
      Object.values(JSON.parse(args[0])),
      Object.values(JSON.parse(args[1]))
    )
  );

  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
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
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Create
          </h1>

          <div className="flex flex-col justify-center gap-2 mb-10">
            <p className="text-center text-red-500">dev only</p>
            <div className="flex gap-10 justify-center">
              <button
                className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                onClick={() => switchChain(Polygon.chainId)}
              >
                Polygon
              </button>
              <button
                className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                onClick={() => switchChain(Mumbai.chainId)}
              >
                Mumbai
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- File Upload --> */}
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Image, Video, Audio, or 3D Model
                <span className="text-red">*</span>
              </label>

              {file ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  successfully uploaded : {file.name}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Drag or choose your file to upload
                </p>
              )}

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <FileUploader
                    handleChange={handleLogoUpload}
                    name="file"
                    types={fileTypes}
                    classes="file-drag"
                    maxSize={100}
                    minSize={0}
                  />
                </div>
              </div>
            </div>
            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
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
              <label
                htmlFor="item-external-link"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
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
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
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
              {descriptionError && (
                <p className="text-red-500">{descriptionError}</p>
              )}
            </div>

            {/* <!-- Offer preview --> */}
            {previewImage && (
              <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Offer preview
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Your offer will look like this.
                </p>
                <Image
                  src={previewImage}
                  width={300}
                  height={100}
                  alt="Preview"
                />
              </div>
            )}

            {/* <!-- Validity period --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Validity period<span className="text-red">*</span>
              </label>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <div className="flex flex-col justify-center items-center gap-1">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="text-jacarta-700 dark:text-white"
                  />
                  <span className="text-jacarta-700 dark:text-white">
                    Start date
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="text-jacarta-700 dark:text-white"
                  />
                  <span className="text-jacarta-700 dark:text-white">
                    End date
                  </span>
                </div>
              </div>
              {startDateError && (
                <p className="text-red-500">{startDateError}</p>
              )}
              {endDateError && <p className="text-red-500">{endDateError}</p>}
            </div>

            {/* <!-- Number of ad spaces --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Number of ad spaces for this offer
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                Warning: d&gt;sponsor works with a fixed supply of ad spaces.
                You won&apos;t be able to modify this value. Max : 25
              </p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <label htmlFor="numberSelect">Select a number:</label>
                <select
                  id="numberSelect"
                  value={selectedNumber}
                  onChange={handleNumberChange}
                >
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
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Unit selling price
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                EUR payment means you&apos;ll receive JEUR tokens (1 JEUR = 1€).
                USD payment means you&apos;ll receive JUSD tokens (1 JUSD = 1$).
                You&apos;ll be able to cash out via wire transfer with a service
                like MtPelerin. You can change the pricing later.
              </p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <input
                  id="numberInput"
                  type="number"
                  min="1"
                  value={selectedUnitPrice}
                  onChange={handleUnitPriceChange}
                  placeholder="Unit selling price"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="jeur"
                    name="currency"
                    value="JEUR"
                    checked={selectedCurrency === "JEUR"}
                    onChange={handleCurrencyChange}
                  />
                  <label htmlFor="eur">JEUR</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="usdc"
                    name="currency"
                    value="USDC"
                    checked={selectedCurrency === "USDC"}
                    onChange={handleCurrencyChange}
                  />
                  <label htmlFor="usdc">USDC</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="matic"
                    name="currency"
                    value="MATIC"
                    checked={selectedCurrency === "MATIC"}
                    onChange={handleCurrencyChange}
                  />
                  <label htmlFor="matic">MATIC</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="weth"
                    name="currency"
                    value="WETH"
                    checked={selectedCurrency === "WETH"}
                    onChange={handleCurrencyChange}
                  />
                  <label htmlFor="weth">WETH</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="custom"
                    name="currency"
                    value="custom"
                    checked={selectedCurrency === "custom"}
                    onChange={handleCurrencyChange}
                  />
                  <label htmlFor="custom">Custom</label>
                  <input
                    className="ml-2"
                    type="text"
                    id="customContract"
                    name="customContract"
                    placeholder="Contract address"
                    onChange={handleCustomContractChange}
                  />
                </div>
              </div>
              <p className="dark:text-jacarta-300 text-2xs mt-3">
                You&apos;ll earn up to 1600 USDC. As d&gt;sponsor charges a fee
                of 4%, sponsors will pay 208 USDC.
              </p>
            </div>

            {/* <!-- Royalties --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Royalties
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                Sponsors can sell an ad space ownership on the marketplace.
                Define the fee you want to get from secondary sales. Sponsors
                might refuse to buy an ad space if your royalty fee is too high.
                You can change this value pricing later.
              </p>
              <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                <input
                  id="numberInput"
                  type="number"
                  min="0"
                  value={selectedRoyalties}
                  onChange={handleRoyaltiesChange}
                  placeholder="Royalties"
                />
                <span>%</span>
              </div>
            </div>

            {/* <!-- Collection --> */}
            {/* 
            <div className="relative">
              <div>
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Collection
                </label>
                <div className="mb-3 flex items-center space-x-2">
                  <p className="dark:text-jacarta-300 text-2xs">
                    This is the collection where your item will appear.
                    <Tippy
                      theme="tomato-theme"
                      content={
                        <span>
                          Moving items to a different collection may take up to
                          30 minutes.
                        </span>
                      }
                    >
                      <span className="inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                        </svg>
                      </span>
                    </Tippy>
                  </p>
                </div>
              </div>
              

              <div className="dropdown my-1 cursor-pointer">
                <Collection_dropdown2
                  data={collectionDropdown2_data}
                  collection={true}
                />
              </div>
            </div>
            */}
            {/* <!-- Properties --> */}
            {/* 
            {popupItemData.map(({ id, name, text, icon }) => {
              return (
                <div
                  key={id}
                  className="dark:border-jacarta-600 border-jacarta-100 relative border-b py-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <svg className="icon fill-jacarta-700 mr-2 mt-px h-4 w-4 shrink-0 dark:fill-white">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>

                      <div>
                        <label className="font-display text-jacarta-700 block dark:text-white">
                          {name}
                        </label>
                        <p className="dark:text-jacarta-300">{text}</p>
                      </div>
                    </div>
                    <button
                      className="group dark:bg-jacarta-700 hover:bg-accent border-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white hover:border-transparent"
                      onClick={() => dispatch(showPropatiesModal())}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-accent group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}

            <Proparties_modal />
            <div className="dark:border-jacarta-600 border-jacarta-100 relative border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-accent mr-2 mt-px h-4 w-4 shrink-0"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M7 10h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 0 1 13.262-3.131l-1.789.894A5 5 0 0 0 7 9v1zm-2 2v8h14v-8H5zm5 3h4v2h-4v-2z" />
                  </svg>

                  <div>
                    <label className="font-display text-jacarta-700 block dark:text-white">
                      Unlockable Content
                    </label>
                    <p className="dark:text-jacarta-300">
                      Include unlockable content that can only be revealed by
                      the owner of the item.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  value="checkbox"
                  name="check"
                  className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:transition-all checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                />
              </div>
            </div>
            */}
            {/* <!-- Explicit & Sensitive Content --> */}
            {/* 
            <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-6 border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 mr-2 mt-px h-4 w-4 shrink-0 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z" />
                  </svg>

                  <div>
                    <label className="font-display text-jacarta-700 dark:text-white">
                      Explicit & Sensitive Content
                    </label>

                    <p className="dark:text-jacarta-300">
                      Set this item as explicit and sensitive content.
                      <Tippy
                        content={
                          <span>
                            Setting your asset as explicit and sensitive
                            content, like pornography and other not safe for
                            work (NSFW) content, will protect users with safe
                            search while browsing Xhibiter
                          </span>
                        }
                      >
                        <span className="inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="dark:fill-jacarta-300 fill-jacarta-500 ml-2 -mb-[2px] h-4 w-4"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                          </svg>
                        </span>
                      </Tippy>
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  value="checkbox"
                  name="check"
                  className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:transition-all checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                />
              </div>
            </div>
            */}
            {/* <!-- Supply --> */}
            {/* 
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Supply
              </label>

              <div className="mb-3 flex items-center space-x-2">
                <p className="dark:text-jacarta-300 text-2xs">
                  The number of items that can be minted. No gas cost to you!
                  <Tippy
                    content={
                      <span>
                        Setting your asset as explicit and sensitive content,
                        like pornography and other not safe for work (NSFW)
                        content, will protect users with safe search while
                        browsing Xhibiter.
                      </span>
                    }
                  >
                    <span className="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                      </svg>
                    </span>
                  </Tippy>
                </p>
              </div>

              <input
                type="text"
                id="item-supply"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="1"
              />
            </div>
            */}
            {/* <!-- Blockchain --> */}
            {/* 
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Blockchain
              </label>

              <div className="dropdown relative mb-4 cursor-pointer ">
                <Collection_dropdown2 data={EthereumDropdown2_data} />
              </div>
            </div>
            */}
            {/* <!-- Freeze metadata --> */}
            {/* 
            <div className="mb-6">
              <div className="mb-2 flex items-center space-x-2">
                <label
                  htmlFor="item-freeze-metadata"
                  className="font-display text-jacarta-700 block dark:text-white"
                >
                  Freeze metadata
                </label>

                <Tippy
                  content={
                    <span className="bg-jacarta-300">
                      Setting your asset as explicit and sensitive content, like
                      pornography and other not safe for work (NSFW) content,
                      will protect users with safe search while browsing
                      Xhibiter.
                    </span>
                  }
                >
                  <span className="inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="dark:fill-jacarta-300 fill-jacarta-500 mb-[2px] h-5 w-5"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                    </svg>
                  </span>
                </Tippy>
              </div>

              <p className="dark:text-jacarta-300 text-2xs mb-3">
                Freezing your metadata will allow you to permanently lock and
                store all of this
                {"item's"} content in decentralized file storage.
              </p>

              <input
                type="text"
                disabled
                id="item-freeze-metadata"
                className="dark:bg-jacarta-700 bg-jacarta-50 border-jacarta-100 dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 dark:text-white"
                placeholder="To freeze your metadata, you must create your item first."
              />
            </div>
            */}
            {/* <!-- Submit --> */}
            <div className="flex items-center gap-4">
              {!validate && (
                <button
                  className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  onClick={handleSubmit}
                >
                  Validate
                </button>
              )}
              {validate && (
                <button
                  className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                  onClick={handleSubmit}
                >
                  Revalidate
                </button>
              )}
              {validate && (
                <Web3Button
                  contractAddress="0xE3aE42A640C0C00F8e0cB6C3B1Df50a0b45d6B44"
                  action={() =>
                    mutateAsync({
                      args: [
                        Object.values(JSON.parse(args[0])),
                        Object.values(JSON.parse(args[1])),
                      ],
                    })
                  }
                  style={{
                    backgroundColor: "#6366F1", // bg-accent
                    cursor: "default", // cursor-default
                    borderRadius: "9999px", // rounded-full
                    padding: "1rem 2rem", // py-3 px-8
                    textAlign: "center", // text-center
                    fontWeight: "600", // font-semibold
                    color: "#ffffff", // text-white
                    transition: "all", // transition-all
                  }}
                  className="bg-accent cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
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
                    <p className="font-light">
                      The item has been uploaded to IPFS.
                    </p>
                    <button onClick={copyToClipboard}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-500 active:text-black"
                      >
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
