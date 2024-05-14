import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  useContract,
  useAddress,
  useWallet,
} from "@thirdweb-dev/react";
import { readContract } from "thirdweb";
import {
  defaultChainId,
  getNftContract,
  marketplaceConfig,
} from "../../app/marketplace/marketplace.config";
import WalletConnection from "../wallet/walletConnection";
import { useTransactionHook } from "../../utils/transactions";
import CreateListingModal from "../marketplace-modals/createListingModal";
import ThankYouModal from "../marketplace-modals/thankYouModal";
const chainId = defaultChainId;

const OwnerView = ({ listing }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCancelListingModal, setShowCancelListingModal] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [tokenOwner, setTokenOwner] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const { handleCreateListing, handleERC721approval } = useTransactionHook();

  const address = useAddress();
  const wallet = useWallet();
  const now = new Date().getTime() / 1000;

  // const nftContractAdd = getNftContract(chainId, listing.token.nftContract.id);
  const { contract: dsponsorMpContract } = useContract(
    marketplaceConfig[chainId].dsponsor_marketplace_contract_address
  );

  const { contract: nftContract } = useContract(listing.token.nftContract.id);

  const { mutateAsync: cancelDirectListing } = useContractWrite(
    dsponsorMpContract,
    "cancelDirectListing"
  );

  const { mutateAsync: closeAuction } = useContractWrite(
    dsponsorMpContract,
    "closeAuction"
  );

  const { mutateAsync: createListing } = useContractWrite(
    dsponsorMpContract,
    "createListing"
  );
  const { mutateAsync: setApprovalForAll } = useContractWrite(
    nftContract,
    "setApprovalForAll"
  );

  const nftContractForOwner = getNftContract(
    chainId,
    listing.token.nftContract.id
  );
  const fetchTokenOwner = async (tokenId) => {
    try {
      const tokenOwner = await readContract({
        contract: nftContractForOwner,
        method: "ownerOf",
        params: [tokenId],
      });
      setTokenOwner(tokenOwner);
    } catch (e) {
      console.log("error fetching token owner", e);
    }
  };

  const handleCancelModal = async () => {
    if (listing.listingType === "Auction") {
      try {
        await closeAuction({
          args: [listing.id],
        });
        setShowCancelListingModal(false);
        setShowThankYouModal(true);
      } catch (e) {
        // TODO : add something for UX to show error
        setShowCancelListingModal(false);
        console.log("error closing auction", e);
      }
    } else {
      try {
        await cancelDirectListing({
          args: [listing.id],
        });
        setShowCancelListingModal(false);
        setShowThankYouModal(true);
      } catch (e) {
        // TODO : add something for UX to show error
        setShowCancelListingModal(false);
        console.log("error cancelling direct listing", e);
      }
    }
  };

  const handleERC721approve = async () => {
    try {
      await handleERC721approval(
        nftContract,
        address,
        marketplaceConfig[chainId].dsponsor_marketplace_contract_address,
        setApprovalForAll
      );
    } catch (e) {
      // TODO : add something for UX to show error
      console.log("error approving", e);
    }
  };

  const createListingFunc = async (newListing) => {
    try {
      await handleERC721approve();
      await handleCreateListing(
        createListing,
        listing.token.nftContract.id, //assetContract,
        listing.token.tokenId, //tokenId
        newListing.startTime, //startTime
        newListing.secondsUntilEndTime, //secondsUntilEndTime
        1, //quantityToList
        newListing.currency, //currencyToAccept
        newListing.reservePricePerToken, //reservePricePerToken
        newListing.buyoutPricePerToken, //buyoutPricePerToken
        1, //transferType
        0, //rentalExpirationTimestamp

        newListing.listingType === "Direct" ? 0 : 1 //listingType
      );
      setShowCreateListingModal(false);
      setShowThankYouModal(true);
    } catch (e) {
      // TODO : add something for UX to show error
      setShowCreateListingModal(false);
      console.log("error creating listing", e);
    }
  };

  useEffect(() => {
    fetchTokenOwner(listing.token.tokenId);
  }, []);
  return (
    <>
      {listing.status === "CREATED" ? (
        <>
          {listing.listingType === "Auction" && listing.endTime < now && (
            <a
              onClick={() => {
                setShowModal(true);
                setShowCancelListingModal(true);
              }}
              className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              This auction ended you can cancel this listing
            </a>
          )}
          {tokenOwner == address &&
            (listing.listingType === "Direct" ||
              (listing.listingType === "Auction" &&
                (listing.bids.length === 0 || listing.startTime > now))) && (
              <a
                onClick={() => {
                  setShowModal(true);
                  setShowCancelListingModal(true);
                }}
                className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Cancel Listing
              </a>
            )}
        </>
      ) : (
        <a
          onClick={() => {
            setShowModal(true);
            setShowCreateListingModal(true);
          }}
          className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
        >
          Create a new listing
        </a>
      )}

      {showModal && (
        <div
          className={showModal ? "modal fade show block" : "modal hide"}
          id="placeBidModal"
          tabIndex="-1"
          aria-labelledby="placeBidLabel"
          aria-hidden="true"
        >
          {wallet ? (
            <>
              <div className="modal-dialog max-w-2xl">
                <div className="modal-content bg-sigray-light border-sigray-border">
                  <div className="modal-header">
                    <button
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-6 w-6 fill-jacarta-700 fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                      </svg>
                    </button>
                  </div>
                  <>
                    {showCancelListingModal && (
                      <div className="modal-body p-6">
                        <p className="text-white pb-6">
                          Are you sure you want to cancel this listing ?
                        </p>

                        <div className="flex space-x-4">
                          <a
                            onClick={() => {
                              handleCancelModal();
                            }}
                            className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                          >
                            Cancel listing
                          </a>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              </div>
              {/* TODO: closing modal bug to fix here */}
              {showCreateListingModal && (
                <CreateListingModal
                  isOpen={showCreateListingModal}
                  setIsOpen={setShowCreateListingModal}
                  handleCreateListing={createListingFunc}
                />
              )}
            </>
          ) : (
            <WalletConnection setShowModal={setShowModal} />
          )}
        </div>
      )}

      {showThankYouModal && (
        <ThankYouModal setShowThankYouModal={setShowThankYouModal} />
      )}
    </>
  );
};

export default OwnerView;
