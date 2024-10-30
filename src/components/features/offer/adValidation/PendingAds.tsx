import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { ChainObject } from "@/types/chain";
import { ProposalValidation } from "../AdValidation";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface PendingAdsProps {
  chainConfig: ChainObject;
  // eslint-disable-next-line no-unused-vars
  setSelectedItems: (value: any) => void;
  selectedItems: any[];
  // eslint-disable-next-line no-unused-vars
  handleItemSubmit: (i: any) => Promise<unknown>;
  pendingProposalData: any;
  comments?: any;
  isToken: boolean;
  isAdmin: boolean;
  // eslint-disable-next-line no-unused-vars
  setRefusedValidatedAdModal: (value: boolean) => void;
  aspectRatio: string;
  // eslint-disable-next-line no-unused-vars
  setSponsorHasAtLeastOneRejectedProposalAndNoPending: (value: boolean) => void;
}

const PendingAds: React.FC<PendingAdsProps> = ({
  chainConfig,
  setSelectedItems,
  selectedItems,
  handleItemSubmit,
  pendingProposalData,
  comments,
  isToken,
  isAdmin,
  setRefusedValidatedAdModal,
  aspectRatio: expectedRatio,
  setSponsorHasAtLeastOneRejectedProposalAndNoPending
}) => {
  const [validate, setValidate] = useState({});
  const [tokenId, setTokenId] = useState(null);
  const [isFirstSelection, setIsFirstSelection] = useState(true);
  const [isSelectedItem, setIsSelectedItem] = useState({});
  const [modalStates, setModalStates] = useState({});
  const [copied, setCopied] = useState(false);
  const [detectedRatios, setDetectedRatios] = useState<string[]>([]);
  const [detectedRatiosAreGood, setDetectedRatiosAreGood] = useState<boolean[]>([]);
  const [markdownPreview, setMarkdownPreview] = useState("");

  useEffect(() => {
    if (detectedRatios.length) {
      let newDetectedRatiosAreGood: boolean[] = [];

      detectedRatios.forEach((detectedRatio: string) => {
        if (!detectedRatio || !expectedRatio) {
          newDetectedRatiosAreGood.push(false);
          return;
        }

        const realDetectedRatio = detectedRatio?.split(":");
        const realWidth = Number(realDetectedRatio[0]);
        const realHeight = Number(realDetectedRatio[1]);
        const realDetectedRatioValue = realWidth / realHeight;

        const realExpectedRatio = expectedRatio.split(":");
        const realExpectedWidth = Number(realExpectedRatio[0]);
        const realExpectedHeight = Number(realExpectedRatio[1]);
        const realExpectedRatioValue = realExpectedWidth / realExpectedHeight;

        const detectedRatioIsGood = realDetectedRatioValue === realExpectedRatioValue;
        newDetectedRatiosAreGood.push(detectedRatioIsGood);
      });

      setDetectedRatiosAreGood(newDetectedRatiosAreGood);
    }
  }, [detectedRatios, expectedRatio]);

  const closeModal = () => {
    if (!tokenId) return;
    setModalStates((prev) => ({ ...prev, [tokenId as any]: false }));
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMarkdownPreview("");
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  useEffect(() => {
    const initialValidateStates = {};
    pendingProposalData?.forEach((item: ProposalValidation) => {
      initialValidateStates[item.id] = false;
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

  const handleSelection = (item: ProposalValidation) => {
    if (!isAdmin) return;

    setIsFirstSelection(false);

    setIsSelectedItem((prevState) => ({
      ...prevState,
      [item.id]: !prevState[item.id]
    }));

    setSelectedItems((previousItems) => {
      if (previousItems.length === 0) {
        const selectedItem = {
          tokenId: item.tokenId,
          offerId: item.offerId,
          proposalId: item.id,
          adParameter: item.paramId,
          reason: comments?.[item.id] ?? ""
        };
        return [selectedItem];
      }

      const isAlreadySelected = previousItems.some((i) => i.proposalId === item.id);

      if (isAlreadySelected) {
        return previousItems.filter((i) => i.proposalId !== item.id);
      } else {
        const newItem = {
          tokenId: item.tokenId,
          offerId: item.offerId,
          proposalId: item.id,
          adParameter: item.paramId,
          reason: comments?.[item.id] ?? ""
        };

        return [...previousItems, newItem];
      }
    });
  };

  const getImageUrl = (adParams) => {
    if (!adParams) return "/";

    const imageKey = Object.keys(adParams).find((key) => key.startsWith("imageURL"));
    return imageKey ? adParams[imageKey] : "/";
  };

  if (pendingProposalData?.length === 0) {
    return <div className="flex justify-center">No pending ads...</div>;
  }

  return (
    <div>
      {!isToken && (
        <div>
          {isAdmin && (
            <div className="p-6 mb-4 bg-white border dark:bg-secondaryBlack dark:border-jacarta-800 border-jacarta-100 rounded-2lg">
              <div className=" sm:flex sm:flex-wrap">
                <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
                  Select an advertisement below to manage its status. If you approve an ad, it will
                  be displayed on your media platform. The owner of your ad space retains the
                  ability to submit an advertisement even if its status is Pending, Approved, or
                  Denied.{" "}
                </span>
              </div>
            </div>
          )}
          <div
            className={`fixed flex flex-col items-center justify-center dark:border-jacarta-500 border z-[100] bottom-0 blury-background left-0 right-0 px-4 py-3  ${isFirstSelection ? "hidden" : selectedItems?.length === 0 ? "animated-modalSelectedItemDown" : "animated-modalSelectedItemUp"}`}
          >
            <div className="block w-full mb-4 text-sm text-left transition-colors dropdown-item font-display rounded-xl dark:text-white">
              <span className="flex items-center justify-center gap-6">
                <span className="mr-4">
                  I confirm that I have checked all the ads selected{" "}
                  <span className="ml-1 text-green text-md">
                    {Object.values(isSelectedItem).filter((value) => value === true).length}
                  </span>{" "}
                </span>
                <Input
                  type="checkbox"
                  name="check"
                  className=" !text-green border-jacarta-200 focus:ring-green/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
                  onChange={() => handleInput("all")}
                  checked={validate["all"] || false}
                />
              </span>
            </div>

            <div className="grid max-w-xs grid-cols-2 gap-4">
              <StyledWeb3Button
                contractAddress={chainConfig?.smartContracts?.DSPONSORADMIN?.address}
                onClick={async () => {
                  await toast.promise(handleItemSubmit(true), {
                    pending: "Waiting for confirmation 🕒",
                    success: "Transaction confirmed 👌",
                    error: "Transaction rejected 🤯"
                  });
                }}
                isDisabled={!validate["all"]}
                defaultText="Validate"
                isGreen
              />

              <StyledWeb3Button
                contractAddress={chainConfig?.smartContracts?.DSPONSORADMIN?.address}
                onClick={() => {
                  openRefuseModal();

                  if (pendingProposalData?.length === 1) {
                    setSponsorHasAtLeastOneRejectedProposalAndNoPending(true);
                  }
                }}
                isDisabled={!validate["all"]}
                defaultText="Reject"
                isRed
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
        {pendingProposalData?.map((item: ProposalValidation, itemIndex: number) => {
          const { tokenId, tokenData, data, id } = item;
          if (item.type === "link") {
            return (
              <article key={id} onClick={() => handleSelection(item)}>
                <div
                  className={cn(
                    "dark:bg-secondaryBlack hover:-translate-y-1 duration-500 cursor-pointer rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100",
                    isSelectedItem[id] && !isToken
                      ? "border-4 border-jacarta-100 rounded-2xl"
                      : "dark:border-jacarta-700 border-jacarta-100"
                  )}
                >
                  <figure className="flex justify-center w-full">
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="flex items-center text-lg text-left text-bold">Link</p>
                            <ResponsiveTooltip text="This is a link that have been submitted for the token you can approve or reject it">
                              <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
                            </ResponsiveTooltip>
                          </div>
                          <div className="flex items-center px-2 py-1 border rounded-md dark:border-primaryPink dark:border-opacity-10 border-jacarta-100 whitespace-nowrap">
                            <span className="text-sm font-medium tracking-tight text-green">
                              # {tokenData ?? formatTokenId(tokenId)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-10">
                          <Link
                            href={item.data ?? ""}
                            target="_blank"
                            className="text-sm break-all select-none font-display text-wrap text-jacarta-900 hover:text-primaryPink dark:text-white text-ellipsis whitespace-nowrap max-w-[20rem] flex"
                          >
                            <span className="text-sm font-medium tracking-tight text-primaryPurple hover:text-opacity-80 hover:underline">
                              {item.data}
                            </span>
                          </Link>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-white border-opacity-10">
                          <span
                            className={`${!isSelectedItem[id] || isToken ? "text-primaryPink" : "text-green"} text-sm font-bold`}
                          >
                            <span>{isSelectedItem[id] && !isToken && "✅ "}</span>
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </article>
            );
          } else if (item.type === "text") {
            return (
              <article key={id} onClick={() => handleSelection(item)}>
                <div
                  className={cn(
                    "dark:bg-secondaryBlack hover:-translate-y-1 duration-500 cursor-pointer rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100",
                    isSelectedItem[id] && !isToken
                      ? "border-4 border-jacarta-100 rounded-2xl"
                      : "dark:border-jacarta-700 border-jacarta-100"
                  )}
                >
                  <figure className="flex justify-center w-full">
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="flex items-center text-lg text-left text-bold">
                              Text Markdown
                            </p>
                            <ResponsiveTooltip text="This is a text that have been submitted for the token you can approve or reject it">
                              <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
                            </ResponsiveTooltip>
                          </div>
                          <div className="flex items-center px-2 py-1 border rounded-md dark:border-primaryPink dark:border-opacity-10 border-jacarta-100 whitespace-nowrap">
                            <span className="text-sm font-medium tracking-tight text-green">
                              # {tokenData ?? formatTokenId(tokenId)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-white border-opacity-10">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMarkdownPreview(item.data);
                              }}
                              className="flex items-center text-left text-md hover:cursor-pointer hover:underline"
                            >
                              Preview Text 🔎
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-white border-opacity-10">
                          <span
                            className={`${!isSelectedItem[id] || isToken ? "text-primaryPink" : "text-green"} text-sm font-bold`}
                          >
                            <span>{isSelectedItem[id] && !isToken && "✅ "}</span>
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </article>
            );
          }

          return (
            <article key={tokenId} onClick={() => handleSelection(item)}>
              <div
                className={cn(
                  "dark:bg-secondaryBlack hover:-translate-y-1 duration-500 cursor-pointer rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-100",
                  isSelectedItem[id] && !isToken
                    ? "border-4 border-jacarta-100 rounded-2xl"
                    : "dark:border-jacarta-700 border-jacarta-100"
                )}
              >
                <figure className="flex justify-center w-full">
                  {data && (
                    <div className="flex flex-col w-full gap-2 ">
                      <div className="flex items-center justify-between pb-2 border-white border-b-1 border-opacity-10">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(tokenId)}
                            className="flex items-center text-lg text-left text-bold"
                          >
                            Image
                          </button>
                          <ResponsiveTooltip text="This is an image that have been submitted for the token you can approve or reject it">
                            <QuestionMarkCircleIcon className="w-4 h-4 text-white" />
                          </ResponsiveTooltip>
                        </div>
                        <div className="flex items-center px-2 py-1 border rounded-md dark:border-primaryPink dark:border-opacity-10 border-jacarta-100 whitespace-nowrap">
                          <span className="text-sm font-medium tracking-tight text-green">
                            # {tokenData ?? formatTokenId(tokenId)}
                          </span>
                        </div>
                      </div>
                      <Image
                        src={data ?? "/images/gradients/gradient_light.jpg"}
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

                          // put ratio at the itemIndex position of the detectedRatios array
                          setDetectedRatios((prev) => {
                            const newDetectedRatios = [...prev];
                            newDetectedRatios[itemIndex] = ratio;
                            return newDetectedRatios;
                          });
                        }}
                        onClick={(event) => {
                          openModal(tokenId);

                          // prevent the parent onClick event from firing
                          event.stopPropagation(); // it won't select the item
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(tokenId);
                          }}
                          className="flex items-center text-xs text-left hover:cursor-pointer hover:underline"
                        >
                          Preview Image 🔎
                        </button>
                      </div>
                      {expectedRatio && (
                        <div className="flex flex-col gap-2 py-2 border-t border-white border-opacity-10">
                          <span className="text-xs text-jacarta-100 dark:text-jacarta-100">
                            Expected Ratio: <span className="text-green">{item.aspectRatio}</span>
                          </span>

                          {data && (
                            <span className="text-xs text-jacarta-100 dark:text-jacarta-100">
                              Detected Ratio:{" "}
                              <span
                                className={`${detectedRatiosAreGood[itemIndex] ? "text-green" : "text-red"}`}
                              >
                                {detectedRatios[itemIndex] ?? "N/A"}
                              </span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </figure>

                <div className="flex flex-col gap-2 pt-2 border-t border-white border-opacity-10">
                  <div className="flex justify-between text-xs">
                    <span
                      className={`${!isSelectedItem[id] || isToken ? "text-primaryPink" : "text-green"} text-sm font-bold`}
                    >
                      <span>{isSelectedItem[id] && !isToken && "✅ "}</span>
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {modalStates[tokenId ?? 0] && (
        <button
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen max-w-full max-h-screen backdrop-blur-xl"
        >
          <div
            className="flex items-center justify-center max-w-full max-h-full"
            style={{
              aspectRatio: `${pendingProposalData?.find((item) => !!item?.tokenId && tokenId && BigInt(item?.tokenId) === BigInt(tokenId))?.cssAspectRatio}`
            }}
          >
            <div className="relative flex items-center justify-center w-3/4 max-w-full max-h-full h-3/4">
              <div className="relative flex items-center justify-center h-full max-w-full max-h-full overflow-hidden bg-white border-2 border-dotted border-jacarta-100 dark:bg-jacarta-200 bg-opacity-20 backdrop-blur-xl dark:bg-opacity-20 dark:border-jacarta-100">
                <Image
                  src={
                    pendingProposalData?.find(
                      (item) =>
                        !!item?.tokenId &&
                        tokenId &&
                        BigInt(item?.tokenId) === BigInt(tokenId) &&
                        item?.type === "image"
                    )?.data ?? ""
                  }
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="object-contain object-center h-full max-w-full max-h-full"
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
                  className="w-6 h-6 fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>
          </div>
        </button>
      )}
      {markdownPreview && (
        <button
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMarkdownPreview("");
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen max-w-full max-h-screen backdrop-blur-xl"
        >
          <div className="relative flex items-center justify-center w-1/2 max-w-full max-h-full overflow-hidden border-2 border-dotted h-1/2 border-jacarta-100 bg-opacity-20 backdrop-blur-xl dark:bg-opacity-20 dark:border-jacarta-100">
            <button
              type="button"
              className="absolute top-0 right-0 z-50 -p-10"
              onClick={() => setMarkdownPreview("")}
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
            <MDEditor
              value={markdownPreview}
              preview="preview"
              className="w-full max-w-full max-h-full min-h-full"
              hideToolbar={true}
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default PendingAds;
