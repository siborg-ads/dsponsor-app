import React, { useEffect, useState } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import ItemManageModal from "@/components/features/token/modals/CreateListing";
import { toast } from "react-toastify";
import { getAddress } from "ethers/lib/utils";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { Address } from "thirdweb";
import NormalButton from "@/components/ui/buttons/NormalButton";
import config from "@/config/config";

const Manage = ({
  chainId,
  successFullListing,
  setSuccessFullListing,
  offerData,
  marketplaceListings,
  royalties,
  dsponsorNFTContract,
  dsponsorMpContract,
  conditions,
  tokenId,
  setListingCreated,
  fetchOffers
}) => {
  const currentChainObject = config[chainId];
  const relayerURL = currentChainObject.relayerURL;

  const [listingModal, setListingModal] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLastBidder, setIsLastBidder] = useState(false);
  const { mutateAsync: cancelDirectListing } = useContractWrite(
    dsponsorMpContract,
    "cancelDirectListing"
  );
  const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");

  const address = useAddress();

  useEffect(() => {
    if (marketplaceListings?.length > 0) {
      const lastBidder = marketplaceListings
        ?.sort((a, b) => b?.id - a?.id)
        ?.bids?.sort((a, b) => b?.split("-")[1]?.id - a?.split("-")[1]?.id)[0]?.bidder;
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

      const listing = marketplaceListings.sort((a, b) => b?.id - a?.id)[0];
      const { listingType, id, lister, token, bids } = listing;

      const tags = [
        `${chainId}-userAddress-${lister}`,
        `${chainId}-nftContract-${token.nftContract.id}`
      ];

      if (listingType === "Auction") {
        if (bids?.length) {
          const { bidder } = bids.sort(
            (a, b) => Number(b.creationTimestamp) - Number(a.creationTimestamp)
          )[0];
          tags.push(`${chainId}-activity`);
          tags.push(`${chainId}-userAddress-${bidder}`);
        }
        await closeAuctionListing({ args: [id] });
      } else if (listingType === "Direct") {
        await cancelDirectListing({ args: [id] });
      }

      await fetch(`${relayerURL}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          tags
        })
      });

      setSuccessFullListing(true);

      await fetchOffers();
    } catch (e) {
      console.error(e);
      setIsLoadingButton(false);
      throw new Error(e);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const renderConditionsMessage = () => {
    if (
      !conditions?.endTimeNotPassed &&
      conditions?.isCreated &&
      conditions?.isAuction &&
      conditions?.hasBids
    ) {
      return (
        <span className="dark:text-jacarta-100 text-jacarta-100 text-sm">
          Auction has ended, you can complete the auction by clicking the button below.
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
          <NormalButton onClick={handleListingModal}>Create a listing</NormalButton>
        </div>
      );
    }
    if (conditions?.isDirect && (conditions?.isOwner || conditions?.isLister)) {
      return (
        <StyledWeb3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address as Address}
          onClick={async () =>
            await toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Cancel listing confirmed 👌",
              error: "Cancel listing rejected 🤯"
            })
          }
          isRed
          defaultText="Cancel listing"
        />
      );
    }
    if (
      (!conditions?.endTimeNotPassed &&
        conditions?.isCreated &&
        conditions?.isAuction &&
        conditions?.hasBids) ||
      (conditions?.isLister && !conditions?.hasBids)
    ) {
      return (
        <StyledWeb3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address as Address}
          onClick={async () =>
            await toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Close auction confirmed 👌",
              error: "Close auction rejected 🤯"
            })
          }
          isGreen
          defaultText={isLastBidder ? "Claim your earned Ad Space" : "Close auction"}
        />
      );
    }
    if (
      conditions?.isAuction &&
      (conditions?.isListerOrOwnerAndEndDateFinishedOrNoBids ||
        conditions?.isListerOrOwnerAndStartDateNotPassed)
    ) {
      return (
        <StyledWeb3Button
          contractAddress={currentChainObject?.smartContracts?.DSPONSORMP?.address as Address}
          onClick={async () =>
            await toast.promise(handleSubmitCancel, {
              pending: "Waiting for confirmation 🕒",
              success: "Close auction confirmed 👌",
              error: "Close auction rejected 🤯"
            })
          }
          isDisabled={isLoadingButton}
          defaultText="Cancel auction"
          isRed
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderConditionsMessage() && (
        <div className="dark:bg-secondaryBlack mb-2 rounded-2lg flex flex-col gap-4 bg-white p-8">
          <div className="sm:flex sm:flex-wrap">{renderConditionsMessage()}</div>
          {renderActionButton()}
        </div>
      )}

      {listingModal && (
        <div className="modal fade show block">
          <ItemManageModal
            chainConfig={currentChainObject}
            setSuccessFullListing={setSuccessFullListing}
            successFullListing={successFullListing}
            royalties={royalties}
            dsponsorNFTContract={dsponsorNFTContract}
            dsponsorMpContract={dsponsorMpContract}
            handleListingModal={handleListingModal}
            offerData={offerData}
            tokenId={tokenId}
            setListingCreated={setListingCreated}
            fetchOffers={fetchOffers}
          />
        </div>
      )}
    </>
  );
};

export default Manage;
