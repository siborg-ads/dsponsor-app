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
  setRefusedValidatedAdModal
}) => {
  const [validate, setValidate] = useState({});
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
                  className="checked:bg-primaryPurple checked:focus:bg-primaryPurple checked:hover:bg-primaryPurple after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
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
                <figure className="flex justify-center">
                  <button onClick={() => openModal(tokenId)}>
                    {getImageUrl(adParametersList) && (
                      <Image
                        src={getImageUrl(adParametersList) ?? ""}
                        alt="logo"
                        height={500}
                        width={500}
                        style={{ objectFit: "contain" }}
                        className="rounded-[0.625rem] w-auto h-[150px] object-contain"
                        loading="lazy"
                      />
                    )}
                  </button>
                </figure>

                <div className="mt-4 flex items-center justify-between ">
                  <Link
                    href={adParametersList.linkURL ?? ""}
                    target="_blank"
                    className="font-display  text-jacarta-900 hover:text-primaryPurple text-base dark:text-white  overflow-hidden text-ellipsis whitespace-nowrap "
                  >
                    <span>{adParametersList?.linkURL}</span>
                  </Link>

                  <div className="dark:border-primaryPink dark:border-opacity-10 ms-14 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                    <span className="text-green text-sm font-medium tracking-tight">
                      # {tokenData ?? formatTokenId(tokenId)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs flex justify-between">
                  <span className="text-primaryPurple text-sm font-bold">
                    <span className="mr-1">🔍</span> Pending
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {modalStates[tokenId] && (
        <div className="modal fade show block">
          <div className="modal-dialog !my-0 flex h-screen max-w-4xl items-center justify-center">
            <Image
              src={
                getImageUrl(
                  pendingProposalData.find((item) => item.tokenId === tokenId).adParametersList
                ) ?? ""
              }
              alt="logo"
              height={500}
              width={500}
              style={{ objectFit: "contain" }}
              className="rounded-2lg min-w-[75px]"
              loading="lazy"
            />
          </div>
          <button type="button" className="btn-close absolute top-6 right-6" onClick={closeModal}>
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
      )}
    </div>
  );
};

export default Review_carousel;
