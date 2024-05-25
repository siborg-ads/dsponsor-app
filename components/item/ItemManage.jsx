import React, { useState, useEffect, useRef, use } from "react";
import { useAddress, useBalance, Web3Button, useContract, useContractRead, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import ItemManageModal from "./ItemManageModal";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/spinner";

const ItemManage = ({ offerData, marketplaceListings, royalties, dsponsorNFTContract, dsponsorMpContract, isOwner }) => {
  const [listingModal, setListingModal] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const { mutateAsync: cancelDirectListing } = useContractWrite(dsponsorMpContract, "cancelDirectListing");
  const { mutateAsync: closeAuctionListing } = useContractWrite(dsponsorMpContract, "closeAuction");
  const [successFullListing, setSuccessFullListing] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const now = Math.floor(new Date().getTime() / 1000);

  useEffect(() => {
    if (successFullListing) {
      handleListingModal();
    }
  }, [successFullListing]);
  const handleListingModal = () => {
    setListingModal(!listingModal);
  };
  const handleSubmitCancel = async () => {
    setIsLoadingButton(true);
    try {
      if (marketplaceListings[0].listingType === "Auction") {
        await closeAuctionListing({ args: [marketplaceListings[0].id] });
      } else if (marketplaceListings[0].listingType === "Direct") {
        await cancelDirectListing({ args: [marketplaceListings[0].id] });
      }
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <>
      <div className="dark:bg-jacarta-700 dark:border-jacarta-600 mb-2 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" sm:flex sm:flex-wrap">
          {marketplaceListings[0].endTime < now && marketplaceListings[0].listingType === "Auction" && (
            <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">Auction has ended, you can complete the auction by clicking the button bellow. </span>
          )}
          {marketplaceListings[0].startTime > now && marketplaceListings[0].listingType === "Auction" && (
            <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">Auction will start soon, wait {new Date(marketplaceListings[0]?.startTime * 1000).toString()}. </span>
          )}
         
        </div>

        {(marketplaceListings[0]?.status !== "CREATED" || marketplaceListings.length <= 0) && isOwner ? (
          <div className="w-full flex justify-center">
            <button type="button" className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-3 text-center font-semibold text-white transition-all" onClick={handleListingModal}>
              Create a listing
            </button>
          </div>
        ) : marketplaceListings[0].listingType === "Direct" && isOwner ? (
          <Web3Button
            contractAddress="0xac03b675fa9644279b92f060bf542eed54f75599"
            action={() => {
              toast.promise(handleSubmitCancel, {
                pending: "Waiting for confirmation 🕒",
                success: "Cancel listing confirmed 👌",
                error: "Cancel listing rejected 🤯",
              });
            }}
            className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all  !bg-red !cursor-pointer `}
            isDisabled={isLoadingButton}
          >
            {isLoadingButton ? <Spinner size="sm" color="default" /> : "Cancel listing"}
          </Web3Button>
        ) : marketplaceListings[0].listingType === "Auction" && marketplaceListings[0].endTime < now ? (
          <Web3Button
            contractAddress="0xac03b675fa9644279b92f060bf542eed54f75599"
            action={() => {
              toast.promise(handleSubmitCancel, {
                pending: "Waiting for confirmation 🕒",
                success: "Close auction confirmed 👌",
                error: "Close auction rejected 🤯",
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
          marketplaceListings[0].listingType === "Auction" &&
          isOwner &&
          (marketplaceListings[0].bids.length <= 0 || marketplaceListings[0].startTime > now) && (
            <Web3Button
              contractAddress="0xac03b675fa9644279b92f060bf542eed54f75599"
              action={() => {
                toast.promise(handleSubmitCancel, {
                  pending: "Waiting for confirmation 🕒",
                  success: "Close auction confirmed 👌",
                  error: "Close auction rejected 🤯",
                });
              }}
              className={` !rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all 
               !bg-red
                !cursor-pointer `}
              isDisabled={isLoadingButton}
            >
              {isLoadingButton ? <Spinner size="sm" color="default" /> : "Close auction"}
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
