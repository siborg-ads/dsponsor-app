import React, { useState } from "react";
import { Web3Button, useContractWrite } from "@thirdweb-dev/react";
import ItemManageModal from "./ItemManageModal";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";
import { useChainContext } from "../../contexts/hooks/useChainContext";

const ItemManage = ({
  successFullListing,
  setSuccessFullListing,
  offerData,
  marketplaceListings,
  royalties,
  dsponsorNFTContract,
  dsponsorMpContract,
  isOwner,
  isLister,
  conditions
}) => {
  const [listingModal, setListingModal] = useState(false);
  const { currentChainObject } = useChainContext();
  const { mutateAsync: cancelDirectListing } = useContractWrite(
    dsponsorMpContract,
    "cancelDirectListing"
  );
  const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const now = Math.floor(new Date().getTime() / 1000);

  const handleListingModal = () => {
    setListingModal(!listingModal);
  };
  const handleSubmitCancel = async () => {
    try {
      setIsLoadingButton(true);
      if (marketplaceListings[0].listingType === "Auction") {
        await closeAuctionListing({ args: [marketplaceListings[0].id] });
        setSuccessFullListing(true);
      } else if (marketplaceListings[0].listingType === "Direct") {
        await cancelDirectListing({ args: [marketplaceListings[0].id] });
        setSuccessFullListing(true);
      }
    } catch (e) {
      setIsLoadingButton(false);
      throw new Error(e);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <>
      <div className="dark:bg-secondaryBlack mb-2 rounded-2lg flex flex-col gap-4 bg-white p-8">
        <div className=" sm:flex sm:flex-wrap">
          {!conditions?.endTimeNotPassed && (
            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
              Auction has ended, you can complete the auction by clicking the button bellow.{" "}
            </span>
          )}
          {!conditions?.startTimePassed && conditions?.isAuction && conditions?.isCreated && (
            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
              Auction will start soon, wait{" "}
              {new Date(marketplaceListings[0]?.startTime * 1000).toString()}.{" "}
            </span>
          )}
          {(!conditions?.isCreated || marketplaceListings?.length <= 0) && isOwner && (
            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
              Click the button below to sell your item in auction or direct listing.{" "}
            </span>
          )}
          {conditions?.isDirect &&
            (conditions?.isLister || conditions?.isOwner) &&
            conditions?.isCreated && (
              <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
                Click the button below to cancel the listing.{" "}
              </span>
            )}
          {conditions?.isListerAndEndDateFinishedOrNoBids && (
            <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
              Click the button below to cancel the auction.{" "}
            </span>
          )}
        </div>

        {(!conditions?.isCreated || marketplaceListings?.length <= 0) && isOwner ? (
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="bg-primaryPurple hover:bg-opacity-80 w-36 rounded-full py-3 px-3 text-center font-semibold text-white transition-all"
              onClick={handleListingModal}
            >
              Create a listing
            </button>
          </div>
        ) : conditions?.isDirect && (conditions?.isOwner || conditions?.isLister) ? (
          <Web3Button
            contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
            action={() => {
              toast.promise(handleSubmitCancel, {
                pending: "Waiting for confirmation 🕒",
                success: "Cancel listing confirmed 👌",
                error: "Cancel listing rejected 🤯"
              });
            }}
            className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-red !cursor-pointer `}
            isDisabled={isLoadingButton}
          >
            {isLoadingButton ? <Spinner size="sm" color="default" /> : "Cancel listing"}
          </Web3Button>
        ) : !conditions?.endTimeNotPassed ? (
          <Web3Button
            contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
            action={() => {
              toast.promise(handleSubmitCancel, {
                pending: "Waiting for confirmation 🕒",
                success: "Close auction confirmed 👌",
                error: "Close auction rejected 🤯"
              });
            }}
            className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all
             !bg-green
               !cursor-pointer `}
            isDisabled={isLoadingButton}
          >
            {isLoadingButton ? <Spinner size="sm" color="default" /> : "Close auction"}
          </Web3Button>
        ) : (
          conditions?.isAuction &&
          (conditions?.isOwner || conditions?.isLister) &&
          !conditions?.hasBids &&
          conditions?.startTimePassed && (
            <Web3Button
              contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
              action={() => {
                toast.promise(handleSubmitCancel, {
                  pending: "Waiting for confirmation 🕒",
                  success: "Close auction confirmed 👌",
                  error: "Close auction rejected 🤯"
                });
              }}
              className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all 
               !bg-red
                !cursor-pointer `}
              isDisabled={isLoadingButton}
            >
              {isLoadingButton ? <Spinner size="sm" color="default" /> : "Cancel auction"}
            </Web3Button>
          )
        )}
      </div>
      {listingModal && (
        <div className="modal fade show block">
          <ItemManageModal
            setSuccessFullListing={setSuccessFullListing}
            successFullListing={successFullListing}
            royalties={royalties}
            dsponsorNFTContract={dsponsorNFTContract}
            dsponsorMpContract={dsponsorMpContract}
            handleListingModal={handleListingModal}
            offerData={offerData}
            marketplaceListings={marketplaceListings}
          />
        </div>
      )}
    </>
  );
};

export default ItemManage;
