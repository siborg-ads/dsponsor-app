import React, { useEffect, useState } from "react";
import {
  currencyAdress,
  defaultChainId,
} from "../../app/marketplace/marketplace.config";
const chainId = defaultChainId;
export default function CreateListingModal({
  isOpen,
  setIsOpen,
  handleCreateListing,
}) {
  //TODO : delete end time input and make propositions (1 month, 6 months... look in opensea)

  const [listingType, setListingType] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const formatDateTime = (date) => {
    return date.toISOString().slice(0, 16); // TODO : Format is YYYY-MM-DDTHH:MM but change that later
  };
  const [startTime, setStartTime] = useState(formatDateTime(new Date()));
  const [endTime, setEndTime] = useState(
    formatDateTime(new Date(new Date().getTime() + 3600000))
  ); // 1 hour later
  const handleCreateListingSubmit = async (event) => {
    event.preventDefault();
    const currencyAddress = currencyAdress[chainId][currency];
    const reservePricePerToken = Number(price);

    console.log("currencyAddress", currencyAddress);
    let buyoutPricePerToken;

    if (listingType === "Direct") {
      buyoutPricePerToken = reservePricePerToken;
    } else if (listingType === "Auction") {
      buyoutPricePerToken = 10000 * reservePricePerToken; // For auction, buyout price is 10000 times the reserve price
    }
    const startTimeToAdd = Math.floor(new Date(startTime).getTime() / 1000);
    const endTimeToAdd = Math.floor(new Date(endTime).getTime() / 1000);
    const secondsUntilEndTime = endTimeToAdd - startTimeToAdd;
    const newListing = {
      listingType,
      currency: currencyAddress,
      startTime: startTimeToAdd,
      secondsUntilEndTime: secondsUntilEndTime,
      reservePricePerToken,
      buyoutPricePerToken,
    };
    console.log("now", new Date().getTime() / 1000);
    console.log("diff", startTimeToAdd - new Date().getTime() / 1000);
    console.log("Creating listing with data:", newListing);
    await handleCreateListing(newListing);
  };

  useEffect(() => {
    if (new Date(endTime) < new Date(startTime)) {
      setEndTime(
        formatDateTime(new Date(new Date(startTime).getTime() + 3600000))
      );
    }
  }, [startTime, endTime]);
  return (
    <>
      <div
        className={isOpen ? "modal fade show block" : "modal hide"}
        id="placeBidModal"
        tabIndex="-1"
        aria-labelledby="placeBidLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog max-w-4xl">
          <div className="modal-content bg-sigray-light border-sigray-border">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="placeBidLabel">
                Create a new listing
              </h5>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-6 w-6 fill-current"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            <div className="modal-body p-6">
              <form className="space-y-6" onSubmit={handleCreateListingSubmit}>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Listing Type
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="block w-full max-w-lg px-3 py-2 text-base text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={listingType}
                    onChange={(e) => setListingType(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a listing type
                    </option>
                    <option value="Auction">Auction</option>
                    <option value="Direct">Direct</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full max-w-lg  rounded-md border-0 px-3 py-2 focus:ring-accent focus:ring-inset dark:text-jacarta-700"
                    placeholder="100"
                    min={0.00001} // TODO : see with the team
                    step={0.00001}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="currency"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="block w-full max-w-lg px-3 py-2 text-base text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a currency
                    </option>
                    <option value="WETH">WETH</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    id="startTime"
                    name="startTime"
                    className="block w-full max-w-lg px-3 py-2 text-sm rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                    min={formatDateTime(new Date())}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    className="block w-full max-w-lg px-3 py-2 text-sm rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                    min={startTime} // Cannot be less than startTime
                    max="2026-12-31T23:30"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center w-full max-w-xs  px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Add New Listing
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
