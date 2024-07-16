import React, { useEffect, useState } from "react";
import { Web3Button, useAddress, useContractWrite } from "@thirdweb-dev/react";
import ItemManageModal from "./ItemManageModal";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { getAddress } from "ethers/lib/utils";

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
  const [isLastBidder, setIsLastBidder] = useState(false);
  const { currentChainObject } = useChainContext();
  const { mutateAsync: cancelDirectListing } = useContractWrite(
    dsponsorMpContract,
    "cancelDirectListing"
  );
  const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");

  const address = useAddress();

  useEffect(() => {
    if (marketplaceListings?.length > 0) {
      const lastBidder = marketplaceListings[0]?.bids[0]?.bidder;
      if (lastBidder && address && getAddress(lastBidder) === getAddress(address)) {
        setIsLastBidder(true);
      } else {
        setIsLastBidder(false);
      }
    }
  }, [marketplaceListings, address, setIsLastBidder]);

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
      console.error(e);
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
    if (conditions?.mintDisabled) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          The minting is disabled for this token.
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
    if (
      conditions?.isAuction &&
      (conditions?.isListerOrOwnerAndEndDateFinishedOrNoBids ||
        conditions?.isListerOrOwnerAndStartDateNotPassed)
    ) {
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
    if (
      (!conditions?.endTimeNotPassed &&
        conditions?.isCreated &&
        conditions?.isAuction &&
        !conditions?.isLister &&
        conditions?.hasBids) ||
      (conditions?.isLister && !conditions?.hasBids)
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
          className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-green !cursor-pointer"
          isDisabled={isLoadingButton}
        >
          {isLoadingButton ? (
            <Spinner size="sm" color="default" />
          ) : isLastBidder ? (
            "Claim your earned Ad Space"
          ) : (
            "Close auction"
          )}
        </Web3Button>
      );
    }
    if (
      conditions?.isAuction &&
      (conditions?.isListerOrOwnerAndEndDateFinishedOrNoBids ||
        conditions?.isListerOrOwnerAndStartDateNotPassed)
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
  );
};

export default ItemManage;
