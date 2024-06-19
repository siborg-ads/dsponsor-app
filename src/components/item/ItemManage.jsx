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
  conditions
}) => {
  const [listingModal, setListingModal] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { currentChainObject } = useChainContext();
  const { mutateAsync: cancelDirectListing } = useContractWrite(
    dsponsorMpContract,
    "cancelDirectListing"
  );
  const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");

  const handleListingModal = () => {
    setListingModal(!listingModal);
  };

  const handleSubmitCancel = async () => {
    try {
      setIsLoadingButton(true);
      const { listingType, id } = marketplaceListings[0];
      if (listingType === "Auction") {
        await closeAuctionListing({ args: [id] });
      } else if (listingType === "Direct") {
        await cancelDirectListing({ args: [id] });
      }
      setSuccessFullListing(true);
    } catch (e) {
      setIsLoadingButton(false);
      throw new Error(e);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const renderConditionsMessage = () => {
    if (!conditions?.endTimeNotPassed && conditions?.isCreated && conditions?.isAuction) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Auction has ended, you can complete the auction by clicking the button below.
        </span>
      );
    }
    if (!conditions?.startTimePassed && conditions?.isAuction && conditions?.isCreated) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Auction will start soon, wait{" "}
          {new Date(marketplaceListings[0]?.startTime * 1000).toString()}.
        </span>
      );
    }
    if ((!conditions?.isCreated || marketplaceListings?.length <= 0) && conditions?.isOwner) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Click the button below to sell your item in auction or direct listing.
        </span>
      );
    }
    if (
      conditions?.isDirect &&
      (conditions?.isLister || conditions?.isOwner) &&
      conditions?.isCreated
    ) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Click the button below to cancel the listing.
        </span>
      );
    }
    if (conditions?.isListerOrOwnerAndEndDateFinishedOrNoBids) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Click the button below to cancel the auction.
        </span>
      );
    }
    return null;
  };

  const renderActionButton = () => {
    if (
      (!conditions?.isCreated || marketplaceListings?.length <= 0) &&
      (conditions?.isOwner || (conditions?.isLister && conditions?.isCancelled))
    ) {
      return (
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="bg-primaryPurple hover:bg-opacity-80 w-36 rounded-full py-3 px-3 text-center font-semibold text-white transition-all"
            onClick={handleListingModal}
          >
            Create a listing
          </button>
        </div>
      );
    }
    if (conditions?.isDirect && (conditions?.isOwner || conditions?.isLister)) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={() =>
            toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Cancel listing confirmed 👌",
              error: "Cancel listing rejected 🤯"
            })
          }
          className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-red !cursor-pointer"
          isDisabled={isLoadingButton}
        >
          {isLoadingButton ? <Spinner size="sm" color="default" /> : "Cancel listing"}
        </Web3Button>
      );
    }
    if (!conditions?.endTimeNotPassed && conditions?.isCreated && conditions?.isAuction) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={() =>
            toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Close auction confirmed 👌",
              error: "Close auction rejected 🤯"
            })
          }
          className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-green !cursor-pointer"
          isDisabled={isLoadingButton}
        >
          {isLoadingButton ? <Spinner size="sm" color="default" /> : "Close auction"}
        </Web3Button>
      );
    }
    if (
      conditions?.isAuction &&
      (conditions?.isOwner || conditions?.isLister) &&
      !conditions?.hasBids &&
      conditions?.startTimePassed
    ) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={() =>
            toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Close auction confirmed 👌",
              error: "Close auction rejected 🤯"
            })
          }
          className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-red !cursor-pointer"
          isDisabled={isLoadingButton}
        >
          {isLoadingButton ? <Spinner size="sm" color="default" /> : "Cancel auction"}
        </Web3Button>
      );
    }
    return null;
  };

  return (
    <>
      {renderConditionsMessage() && renderActionButton() && (
        <>
          <div className="dark:bg-secondaryBlack mb-2 rounded-2lg flex flex-col gap-4 bg-white p-8">
            <div className="sm:flex sm:flex-wrap">{renderConditionsMessage()}</div>
            {renderActionButton()}
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
      )}
    </>
  );
};

export default ItemManage;
