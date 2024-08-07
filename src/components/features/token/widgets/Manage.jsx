import React, { useEffect, useState } from "react";
import { Web3Button, useAddress, useContractWrite } from "@thirdweb-dev/react";
import ItemManageModal from "@/components/features/token/modals/CreateListing";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";
import { useChainContext } from "@/hooks/useChainContext";
import { getAddress } from "ethers/lib/utils";

const Manage = ({
  offer,
  latestListing,
  royalties,
  dsponsorNFTContract,
  dsponsorMpContract,
  tokenId,
  listingCreated,
  setListingCreated,
  fetchOffers,
  isTokenOwner,
  isLister,
  marketplaceListings,
  tokenStatus
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
    if (latestListing) {
      console.log(latestListing);
      const lastBidder = latestListing?.bids?.sort(
        (a, b) => Number(b?.toString().split("-")[1]?.id) - Number(a?.toString()?.split("-")[1]?.id)
      )[0]?.bidder;

      if (lastBidder && address && getAddress(lastBidder) === getAddress(address)) {
        setIsLastBidder(true);
      } else {
        setIsLastBidder(false);
      }
    }
  }, [latestListing, address, setIsLastBidder]);

  const handleListingModal = () => {
    setListingModal(!listingModal);
  };

  const handleSubmitCancel = async () => {
    try {
      setIsLoadingButton(true);
      const { listingType, id } = latestListing;

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

  const endTimePassed = new Date(latestListing?.endTime * 1000).getTime() < Date.now();
  const listingHasBids = latestListing?.bids?.length > 0;
  const isNotCreated = latestListing?.status !== "CREATED";
  const noListings = marketplaceListings?.length <= 0;
  const isAuction = tokenStatus === "AUCTION";
  const isDirect = tokenStatus === "DIRECT";
  const startDateNotPassed = new Date(latestListing?.startTime * 1000).getTime() > Date.now();
  const isCancelled = latestListing?.status === "CANCELLED";

  const renderConditionsMessage = () => {
    if (endTimePassed && isAuction && listingHasBids) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Auction has ended, you can complete the auction by clicking the button below.
        </span>
      );
    }

    if ((isNotCreated || noListings) && isTokenOwner) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Click the button below to sell your item in auction or direct listing.
        </span>
      );
    }

    if (isDirect && (isLister || isTokenOwner)) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Click the button below to cancel the listing.
        </span>
      );
    }

    if (
      isAuction &&
      (((isLister || isTokenOwner) && (endTimePassed || !listingHasBids)) ||
        ((isLister || isTokenOwner) && startDateNotPassed))
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
    if ((isNotCreated || noListings) && (isTokenOwner || (isLister && isCancelled))) {
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

    if (isDirect && (isTokenOwner || isLister)) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={async () =>
            await toast.promise(handleSubmitCancel, {
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
      (endTimePassed && isCreated && isAuction && listingHasBids) ||
      (isLister && !listingHasBids)
    ) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={async () =>
            await toast.promise(handleSubmitCancel, {
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
      isAuction &&
      (((isLister || isTokenOwner) && (endTimePassed || !listingHasBids)) ||
        ((isLister || isTokenOwner) && startDateNotPassed))
    ) {
      return (
        <Web3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address}
          action={async () =>
            await toast.promise(handleSubmitCancel, {
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
    <React.Fragment>
      {renderConditionsMessage() && (
        <div className="dark:bg-secondaryBlack mb-2 rounded-2lg flex flex-col gap-4 bg-white p-8">
          <div className="sm:flex sm:flex-wrap">{renderConditionsMessage()}</div>
          {renderActionButton()}
        </div>
      )}

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
            tokenId={tokenId}
            setListingCreated={setListingCreated}
            fetchOffers={fetchOffers}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Manage;
