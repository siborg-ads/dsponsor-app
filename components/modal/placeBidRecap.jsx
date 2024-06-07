import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { fetchAllTokenListedByListingId } from "../../providers/methods/fetchAllTokenListedByListingId";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { XMarkIcon } from "@heroicons/react/20/solid";

const PlaceBidRecap = ({ isOpen, setIsOpen, listingId, offerId, tokenId }) => {
  const [priceToPay, setPriceToPay] = useState(null);
  const [refundedPrice, setRefundedPrice] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minBid, setMinBid] = useState(null);
  const [currencyTicker, setCurrencyTicker] = useState(null);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const fetchData = async (chainId) => {
    const data = await fetchAllTokenListedByListingId(chainId);

    if (data) {
      setPriceToPay(data.priceToPay);
      setRefundedPrice(data.refundedPrice);
      setEndDate(data.endDate);
      setMinBid(data.minBid);
      setCurrencyTicker(data.currencyTicker);
    }
  };

  useEffect(() => {
    if (chainId) {
      fetchData(chainId);
    }
  }, [chainId]);

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur">
          <DialogPanel className="max-w-lg relative space-y-4 border bg-jacarta-900 border-jacarta-100 border-opacity-10 rounded-xl p-8 flex flex-col gap-8">
            <button className="absolute p-2 top-0 right-0" onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-8 h-8 text-white hover:bg-jacarta-700 rounded-full p-1" />
            </button>
            <div className="text-xl text-white font-semibold flex flex-col text-center py-8 px-12 shadow bg-gray-contrast rounded-xl">
              <span>You will pay</span>
              <span>
                {priceToPay ?? 110} {currencyTicker ?? "USDC"}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-xl font-semibold text-white">What&apos;s next?</span>
              <span className="text-white">
                If someone outbids you by at least {minBid ?? 115.5} {currencyTicker ?? "USDC"}{" "}
                before the {endDate ?? "01/01/2024"}, you will receive your bid amount back plus an
                additional reward. However, if no one outbids you by the {endDate ?? "01/01/2024"},
                you will get the ad space.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mx-auto justify-between w-full">
                <div className="bg-accent-light hover:-translate-y-2 duration-400 shadow p-4 w-32 h-32 md:w-48 md:h-48 rounded-xl font-semibold text-base md:text-xl text-white flex justify-center items-center text-center">
                  Ad Space transferred
                </div>

                <span className="text-white font-semibold text-base md:text-lg">OR</span>

                <div className="bg-accent-light hover:-translate-y-2 duration-400 shadow p-4 w-32 h-32 md:w-48 md:h-48 rounded-xl font-semibold text-base md:text-xl text-white flex justify-center items-center text-center">
                  {refundedPrice ?? 115.7} {currencyTicker ?? "USDC"} refunded
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-white flex w-32 md:w-48 items-center text-center justify-center">
                  Scenario 1
                </div>
                <div className="text-white flex w-32 md:w-48 items-center text-center justify-center">
                  Scenario 2
                </div>
              </div>
            </div>

            {/* 
            <button className="flex shadow items-center justify-center w-full mx-auto bg-accent-light hover:bg-accent-light hover:bg-opacity-80 duration-200 text-white text-xl font-semibold py-4 rounded-xl">
              Submit Bid
            </button>
            */}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default PlaceBidRecap;
