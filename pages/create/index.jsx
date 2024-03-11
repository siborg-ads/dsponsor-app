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
const { BigNumber } = require("ethers");

const Create = () => {
  const fileTypes = ["JPG", "PNG", "SVG"];
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const stepContainerRef = useRef(null);
  const stepsRef = useRef([]);
  const bulletsRef = useRef([]);
  const [isOfferPreviewDisplayed, setIsOfferPreviewDisplayed] = useState(false);

  const numSteps = 4;

  const animateSlider = () => {
    if (stepContainerRef.current) {
      const stepWidth = 750 - 20;
      if (currentSlide === 1 && previewImage) setIsOfferPreviewDisplayed(true);
      if (currentSlide !== 1 && previewImage) setIsOfferPreviewDisplayed(false);

      stepContainerRef.current.style.transform = `translateX(${-stepWidth * currentSlide}px)`;
    }

    bulletsRef.current.forEach((bullet, index) => {
      if (bullet) {
        bullet.classList.toggle(styles["form__bullet--active"], index === currentSlide);
      }
    });
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (stepContainerRef.current) {
        const stepWidth = 750 - 20;

        stepsRef.current.forEach((step) => {
          if (step) {
            step.style.width = `${stepWidth}px`;
          }
        });

        stepContainerRef.current.style.width = `${stepWidth * numSteps}px`;

        animateSlider();
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [currentSlide, numSteps]);

  const handleNextClick = () => {
    if (currentSlide < numSteps - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleBulletClick = (index) => {
    setCurrentSlide(index);
  };
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
        <div className={styles.modal__container}>
          <div className={styles.modal}>
            <div className={styles.modal__form__container}>
              <form className={styles.form}>
                <div className={styles.form__step__container} ref={stepContainerRef}>
                  {/* Step 1 */}
                  <div ref={(el) => (stepsRef.current[0] = el)} className={styles.form__step}>
                    <div className="pr-6 pl-2">
                      <h3 className="mb-14">Step 1</h3>
                      {/* <!-- Name --> */}
                      <div className="mb-6">
                        <label htmlFor="item-name" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Title<span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="item-name"
                          className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
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
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div ref={(el) => (stepsRef.current[1] = el)} className={styles.form__step}>
                    <div className="pr-6 pl-2">
                      <h3 className="mb-14">Step 2</h3>

                      {/* <!-- External Link --> */}
                      <div className="mb-6">
                        <label htmlFor="item-external-link" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Url where your ads will be displayed<span className="text-red">*</span>
                        </label>
                        <input
                          type="url"
                          id="item-external-link"
                          className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                          placeholder="https://yoursite.com"
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </div>
                      {/* <!-- File Upload --> */}
                      <div className="mb-6 flex items-center justify-center flex-col">
                        <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Illustration
                          <span className="text-red">*</span>
                        </label>

                        {file ? (
                          <p className="dark:text-jacarta-300 text-2xs mb-3">successfully uploaded : {file.name}</p>
                        ) : (
                          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Drag or choose your file to upload</p>
                        )}

                        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                          <div className="relative z-10 cursor-pointer px-16">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                            </svg>
                            <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">JPG, PNG, SVG Max size: 20 MB</p>
                          </div>
                          <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                            <FileUploader handleChange={handleLogoUpload} name="file" types={fileTypes} classes="file-drag" maxSize={100} minSize={0} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div ref={(el) => (stepsRef.current[2] = el)} className={styles.form__step}>
                    <div className="pr-6 pl-2">
                      <h3 className="mb-14">Step 3</h3>
                      {/* <!-- Validity period --> */}
                      <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Validity period<span className="text-red">*</span>
                        </label>
                        <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
                          <div className="flex flex-col justify-center items-center gap-1">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                            />
                            <span className="text-jacarta-700 dark:text-white">Start date</span>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-1">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                            />
                            <span className="text-jacarta-700 dark:text-white">End date</span>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Number of ad spaces --> */}
                      <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Number of ad spaces for this offer
                          <span className="text-red">*</span>
                        </label>
                        <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Warning: d&gt;sponsor works with a fixed supply of ad spaces. You won&apos;t be able to modify this value. Max : 25</p>
                        <div className="flex gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
                          <label htmlFor="numberSelect">Select a number:</label>
                          <select
                            id="numberSelect"
                            value={selectedNumber}
                            onChange={handleNumberChange}
                            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-15 hover:ring-2 dark:text-white"
                          >
                            {[...Array(25)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Step 4 */}
                  <div ref={(el) => (stepsRef.current[3] = el)} className={styles.form__step}>
                    {/* <!-- Unit selling price --> */}
                    <div className="pr-6 pl-2">
                      <h3 className="mb-14">Step 4</h3>
                      <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Unit selling price
                          <span className="text-red">*</span>
                        </label>
                        <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">
                          EUR payment means you&apos;ll receive JEUR tokens (1 JEUR = 1€). USD payment means you&apos;ll receive JUSD tokens (1 JUSD = 1$). You&apos;ll be able to cash out via wire transfer with a service
                          like MtPelerin. You can change the pricing later.
                        </p>
                        <div className="flex  gap-4 items-center text-jacarta-700 dark:text-white">
                          <input
                            id="numberInput"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={selectedUnitPrice}
                            onChange={handleUnitPriceChange}
                            placeholder="Unit selling price"
                            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                          />
                          <div className="flex gap-4">
                            <select
                              id="currency"
                              value={selectedCurrency}
                              onChange={handleCurrencyChange}
                              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                            >
                              <option value="JEUR">JEUR</option>
                              <option value="USDC">USDC</option>
                              <option value="MATIC">MATIC</option>
                              <option value="WETH">WETH</option>
                              <option value="custom">Custom</option>
                            </select>
                            {selectedCurrency === "custom" && (
                              <input
                                type="text"
                                value={customContract}
                                onChange={handleCustomContractChange}
                                placeholder="Contract address"
                                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                              />
                            )}
                          </div>
                        </div>
                        <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mt-3">You&apos;ll earn up to 1600 USDC. As d&gt;sponsor charges a fee of 4%, sponsors will pay 208 USDC.</p>
                      </div>

                      {/* <!-- Royalties --> */}
                      <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
                          Royalties
                          <span className="text-red">*</span>
                        </label>
                        <p className="dark:text-jacarta-300 text-jacarta-400  text-2xs mb-3">
                          Sponsors can sell an ad space ownership on the marketplace. Define the fee you want to get from secondary sales. Sponsors might refuse to buy an ad space if your royalty fee is too high. You can
                          change this value pricing later.
                        </p>
                        <div className="flex  gap-4 items-center text-jacarta-700 dark:text-white">
                          <input
                            id="numberInput"
                            type="number"
                            min="0"
                            max="100"
                            value={selectedRoyalties}
                            onChange={handleRoyaltiesChange}
                            placeholder="Royalties"
                            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-15 hover:ring-2 dark:text-white"
                          />
                          <span>%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.form__bullet__container}>
                  {Array.from({ length: numSteps }).map((_, index) => (
                    <div
                      key={index}
                      ref={(el) => (bulletsRef.current[index] = el)}
                      onClick={() => handleBulletClick(index)}
                      className={`${styles.form__bullet} ${index === currentSlide ? styles["form__bullet--active"] : ""}`}
                    ></div>
                  ))}
                </div>
                <div className={`${styles.form__nav} bg-accent`}>
                  <button type="button" onClick={handlePrevClick} className={`${styles.form__nav__prev} ${currentSlide === 0 ? "disabled" : ""}`}>
                    Back
                  </button>
                  {currentSlide === numSteps - 1 ? (
                    <button type="button" className="bg-accent cursor-pointer rounded-full py-3 px-3 text-end font-semibold text-white transition-all" onClick={handlePreviewModal}>
                      Show preview
                    </button>
                  ) : (
                    <button type="button" onClick={handleNextClick} className={`${styles.form__nav__next} ${currentSlide === numSteps - 1 ? "disabled" : ""}`}>
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
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
