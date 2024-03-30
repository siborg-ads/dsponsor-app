import { useState } from "react";
import DatePicker from "react-datepicker";

import { FileUploader } from "react-drag-drop-files";

const Step_4_Create = ({
  stepsRef,
  styles,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedUnitPrice,
  handleUnitPriceChange,
  selectedCurrency,
  handleCurrencyChange,
  customContract,
  handleCustomContractChange,
  selectedRoyalties,
  handleRoyaltiesChange,
}) => {
  return (
    <div ref={(el) => (stepsRef.current[3] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-2">Step 4 : Validity & Financials</h3>
        <p className="text-center pt-2  mb-14 dark:text-white"> Set offer&apos;s end date, currency, and royalties.</p>
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Validity period<span className="text-red">*</span>
          </label>
          <div className="flex gap-4 items-center text-jacarta-700 dark:text-white">
            <div className="flex flex-col justify-center items-center gap-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
              />
              <span className="text-jacarta-700 dark:text-white">Start date</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
              />
              <span className="text-jacarta-700 dark:text-white">End date</span>
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Unit selling price
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">
            EUR payment means you&apos;ll receive JEUR tokens (1 JEUR = 1€). USD payment means you&apos;ll receive JUSD tokens (1 JUSD = 1$). You&apos;ll be able to cash out via wire transfer with a service like
            MtPelerin. You can change the pricing later.
          </p>
          <div className="flex  gap-4 items-center text-jacarta-700 dark:text-white">
            <input
              id="numberInput"
              type="number"
              min="0.01"
              step="0.01"
              value={selectedUnitPrice}
              onChange={handleUnitPriceChange}
              placeholder="Unit selling price"
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            />
            <div className="flex gap-4">
              <select
                id="currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
              >
                <option value="USDC">USDC</option>
                <option value="ETH">ETH</option>
                <option value="WETH">WETH</option>
                <option value="custom">Custom</option>
              </select>
              {selectedCurrency === "custom" && (
                <input
                  type="text"
                  value={customContract}
                  onChange={handleCustomContractChange}
                  placeholder="Contract address"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                />
              )}
            </div>
          </div>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mt-3">You&apos;ll earn up to 1600 USDC. As d&gt;sponsor charges a fee of 4%, sponsors will pay 208 USDC.</p>
        </div>

        {/* <!-- Royalties --> */}
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Royalties
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400  text-2xs mb-3">
            Sponsors can sell an ad space ownership on the marketplace. Define the fee you want to get from secondary sales. Sponsors might refuse to buy an ad space if your royalty fee is too high. You can change this
            value pricing later.
          </p>
          <div className="flex  gap-4 items-center text-jacarta-700 dark:text-white">
            <input
              id="numberInput"
              type="number"
              min="0"
              step="0.01"
              max="100"
              value={selectedRoyalties}
              onChange={handleRoyaltiesChange}
              placeholder="Royalties"
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-15 hover:ring-2 dark:text-white"
            />
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_4_Create;
