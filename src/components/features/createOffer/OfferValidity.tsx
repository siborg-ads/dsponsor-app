import React from "react";
import { DatePicker } from "@nextui-org/react";
import "react-datepicker/dist/react-datepicker.css";
import ModalHelper from "@/components/ui/modals/Helper";
import Input from "@/components/ui/Input";
import { Currency } from "@/components/layout/CreateOffer";
import { Address } from "thirdweb";
import formatAndRoundPrice from "@/utils/prices/formatAndRound";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";

// const ConditionalRender = ({ condition, children }) => (condition ? <div>{children}</div> : null);

const OfferValidity = ({
  stepsRef,
  styles,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedUnitPrice,
  handleUnitPriceChange,
  selectedRoyalties,
  handleRoyaltiesChange,
  numSteps,
  currentSlide,
  currencies,
  tokenSymbol,
  tokenDecimals,
  customTokenAddress,
  setCustomTokenAddress,
  selectedCurrency,
  setSelectedCurrency,
  customCurrencyEnabled,
  setCustomCurrencyEnabled
}: {
  stepsRef: any;
  styles: any;
  startDate: Date;
  setStartDate: any;
  endDate: Date;
  setEndDate: any;
  selectedUnitPrice: number;
  handleUnitPriceChange: any;
  selectedRoyalties?: number;
  handleRoyaltiesChange?: any;
  numSteps: number;
  currentSlide: number;
  currencies: Currency[];
  tokenSymbol: string;
  tokenDecimals: number;
  tokenAddress: Address;
  customTokenAddress: Address | undefined;
  setCustomTokenAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
  selectedCurrency: Currency | undefined;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | undefined>>;
  customCurrencyEnabled: boolean;
  setCustomCurrencyEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    const isCurrencyKnown = currencies?.find((c) => c?.address === currency);

    if (isCurrencyKnown) {
      setSelectedCurrency(isCurrencyKnown);
      setCustomCurrencyEnabled(false);
      return;
    }

    setCustomCurrencyEnabled(true);
    setSelectedCurrency(undefined);
  };

  const handleCustomContractChange = (event) => {
    const contractAddress = event.target.value;
    setCustomTokenAddress(contractAddress);
  };

  const renderDatePicker = (date, setDate, label, helper) => (
    <div className="flex flex-col items-center justify-center gap-1">
      <DatePicker
        minValue={today(getLocalTimeZone())}
        value={parseDate(new Date(date).toISOString().slice(0, 10))}
        onChange={(date) => {
          setDate(new Date(date.year, date.month - 1, date.day + 1));
        }}
        showMonthAndYearPickers
      />
      <div className="flex items-center justify-center gap-2">
        <span className="text-jacarta-900 dark:text-white">{label}</span>
        <ModalHelper title={helper.title} body={helper.body} size="small" />
      </div>
    </div>
  );

  return (
    <>
      {currentSlide === 3 && (
        <div
          ref={(el) => {
            stepsRef.current[3] = el;
          }}
          className={styles.form__step}
        >
          <div className="relative flex flex-col items-center gap-8 pl-2 pr-6">
            <div className="absolute top-0 right-0">
              {currentSlide + 1}/{numSteps}
            </div>
            <div className="flex flex-col items-center w-full pb-2 shadow-2xl border-b-1 border-primaryPurple ">
              <h3 className="mb-2 text-jacarta-100">Validity & Financials</h3>
              <p className="pt-2 text-center dark:text-white">
                Set offer&apos;s validity period, currency, and royalties.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <label
                htmlFor="item-description"
                className="block mb-2 font-display text-jacarta-900 dark:text-white"
              >
                Validity period<span className="text-red">*</span>
              </label>
              <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                Set the validity period for your offer. During this time, the acquired NFT grants
                the right to display an advertisement in the reserved space on your platform. The
                duration of this period may affect the resale value of these NFTs on the secondary
                market.
              </p>
              <div className="flex items-center gap-4 mb-3 text-jacarta-900 dark:text-white">
                {renderDatePicker(startDate, setStartDate, "Start date", {
                  title: "Start date",
                  body: "You are free to choose the start date for the offer's validity. By default, it will be today's date."
                })}
                {renderDatePicker(endDate, setEndDate, "End date", {
                  title: "End date",
                  body: "If you do not wish to set a time limit, choose a distant end date."
                })}
              </div>
            </div>
            <div className="flex flex-col items-center mb-6">
              <label
                htmlFor="unit-price"
                className="block mb-2 font-display text-jacarta-900 dark:text-white"
              >
                Unit selling price <span className="text-red">*</span>
              </label>
              {/*
                <ConditionalRender condition={["USDT", "USDC"].includes(selectedCurrency?.symbol)}>
                  <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                    USD payment means you&apos;ll receive USD tokens (1 USDC = 1$). You&apos;ll be
                    able to cash out via wire transfer with a service like MtPelerin. You can change
                    the pricing later.
                  </p>
                </ConditionalRender>
             */}
              <div className="flex flex-wrap items-center gap-4 text-jacarta-900 dark:text-white">
                <Input
                  id="unit-price"
                  type="number"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  step={0.1}
                  value={selectedUnitPrice}
                  onChange={handleUnitPriceChange}
                  placeholder="Unit selling price"
                  maxLength={tokenDecimals}
                  className="flex-grow px-3 py-3 rounded-lg border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 hover:ring-2 dark:text-white"
                />

                <div className="flex w-full gap-4">
                  <select
                    id="currency"
                    value={selectedCurrency?.address ? selectedCurrency?.address : "custom"}
                    onChange={handleCurrencyChange}
                    className="bg-jacarta-800 min-w-[110px] border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                  >
                    {currencies?.map((currency) => (
                      <option key={currency?.address} value={currency?.address}>
                        {currency?.symbol}
                      </option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>
                  {customCurrencyEnabled && (
                    <Input
                      type="text"
                      value={`${customTokenAddress ? customTokenAddress : ""}`}
                      onChange={handleCustomContractChange}
                      placeholder="Contract address"
                      className={`${customTokenAddress ? "border-green" : "border-red"}`}
                    />
                  )}
                </div>
              </div>
              {tokenSymbol ? (
                <p className="mt-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                  You&apos;ll earn {selectedUnitPrice} {tokenSymbol} per minted token.
                  <br /> Since the protocol charges a 4% fee, sponsors will pay{" "}
                  {formatAndRoundPrice(selectedUnitPrice * 1.04)} {tokenSymbol}.
                </p>
              ) : (
                <p className="mt-3 text-red text-2xs">The currency is not valid.</p>
              )}
            </div>
            <div className="flex flex-col items-center mb-6">
              <label
                htmlFor="royalties"
                className="block mb-2 font-display text-jacarta-900 dark:text-white"
              >
                Royalties <span className="text-red">*</span>
              </label>
              <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
                Sponsors can sell ad space ownership on the marketplace. Define the fee you want to
                receive from secondary sales. Keep in mind that sponsors may refuse to buy ad space
                if your royalty fee is too high. You can change this value later.
              </p>
              <div className="flex items-center gap-4 text-jacarta-900 dark:text-white">
                <Input
                  id="royalties"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  step={0.01}
                  max={100}
                  pattern="^\d+(?:[.,]\d+)?$"
                  value={selectedRoyalties}
                  onChange={handleRoyaltiesChange}
                  placeholder="Royalties"
                  className="px-3 py-3 rounded-lg border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 hover:ring-2 dark:text-white"
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfferValidity;
