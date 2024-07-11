import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import config from "../../config/config";

const Review_carousel = ({
  chainId,
  setSelectedItems,
  selectedItems,
  handleItemSubmit,
  pendingProposalData,
  comments,
  isToken,
  isOwner,
  setRefusedValidatedAdModal,
  itemTokenId
}) => {
  const [validate, setValidate] = useState({});
  const [tokenId, setTokenId] = useState(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [isSelectedItem, setIsSelectedItem] = useState({});
  const [modalStates, setModalStates] = useState({});
  const [copied, setCopied] = useState(false);
  const [detectedRatio, setDetectedRatio] = useState("");
  const [detectedRatioIsGood, setDetectedRatioIsGood] = useState(false);

  useEffect(() => {
    console.log("detectedRatio", detectedRatio);
    if (detectedRatio) {
      // check if image ratio is good or not
      const expectedRatio = pendingProposalData?.find(
        (item) => Number(item.tokenId) === Number(itemTokenId)
      )?.adParametersList?.aspectRatio;
      const detectedRatioFloat = parseFloat(detectedRatio);

      if (detectedRatioFloat === expectedRatio) {
        setDetectedRatioIsGood(true);
      } else {
        setDetectedRatioIsGood(false);
      }
    }
  }, [detectedRatio, pendingProposalData, itemTokenId]);

  useEffect(() => {
    const initialValidateStates = {};
    pendingProposalData.forEach((item) => {
      initialValidateStates[item.tokenId] = false;
    });
    setValidate(initialValidateStates);
  }, [pendingProposalData]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const openModal = (tokenId) => {
    setTokenId(tokenId);
    setModalStates((prev) => ({ ...prev, [tokenId]: true }));
  };

  const closeModal = () => {
    setModalStates((prev) => ({ ...prev, [tokenId]: false }));
  };

  const handleInput = (id) => {
    setValidate((currentState) => ({
      ...currentState,
      [id]: !currentState[id]
    }));
  };

  const openRefuseModal = () => {
    setRefusedValidatedAdModal(true);
  };

  const formatTokenId = (str) => {
    if (str.length <= 6) {
      return str;
    }
    return str.slice(0, 3) + "..." + str.slice(-3);
  };

  const handleSelection = (item) => {
    if (!isOwner) return;

    setIsFirstSelection(false);

    setIsSelectedItem((prevState) => ({
      ...prevState,
      [item.tokenId]: !prevState[item.tokenId]
    }));

    setSelectedItems((previousItems) => {
      if (previousItems.length === 0) {
        return item.adParametersKeys.map((key, idx) => ({
          offerId: item.offerId,
          tokenId: item.tokenId,
          proposalId: item.proposalIds[idx],
          adParameter: key,
          reason: comments?.[item.tokenId] ?? ""
        }));
      }

      const isAlreadySelected = previousItems.some((i) => i.tokenId === item.tokenId);

      if (isAlreadySelected) {
        return previousItems.filter((i) => i.tokenId !== item.tokenId);
      } else {
        const newItems = item.adParametersKeys.map((key, idx) => ({
          offerId: item.offerId,
          tokenId: item.tokenId,
          proposalId: item.proposalIds[idx],
          adParameter: key,
          reason: comments?.[item.tokenId] ?? ""
        }));

        return [...previousItems, ...newItems];
      }
    });
  };

  const getImageUrl = (adParams) => {
    if (!adParams) return "/";

    const imageKey = Object.keys(adParams).find((key) => key.startsWith("imageURL"));
    return imageKey ? adParams[imageKey] : "/";
  };

  if (pendingProposalData.length === 0) {
    return <div className="flex justify-center">No pending ads...</div>;
  }

  return (
    <div>
      {!isToken && (
        <div>
          {isOwner && (
            <div className="dark:bg-secondaryBlack dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-6 mb-4">
              <div className=" sm:flex sm:flex-wrap">
                <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                  Select an advertisement below to manage its status. If you approve an ad, it will
                  be displayed on your media platform. The owner of your ad space retains the
                  ability to submit an advertisement even if its status is Pending, Approved, or
                  Denied.{" "}
                </span>
              </div>
            </div>
          )}
          <div
            className={`fixed dark:border-jacarta-500 border  bottom-0 blury-background left-0 right-0 px-4 py-3  ${isFirstSelection ? "hidden" : selectedItems?.length === 0 ? "animated-modalSelectedItemDown" : "animated-modalSelectedItemUp"}`}
          >
            <div className="dropdown-item mb-4 font-display   block w-full rounded-xl  text-left text-sm transition-colors dark:text-white">
              <span className="flex items-center justify-center gap-6">
                <span className="mr-4">
                  I confirm that I have checked all the ads selected{" "}
                  <span className="text-green text-md ml-1">
                    {Object.values(isSelectedItem).filter((value) => value === true).length}
                  </span>{" "}
                </span>
                <input
                  type="checkbox"
                  name="check"
                  className="checked:bg-green checked:focus:bg-green checked:hover:bg-green after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                  onChange={() => handleInput(tokenId)}
                  checked={validate[tokenId] || false}
                />
              </span>
            </div>

            <div className="flex justify-center  gap-4 flex-wrap">
              <Web3Button
                contractAddress={config[chainId]?.smartContracts?.DSPONSORADMIN?.address}
                action={() =>
                  toast.promise(handleItemSubmit(true), {
                    pending: "Waiting for confirmation 🕒",
                    success: "Transaction confirmed 👌",
                    error: "Transaction rejected 🤯"
                  })
                }
                className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "!btn-disabled !cursor-not-allowed" : "!bg-green !cursor-pointer"} `}
              >
                Validate
              </Web3Button>

              <Web3Button
                contractAddress={config[chainId]?.smartContracts?.DSPONSORADMIN?.address}
                action={() => openRefuseModal()}
                className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "!btn-disabled !cursor-not-allowed" : "!bg-red !cursor-pointer"} `}
              >
                Reject
              </Web3Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {pendingProposalData.map((item) => {
          const { adParametersList, tokenId, tokenData } = item;

          return (
            <article
              key={tokenId}
              className={`  ${isSelectedItem[tokenId] && !isToken ? "border-4 border-jacarta-100 rounded-2xl" : ""}`}
              onClick={() => handleSelection(item)}
            >
              <div className="dark:bg-secondaryBlack hover:-translate-y-1 duration-500 cursor-pointer dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100">
                <figure className="flex justify-center w-full">
                  {getImageUrl(adParametersList) && (
                    <div className="flex flex-col gap-2 w-full">
                      <Image
                        src={getImageUrl(adParametersList) ?? ""}
                        alt="logo"
                        height={600}
                        width={600}
                        style={{ objectFit: "contain" }}
                        className="rounded-[0.625rem] w-full h-auto object-contain"
                        loading="lazy"
                        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                          // we want ratio in the format "width:height" but the minimal fraction as possible
                          // for that we find the greatest common divisor
                          const gcd = (a, b) => (b ? gcd(b, a % b) : a);
                          const ratio = `${naturalWidth / gcd(naturalWidth, naturalHeight)}:${
                            naturalHeight / gcd(naturalWidth, naturalHeight)
                          }`;
                          setDetectedRatio(ratio);
                        }}
                        onClick={(event) => {
                          openModal(tokenId);

                          // prevent the parent onClick event from firing
                          event.stopPropagation(); // it won't select the item
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => openModal(tokenId)}
                          className="text-left text-xs flex items-center hover:cursor-pointer hover:underline"
                        >
                          Preview Image 🔎
                        </button>
                        <div className="dark:border-primaryPink dark:border-opacity-10  border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                          <span className="text-green text-sm font-medium tracking-tight">
                            # {tokenData ?? formatTokenId(tokenId)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 border-t border-white border-opacity-10 py-2">
                        <span className="text-xs text-jacarta-100 dark:text-jacarta-100">
                          Expected Ratio:{" "}
                          <span className="text-green">{adParametersList?.aspectRatio}</span>
                        </span>
                        {getImageUrl(adParametersList) && (
                          <span className="text-xs text-jacarta-100 dark:text-jacarta-100">
                            Detected Ratio:{" "}
                            <span className={`${detectedRatioIsGood ? "text-green" : "text-red"}`}>
                              {detectedRatio}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </figure>

                <div className="flex flex-col gap-2 border-t border-white border-opacity-10">
                  {adParametersList && (
                    <div className="flex items-center justify-between ">
                      <Link
                        href={adParametersList.linkURL ?? ""}
                        target="_blank"
                        className="font-display text-jacarta-900 hover:text-primaryPink text-sm dark:text-white  overflow-hidden text-ellipsis whitespace-nowrap "
                      >
                        <span>{adParametersList?.linkURL}</span>
                      </Link>
                    </div>
                  )}
                  <div className="text-xs flex justify-between">
                    <span
                      className={`${!isSelectedItem[tokenId] || isToken ? "text-primaryPink" : "text-green"} text-sm font-bold`}
                    >
                      <span>{isSelectedItem[tokenId] && !isToken && "✅ "}</span>
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {modalStates[tokenId] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl h-screen w-full max-h-screen max-w-full">
          <div
            className="flex justify-center items-center max-w-full max-h-full"
            style={{
              aspectRatio: `${pendingProposalData?.find((item) => item.tokenId === tokenId)?.adParametersList?.cssAspectRatio}`
            }}
          >
            <div className="relative flex items-center justify-center max-w-full max-h-full w-3/4 h-3/4 p-6">
              <div className="relative flex justify-center items-center h-full max-w-full max-h-full border-2 border-dotted border-jacarta-100 bg-white dark:bg-jacarta-200 bg-opacity-20 backdrop-blur-xl dark:bg-opacity-20 dark:border-jacarta-100 overflow-hidden">
                <Image
                  src={
                    getImageUrl(
                      pendingProposalData?.find((item) => item.tokenId === tokenId)
                        ?.adParametersList
                    ) ?? ""
                  }
                  alt="logo"
                  height={2000}
                  width={2000}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                className="absolute top-0 right-0 -p-10"
                onClick={() => closeModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review_carousel;
