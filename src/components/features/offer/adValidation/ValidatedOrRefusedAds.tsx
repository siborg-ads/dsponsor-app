import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { ProposalValidation } from "../AdValidation";

const ValidatedOrRefusedAds = ({
  statut,
  proposalData,
  isToken
}: {
  statut: boolean;
  proposalData: ProposalValidation[];
  isToken?: boolean;
}) => {
  type Proposal = {
    tokenId: string;
    offerId: string;
    tokenData: string;
    hasImage: boolean;
    hasLink: boolean;
    adParametersList: {
      aspectRatio?: string;
      cssAspectRatio?: string;
      "imageURL-1:1"?: string;
      linkURL?: string;
    };
    reasons: string[];
  };

  console.log(proposalData);
  const [modalStates, setModalStates] = useState({});
  const [statutItem, setStatutItem] = useState<"check" | "refused" | undefined>(undefined);
  const groupedProposals = useMemo(() => {
    const grouped = {} as { [key: string]: Proposal };
    proposalData.forEach((proposal) => {
      if (!grouped[proposal.tokenId]) {
        grouped[proposal.tokenId] = {
          tokenId: proposal.tokenId,
          offerId: proposal.offerId,
          tokenData: proposal.tokenData,
          hasImage: false,
          hasLink: false,
          adParametersList: {},
          reasons: []
        };
      }

      if (proposal.reason && !grouped[proposal.tokenId].reasons.includes(proposal.reason)) {
        grouped[proposal.tokenId].reasons.push(proposal.reason);
      }

      grouped[proposal.tokenId].adParametersList[proposal.paramId] = proposal.data;

      if (proposal.type === "image") {
        grouped[proposal.tokenId].hasImage = true;
        grouped[proposal.tokenId].adParametersList = {
          ...grouped[proposal.tokenId].adParametersList,
          aspectRatio: proposal.aspectRatio,
          cssAspectRatio: proposal.cssAspectRatio
        };
      } else if (proposal.type === "link") {
        grouped[proposal.tokenId].hasLink = true;
      }
    });

    console.log(grouped);
    return grouped;
  }, [proposalData]);

  const openModal = (tokenId) => {
    setModalStates((prev) => ({ ...prev, [tokenId]: true }));
  };

  const closeModal = (tokenId) => {
    setModalStates((prev) => ({ ...prev, [tokenId]: false }));
  };

  useEffect(() => {
    if (statut) {
      setStatutItem("check");
    } else {
      setStatutItem("refused");
    }
  }, [proposalData, statut]);

  function formatTokenId(str) {
    if (str.length <= 6) {
      return str;
    }
    return str.slice(0, 3) + "..." + str.slice(-3);
  }
  const getImageUrl = (adParams) => {
    if (!adParams) return "/";

    const imageKey = Object.keys(adParams).find((key) => key.startsWith("imageURL"));
    return imageKey ? adParams[imageKey] : "/";
  };

  if (proposalData?.length === 0) {
    return (
      <div className="flex justify-center">
        {statut ? "No validated ads..." : "No refused ads..."}
      </div>
    );
  }

  return (
    <>
      {/* <!-- Activity Tab --> */}
      <div className="tab-pane fade">
        {/* <!-- Records / Filter --> */}
        {isToken && (
          <div className="p-6 mb-4 bg-white dark:bg-secondaryBlack rounded-2lg">
            <div className=" sm:flex sm:flex-wrap">
              <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                This ad is displayed on the offer creator&apos;s interfaces!
              </span>
            </div>
          </div>
        )}
        <div className="lg:flex">
          {/* <!-- Records --> */}

          <div className="mb-10 space-y-5 shrink-0 basis-8/12 lg:mb-0 lg:pr-10">
            {Object.keys(groupedProposals).map((key) => {
              const item = groupedProposals[key];
              const { adParametersList, tokenId, reasons, tokenData } = item;

              return (
                <div
                  key={tokenId}
                  className="dark:bg-secondaryBlack  gap-5 p-4 dark:border-jacarta-700 transition-shadow hover:shadow-lg border-jacarta-100 rounded-2.5xl relative flex"
                >
                  <div className="relative flex flex-col items-center w-full gap-5 sm:flex-row">
                    <figure className="self-start w-48 h-auto">
                      <button className="w-full h-full" onClick={() => openModal(tokenId)}>
                        {getImageUrl(adParametersList) && item.hasImage && (
                          <Image
                            src={getImageUrl(adParametersList) ?? ""}
                            alt={"image title"}
                            height={300}
                            width={300}
                            objectFit="contain"
                            className="w-full h-full rounded-2lg"
                            loading="lazy"
                          />
                        )}
                      </button>

                      {/* Modal */}
                      {modalStates[tokenId] && (
                        <div
                          className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen max-w-full max-h-screen backdrop-blur-xl"
                          onClick={(e) => {
                            if (e.target === e.currentTarget) {
                              closeModal(tokenId);
                            }
                          }}
                        >
                          <div
                            className="flex items-center justify-center max-w-full max-h-full"
                            style={{
                              aspectRatio: `${adParametersList?.aspectRatio ?? "auto"}`
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent click through to the backdrop
                          >
                            <div className="relative flex items-center justify-center w-3/4 max-w-full max-h-full h-3/4">
                              <div className="relative flex items-center justify-center h-full max-w-full max-h-full overflow-hidden bg-white border-2 border-dotted border-jacarta-100 dark:bg-jacarta-200 bg-opacity-20 backdrop-blur-xl dark:bg-opacity-20 dark:border-jacarta-100">
                                {item.hasImage && (
                                  <Image
                                    src={getImageUrl(item.adParametersList) ?? ""}
                                    alt="logo"
                                    height={1000}
                                    width={1000}
                                    className="object-contain object-center h-full max-w-full max-h-full"
                                    loading="lazy"
                                  />
                                )}
                              </div>
                              <button
                                type="button"
                                className="absolute top-0 right-0 -p-10"
                                onClick={() => closeModal(tokenId)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="w-6 h-6 fill-white"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* End Modal */}
                    </figure>

                    <div className="flex flex-col w-full gap-4">
                      <div className="flex flex-col w-full">
                        <h3 className="text-sm text-jacarta-900 dark:text-jacarta-100">Item</h3>
                        <span className="font-medium text-green">
                          {tokenData ?? formatTokenId(tokenId)}
                        </span>
                      </div>

                      {adParametersList.linkURL && (
                        <div className="flex flex-col w-full">
                          <h3 className="text-sm text-jacarta-900 dark:text-jacarta-100">Link</h3>
                          <button className="flex min-w-[20px] text-green hover:text-opacity-80 hover:underline select-none overflow-ellipsis whitespace-nowrap">
                            <Link href={adParametersList.linkURL} target="_blank">
                              {adParametersList.linkURL.length > 50
                                ? `${adParametersList.linkURL.slice(0, 20)}...${adParametersList.linkURL.slice(-20)}`
                                : adParametersList.linkURL}
                            </Link>
                          </button>
                        </div>
                      )}
                      {reasons.length !== 0 && (
                        <div className="flex flex-col w-full">
                          <h3 className="text-sm text-jacarta-900 dark:text-jacarta-100">Reason</h3>
                          {reasons.map((reason, i) => (
                            <span key={i} className="text-white">
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="self-start p-3 ml-auto border rounded-full dark:border-jacarta-800 border-jacarta-100">
                    <Image
                      width={24}
                      height={24}
                      src={`/images/status/${statutItem}.svg`}
                      alt="icon"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* <!-- Filters --> */}

          {/* <aside className="basis-4/12 lg:pl-5">
           
             <form action="search" className="relative block mb-12" onSubmit={handleSubmit}>
              <input
                type="search"
                className="text-jacarta-900 placeholder-jacarta-500 focus:ring-primaryPurple border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                placeholder="Search"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="absolute top-0 left-0 flex items-center justify-center w-12 h-full rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 fill-jacarta-500 dark:fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
                </svg>
              </button>
            </form>

            <h3 className="mb-4 font-semibold font-display text-jacarta-100 dark:text-white">Filters</h3>
            <div className="flex flex-wrap">
              {filterData.map((category, i) => {
                return (
                  <button
                    className={
                      filterVal === i
                        ? "dark:border-jacarta-800 group bg-primaryPurple border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border px-4 py-3 border-transparent text-white dark:border-transparent"
                        : "dark:border-jacarta-800 dark:bg-secondaryBlack group dark:hover:bg-primaryPurple hover:bg-primaryPurple border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border bg-white px-4 py-3 hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent"
                    }
                    key={i}
                    onClick={() => {
                      handleFilter(category);
                      setFilterVal(i);
                    }}
                  >
                    <svg className={filterVal === i ? "icon mr-2 h-4 w-4 fill-white" : "icon fill-jacarta-700 mr-2 h-4 w-4 group-hover:fill-white dark:fill-white"}>
                      <use xlinkHref={`/icons.svg#icon-${category}`}></use>
                    </svg>
                    <span className="font-medium capitalize text-2xs">{category}</span>
                  </button>
                );
              })}
            </div> 
          </aside> */}
        </div>
      </div>
    </>
  );
};

export default ValidatedOrRefusedAds;
