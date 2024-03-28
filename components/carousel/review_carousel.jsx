import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { GetAllAdsOffers } from "../../data/services/AdsOffersService";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Web3Button } from "@thirdweb-dev/react";
import AddProposalRefusedModal from "../modal/adProposalRefusedModal";

const Review_carousel = ({ handleSubmit, pendingProposalData, successFullRefuseModal }) => {
  const [data, setData] = useState([]);
  const [validate, setValidate] = useState({});
  const [comments, setComments] = useState({});
  const [refusedAdModalId, setRefusedAdModalId] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [proposalId, setProposalId] = useState(null);

  useEffect(() => {
    const initialValidateStates = {};
    console.log("pendingProposalData", pendingProposalData.length);
    pendingProposalData.forEach((item) => {
      initialValidateStates[item.tokenId] = false;
    });
    setValidate(initialValidateStates);
  }, []);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const handleInput = (id) => {
    setValidate((currentState) => ({
      ...currentState,
      [id]: !currentState[id],
    }));
  };
  const handleCommentChange = (id, value) => {
    setComments((currentComments) => ({
      ...currentComments,
      [id]: value,
    }));
  };
  const handleItemSubmit = async (offerId, tokenId, proposalId, approuved) => {
    const submissionArgs = {
      offerId: offerId,
      tokenId: tokenId,
      proposalId: proposalId,
      adParameter: "logoURL",
      validated: approuved,
      reason: comments[tokenId] || "",
    };

    await handleSubmit(submissionArgs);
  };
  const openRefuseModal = (offerId, tokenId, proposalId) => {
    setRefusedAdModalId(tokenId);
    setOfferId(offerId);
    setTokenId(tokenId);
    setProposalId(proposalId);
  };

  const closeRefuseModal = () => {
    setRefusedAdModalId(null);
  };
  if (pendingProposalData.length === 0) {
    return <div className="flex justify-center">No pendings ads...</div>;
  }
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        loop={pendingProposalData.length > 2}
        slidesPerView={2}
        navigation={
          pendingProposalData.length > 2
            ? {
                nextEl: ".bids-swiper-button-next",
                prevEl: ".bids-swiper-button-prev",
              }
            : false
        }
        className=" card-slider-4-columns !py-5"
      >
        {pendingProposalData.map((item) => {
          const { records, offerId, tokenId, proposalId } = item;

          return (
            <div key={tokenId}>
              <SwiperSlide className="text-white">
                <article>
                  <div className="dark:bg-jacarta-700 flex dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                    <div className="dark:bg-jacarta-700 w-[250px] dark:border-jacarta-600 border-jacarta-100   items-center justify-center rounded-lg border bg-white py-1.5 px-4">
                      <figure className="mb-4 flex flex-col">
                        <span className="dark:text-jacarta-200 mb-1">Image :</span>
                        <Link href={`/item/${offerId}/${tokenId}`}>
                          <Image src={records.logoURL?.value} alt="" height={230} width={230} className="rounded-[0.625rem] w-auto   h-[150px] object-contain" loading="lazy" />
                        </Link>
                      </figure>
                      <div className="mb-4 flex flex-col">
                        <span className="dark:text-jacarta-200 mb-1">Redirection link :</span>
                        <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                          <button className="js-copy-clipboard flex text-white max-w-[auto] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                            <CopyToClipboard text="userId" onCopy={() => setCopied(true)}>
                              <span>{records.linkURL?.value}</span>
                            </CopyToClipboard>
                          </button>
                        </Tippy>
                      </div>
                    </div>

                    <div className="mt-4 flex  flex-col pl-8 justify-between">
                      <div className="flex flex-col ">
                        <Link href={`/item/${offerId}/${tokenId}`} className="mb-4">
                          <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                            Item n°: <span className="text-accent"> {tokenId} </span>{" "}
                          </span>
                        </Link>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div key="2" className="dropdown-item mb-4 font-display dark:bg-jacarta-600 hover:bg-jacarta-50 block w-full rounded-xl pr-5 py-2 text-left text-sm transition-colors dark:text-white">
                          <span className="flex items-center justify-between">
                            <span className="pl-5">I confirm that I have check the image and the linkURL </span>
                            <input
                              type="checkbox"
                              name="check"
                              className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                              onChange={() => handleInput(tokenId)}
                              checked={validate[tokenId] || false}
                            />
                          </span>
                        </div>
                        <div className="flex items-start space-x-4">
                          <div className="flex items-start gap-4 flex-wrap">
                            <Web3Button
                              contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                              action={() => handleItemSubmit(offerId, tokenId, proposalId, true)}
                              className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "btn-disabled" : "!bg-accent !cursor-pointer"} `}
                            >
                              Validate
                            </Web3Button>

                            <Web3Button
                              contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                              action={() => openRefuseModal(offerId, tokenId, proposalId)}
                              className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[tokenId] ? "btn-disabled" : "!bg-red !cursor-pointer"} `}
                            >
                              Reject
                            </Web3Button>

                            {/* <Link href="{hrefButton}">
                              <button className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-accent !cursor-pointer">Youhou</button>
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>

      {/* <!-- Slider Navigation --> */}
      <div className="group bids-swiper-button-prev swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group bids-swiper-button-next swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
      {refusedAdModalId && (
        <div className="modal fade show bloc">
          <AddProposalRefusedModal
            id={refusedAdModalId}
            offerId={offerId}
            tokenId={tokenId}
            proposalId={proposalId}
            comments={comments[refusedAdModalId]}
            handleCommentChange={handleCommentChange}
            handleItemSubmit={handleItemSubmit}
            closeRefuseModal={closeRefuseModal}
            successFullRefuseModal={successFullRefuseModal}
          />
        </div>
      )}
    </>
  );
};

export default Review_carousel;
