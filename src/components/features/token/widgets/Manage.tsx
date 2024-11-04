import React, { useEffect, useState } from "react";
import ItemManageModal from "@/components/features/token/modals/CreateListing";
import { toast } from "react-toastify";
import { getAddress } from "ethers/lib/utils";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { Address, ContractOptions, prepareContractCall } from "thirdweb";
import NormalButton from "@/components/ui/buttons/NormalButton";
import config from "@/config/config";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import useGasless from "@/lib/useGazless";

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
}: {
  chainId: number;
  successFullListing: boolean;
  setSuccessFullListing: (value: boolean) => void;
  offerData: any;
  marketplaceListings: any;
  royalties: any;
  dsponsorNFTContract: ContractOptions;
  dsponsorMpContract: ContractOptions;
  conditions: any;
  tokenId: string;
  setListingCreated: (value: boolean) => void;
  fetchOffers: () => void;
}) => {
  const currentChainObject = config[chainId];
  const relayerURL = currentChainObject.relayerURL;

  const [listingModal, setListingModal] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLastBidder, setIsLastBidder] = useState(false);
  //   const { mutateAsync: cancelDirectListing } = useContractWrite(
  //     dsponsorMpContract,
  //     "cancelDirectListing"
  //   );

  const gasless = useGasless(chainId);
  const { mutateAsync: cancelDirectListing } = useSendAndConfirmTransaction({ gasless });

  //   const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");
  const { mutateAsync: closeAuctionListing } = useSendAndConfirmTransaction({ gasless });

  const wallet = useActiveAccount();
  const address = wallet?.address;

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
        //   await closeAuctionListing({ args: [id] });
        const tx = prepareContractCall({
          contract: dsponsorMpContract,
          // @ts-ignore
          method: "closeAuction",
          params: [id]
        });

        await closeAuctionListing(tx);
      } else if (listingType === "Direct") {
        // await cancelDirectListing({ args: [id] });

        const tx = prepareContractCall({
          contract: dsponsorMpContract,
          // @ts-ignore
          method: "cancelDirectListing",
          params: [id]
        });

        await cancelDirectListing(tx);
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
        <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
          Auction has ended, you can complete the auction by clicking the button below.
        </span>
      );
    }
    if ((!conditions?.isCreated || marketplaceListings?.length <= 0) && conditions?.isOwner) {
      return (
        <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
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
        <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
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
        <span className="text-sm dark:text-jacarta-100 text-jacarta-100">
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
        <div className="flex justify-center w-full">
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
        <div className="flex flex-col gap-4 p-8 mb-2 bg-white dark:bg-secondaryBlack rounded-2lg">
          <div className="sm:flex sm:flex-wrap">{renderConditionsMessage()}</div>
          {renderActionButton()}
        </div>
      )}

      {listingModal && (
        <div className="block modal fade show">
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
