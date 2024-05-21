import React, { useState, useEffect, useRef, use } from "react";
import { useAddress, useBalance, Web3Button, useContract, useContractRead, useContractWrite, useStorageUpload } from "@thirdweb-dev/react";
import ItemManageModal from "./ItemManageModal";
const ItemManage = ({ offerData, listings }) => {
  const [listingModal, setListingModal] = useState(false);

  const handleListingModal = () => {
    setListingModal(!listingModal);
  };

  return (
    <>
      <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border flex flex-col gap-4 bg-white p-8">
        <div className=" sm:flex sm:flex-wrap">
          <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
            Buying the ad space give you the exclusive right to submit an ad. The media still has the power to validate or reject ad assets. You re free to change the ad at anytime. And free to resell on the open market
            your ad space.{" "}
          </span>
        </div>

        {/* {listings.length <= 0 && (
          <div className="w-full flex justify-center">
            <button type="button" className="bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all" onClick={handleListingModal}>
              Create a listing
            </button>
          </div>
        )} */}
      </div>
      {listingModal && (
        <div className="modal fade show block">
          <ItemManageModal handleListingModal={handleListingModal} offerData={offerData} />
        </div>
      )}
    </>
  );
};

export default ItemManage;
