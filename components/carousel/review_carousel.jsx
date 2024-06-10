import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import AddProposalRefusedModal from "../modal/adProposalRefusedModal";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import config from "../../providers/utils/config";

const Review_carousel = ({
  chainId,
  setSelectedItems,
  selectedItems,
  handleSubmit,
  pendingProposalData,
  successFullRefuseModal,
  setSuccessFullRefuseModal,
  isToken,
  isOwner,
  setRefusedValidatedAdModal,
  refusedValidatedAdModal
}) => {
  const [validate, setValidate] = useState({});
  const [comments, setComments] = useState({});
  const [isApprouvedAd, setIsApprouvedAd] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [isSelectedItem, setIsSelectedItem] = useState({});
  const [modalStates, setModalStates] = useState({});
  const [copied, setCopied] = useState(false);

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
    setModalStates((prev) => ({ ...prev, [tokenId]: true }));
  };

  const closeModal = (tokenId) => {
    setModalStates((prev) => ({ ...prev, [tokenId]: false }));
  };

  const handleInput = (id) => {
    setValidate((currentState) => ({
      ...currentState,
      [id]: !currentState[id]
    }));
  };
  const handleCommentChange = (tokenId, value) => {
    setComments((currentComments) => ({
      ...currentComments,
      [tokenId]: value
    }));
    setSelectedItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.tokenId === tokenId) {
          return { ...item, reason: value };
        }
        return item;
      });
    });
  };

  const handleItemSubmit = async (approuved = false) => {
    let submissionArgs = [];
    setIsApprouvedAd(approuved);
    for (const item of selectedItems) {
      console.log(item, "item");
      let argObject = {
        ...item,
        ...(approuved && { reason: "" }),
        validated: approuved
      };
      submissionArgs.push(argObject);
    }

    await handleSubmit(submissionArgs);
  };
  const openRefuseModal = () => {
    setRefusedValidatedAdModal(true);
  };
  function formatTokenId(str) {
    if (str.length <= 6) {
      return str;
    }
    return str.slice(0, 3) + "..." + str.slice(-3);
  }
  const closeRefuseModal = () => {
    setRefusedValidatedAdModal(null);
    if (successFullRefuseModal) {
      setSelectedItems([]);
      setSuccessFullRefuseModal(false);
    }
  };

  const handleSelection = (item) => {
    if (!isOwner) return;
    setIsFirstSelection(false);
    setIsSelectedItem((prevState) => ({
      ...prevState,
      [item.tokenId]: !prevState[item.tokenId]
    }));

    setSelectedItems((previousItems) => {
      const isAlreadySelected = previousItems.some((i) => i.tokenId === item.tokenId);

      if (isAlreadySelected) {
        return previousItems.filter((i) => i.tokenId !== item.tokenId);
      } else {
        const newItems = item.adParametersKeys.map((key, idx) => ({
          offerId: item.offerId,
          tokenId: item.tokenId,
          proposalId: item.proposalIds[idx],
          adParameter: key,
          reason: comments[item.tokenId] || ""
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
  const successFullRefusedAdModalObject = {
    title: "Refused",
    body: "The ad has been refused successfully ✅",
    button: "Close"
  };
  const successFullValidatedAdModalObject = {
    title: "Validated",
    body: "The ad has been validated successfully 🎉",
    button: "Close"
  };

  if (pendingProposalData.length === 0) {
    return <div className="flex justify-center">No pendings ads...</div>;
  }
  return (
    <div>
      {!isToken && (
        <div>
          <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-6 mb-4">
            <div className=" sm:flex sm:flex-wrap">
              <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                Select an advertisement below to manage its status. If you approve an ad, it will be
                displayed on your media platform. The owner of your ad space retains the ability to
                submit an advertisement even if its status is Pending, Approved, or Denied.{" "}
              </span>
            </div>
          </div>
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
                  className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
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
                className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "btn-disabled" : "!bg-green !cursor-pointer"} `}
              >
                Validate
              </Web3Button>

              <Web3Button
                contractAddress={config[chainId]?.smartContracts?.DSPONSORADMIN?.address}
                action={() => openRefuseModal()}
                className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "btn-disabled" : "!bg-red !cursor-pointer"} `}
              >
                Reject
              </Web3Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {pendingProposalData.map((item) => {
          const { adParametersList, tokenId, proposalIds, tokenData } = item;

          return (
            <article
              key={tokenId}
              className={`  ${isSelectedItem[tokenId] && !isToken ? "border-4 border-jacarta-100 rounded-2xl" : ""}`}
              onClick={() => handleSelection(item)}
            >
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                <figure className="flex justify-center">
                  <button onClick={() => openModal(tokenId)}>
                    {getImageUrl(adParametersList) && (
                      <Image
                        src={getImageUrl(adParametersList)}
                        alt="logo"
                        height={75}
                        width={75}
                        objectFit="contain"
                        className="rounded-[0.625rem] w-auto h-[150px] object-contain"
                        loading="lazy"
                      />
                    )}
                  </button>

                  {/* <!-- Modal --> */}
                  <div
                    className={modalStates[tokenId] ? "modal fade show block" : "modal fade"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                      <Image
                        src={getImageUrl(adParametersList)}
                        alt="logo"
                        height={250}
                        width={250}
                        objectFit="contain"
                        className="rounded-2lg min-w-[75px]"
                        loading="lazy"
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-close absolute top-6 right-6"
                      onClick={() => closeModal(tokenId)}
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
                  {/* <!-- end modal --> */}
                </figure>
                {/* <figure className="flex justify-center">
                  <Image src={adParametersList?.imageURL ? adParametersList?.imageURL : "/"} alt="logo" height={230} width={230} className="rounded-[0.625rem] w-auto   h-[150px] object-contain" loading="lazy" />
                </figure> */}
                <div className="mt-4 flex items-center justify-between ">
                  <Link
                    href={adParametersList?.linkURL ? adParametersList.linkURL : "/"}
                    target="_blank"
                    className="font-display  text-jacarta-700 hover:text-accent text-base dark:text-white  overflow-hidden text-ellipsis whitespace-nowrap "
                  >
                    <span>{adParametersList?.linkURL}</span>
                  </Link>

                  <div className="dark:border-jacarta-600 ms-14 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                    <span className="text-green text-sm font-medium tracking-tight">
                      # {tokenData ? tokenData : formatTokenId(tokenId)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs flex justify-between">
                  <span className="text-accent text-sm font-bold">🔍 Pending</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {refusedValidatedAdModal && (
        <div className="modal fade show bloc">
          <AddProposalRefusedModal
            refusedValidatedAdModal={refusedValidatedAdModal}
            selectedItems={selectedItems}
            handleCommentChange={handleCommentChange}
            handleItemSubmit={handleItemSubmit}
            closeRefuseModal={closeRefuseModal}
            successFullRefuseModal={successFullRefuseModal}
            successFullModalObject={
              isApprouvedAd ? successFullValidatedAdModalObject : successFullRefusedAdModalObject
            }
          />
        </div>
      )}
    </div>
  );
};

export default Review_carousel;
