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
import { contractAddressConfig } from "../../lib/config/listing.config";
import WalletConnection from "../wallet/walletConnection";
import { useTransaction } from "../../utils/transactions";

const chainId = defaultChainId;

const OwnerView = ({ listing }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCancelListingModal, setShowCancelListingModal] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [tokenOwner, setTokenOwner] = useState(false);
  const { handleCreateListing, handleERC721approval } = useTransaction();

  const address = useAddress();
  const wallet = useWallet();
  const now = new Date().getTime() / 1000;

  const nftContractAdd = getNftContract(chainId, listing.token.nftContract.id);
  const { contract: dsponsorMpContract } = useContract(
    contractAddressConfig.dsponsor_marketplace_contract_address
  );

  //not so sure about this
  const { contract: nftContract } = useContract(nftContractAdd);

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

  const fetchTokenOwner = async (tokenId) => {
    try {
      const tokenOwner = await readContract({
        contract: nftContractAdd,
        method: "ownerOf",
        params: [tokenId],
      });
      console.log("tokenOwner", tokenOwner);
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
      } catch (e) {
        console.log("error closing auction", e);
      }
    } else {
      try {
        await cancelDirectListing({
          args: [listing.id],
        });
      } catch (e) {
        console.log("error cancelling direct listing", e);
      }
    }
  };

  // TODO : pass the right params, and then call this function for approval
  const handleERC721approvalButton = async () => {
    await handleERC721approval(
      nftContract,
      address,
      // contractAddressConfig.dsponsor_marketplace_contract_address,
      marketplaceConfig[chainId].dsponsor_marketplace_contract_address,
      setApprovalForAll
    );
  };

  //TODO : call approval before creating listing
  const handleCreateListingModal = async () => {
    try {
      await handleCreateListing(
        createListing,
        listing.id,
        listing.listingType,
        tokenOwner,
        listing.bids,
        listing.startTime,
        listing.endTime
      );
    } catch (e) {
      console.log("error creating listing", e);
    }
  };

  useEffect(() => {
    console.log("nftContract", nftContract);
    fetchTokenOwner(listing.token.tokenId);
  }, []);
  return (
    <>
      {/* TODO : listing.status !== "CREATED"  just to test listing creation, the origin is listing.status === "CREATED" */}
      {listing.status !== "CREATED" ? (
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

                  {showCreateListingModal && (
                    <div className="modal-body p-6">
                      <p className="text-white pb-6">Create Listing</p>

                      <div className="flex space-x-4">
                        <a
                          onClick={() => {
                            handleERC721approvalButton();
                            //normally it should be createListing, but i'm calling approval for the sake of testing
                            // handleCreateListingModal();
                          }}
                          className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                        >
                          Confirm listing creation
                        </a>
                      </div>
                    </div>
                  )}
                </>
              </div>
            </div>
          ) : (
            <WalletConnection setShowModal={setShowModal} />
          )}
        </div>
      )}
    </>
  );
};

export default OwnerView;
