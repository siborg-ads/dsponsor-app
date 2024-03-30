import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { bidsData } from "../../data/bids_data";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { bidsModalShow } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import Likes from "../likes";
import { execute } from "../../.graphclient";
import { gql } from "@apollo/client";
import { GetAllAdsOffers } from "../../data/services/AdsOffersService";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Web3Button } from "@thirdweb-dev/react";
import AddProposalRefusedModal from "../modal/adProposalRefusedModal";

const Review_carousel = ({ handleSubmit, successFullRefuseModal }) => {
  const [data, setData] = useState([]);
  const [validate, setValidate] = useState({});
  const [comments, setComments] = useState({});
  const [refusedAdModalId, setRefusedAdModalId] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [proposalId, setProposalId] = useState(null);


  useEffect(() => {
    const fetchAdsOffers = async () => {
      const result = await GetAllAdsOffers();
      setData(result);
      const initialValidateStates = {};
      result.forEach((item) => {
        initialValidateStates[item.id] = false;
      });
      setValidate(initialValidateStates);
    };

    fetchAdsOffers();
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
  const handleItemSubmit = async (id, offerId, tokenId, proposalId, approuved) => {
    const submissionArgs = {
      offerId: "23",
      tokenId: "1",
      proposalId: "42",
      adParameter: "logoURL",
      validated: approuved,
      reason: comments[id] || "",
    };

    await handleSubmit(submissionArgs);
  };
  const openRefuseModal = (id, offerId, tokenId, proposalId) => {
    setRefusedAdModalId(id);
    setOfferId(offerId);
    setTokenId(tokenId);
    setProposalId(proposalId);
  };

  const closeRefuseModal = () => {
    setRefusedAdModalId(null);
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={30}
        loop={true}
        slidesPerView={2}
        navigation={{
          nextEl: ".bids-swiper-button-next",
          prevEl: ".bids-swiper-button-prev",
        }}
        className=" card-slider-4-columns !py-5"
      >
        {data.map((item) => {
          const { id, name, ownerAddress, ownerName, image, maxSupply, externalLink, description, currencyName, numberTokenAllowed, price, offerId, tokenId, proposalId } = item;
          // const itemLink = image.split("/").slice(-1).toString().replace(".jpg", "");
          return (
            <div key={id}>
              <SwiperSlide className="text-white">
                <article>
                  <div className="dark:bg-jacarta-700 flex dark:border-jacarta-700 border-jacarta-100 rounded-2xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg text-jacarta-500">
                    <div className="dark:bg-jacarta-700 max-w-[250px] dark:border-jacarta-600 border-jacarta-100   items-center justify-center rounded-lg border bg-white py-1.5 px-4">
                      <figure className="mb-4 flex flex-col">
                        <span className="dark:text-jacarta-200 mb-1">Image :</span>
                        <Link href={`/item/${id}/1`}>
                          <Image src={image} alt="" height={230} width={230} className="rounded-[0.625rem] w-auto   h-[150px] object-contain" loading="lazy" />
                        </Link>
                      </figure>
                      <div className="mb-4 flex flex-col">
                        <span className="dark:text-jacarta-200 mb-1">Redirection link :</span>
                        <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                          <button className="js-copy-clipboard text-white max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
                            <CopyToClipboard text="userId" onCopy={() => setCopied(true)}>
                              <span>https://mumbai.polygonscan.com/tx/0xf9aa3225ccbe4971eddf0f654b5a7bb5979bbb0d0d965847ee441566d72c18a4</span>
                            </CopyToClipboard>
                          </button>
                        </Tippy>
                      </div>
                    </div>

                    <div className="mt-4 flex  flex-col pl-8 justify-between">
                      <div className="flex flex-col ">
                        <Link href={`/item/${id}/1`} className="mb-4">
                          <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">Ad Proposal Owner Address</span>
                        </Link>
                        <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                          <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-1 px-2">
                            <Tippy content={<span>{currencyName}</span>}>
                              <Image width={12} height={12} src="/images/eth-icon.svg" alt="icon" className="w-3 h-3 mr-1" />
                            </Tippy>

                            <span className="text-green text-sm font-medium tracking-tight">
                              {price} {currencyName}
                            </span>
                          </span>
                          <div className=" text-sm">
                            <span className="dark:text-jacarta-300 text-jacarta-500">
                              {numberTokenAllowed}/{maxSupply}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div key="2" className="dropdown-item mb-4 font-display dark:bg-jacarta-600 hover:bg-jacarta-50 block w-full rounded-xl pr-5 py-2 text-left text-sm transition-colors dark:text-white">
                          <span className="flex items-center justify-between">
                            <span className="pl-5">I confirm that I have check the image and the linkURL </span>
                            <input
                              type="checkbox"
                              name="check"
                              className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-4 w-7 cursor-pointer appearance-none rounded-lg border-none shadow-none after:absolute after:top-0.5 after:left-0.5 after:h-3 after:w-3 after:rounded-full after:transition-all checked:bg-none checked:after:left-3.5 checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                              onChange={() => handleInput(id)}
                              checked={validate[item.id] || false}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="flex items-start gap-4 flex-wrap">
                          <Web3Button
                            contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                            action={() => handleItemSubmit(id, offerId, tokenId, proposalId, true)}
                            className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[item.id] ? "btn-disabled" : "!bg-accent !cursor-pointer"} `}
                          >
                            Validate
                          </Web3Button>

                          <Web3Button
                            contractAddress="0xA82B4bBc8e6aC3C100bBc769F4aE0360E9ac9FC3"
                            action={() => openRefuseModal(id, offerId, tokenId, proposalId)}
                            className={` !rounded-full !min-w-[100px] !py-3 !px-8 !text-center !font-semibold !text-white !transition-all ${!validate[item.id] ? "btn-disabled" : "!bg-red !cursor-pointer"} `}
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
