import { useState } from "react";
import DatePicker from "react-datepicker";

import { FileUploader } from "react-drag-drop-files";

const Step_3_Create = ({ stepsRef, styles, startDate, setStartDate, endDate, setEndDate, selectedNumber, handleNumberChange,selectedParameter, handleParameterChange }) => {
  const AdParameterData = [
    {
      type: "Logo & Link",
      value: ["logoURL", "linkURL"],
    },
    {
      type: "Banner & Link",
      value: ["bannerURL", "linkURL"],
    },
    {
      type: "Video & Link",
      value: ["videoURL", "linkURL"],
    },
  ];
  return (
    <div ref={(el) => (stepsRef.current[2] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-14">Step 3</h3>
        {/* <!-- Validity period --> */}
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

        {/* <!-- Number of ad spaces --> */}
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Number of ad spaces for this offer
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Warning: d&gt;sponsor works with a fixed supply of ad spaces. You won&apos;t be able to modify this value. Max : 25</p>
          <div className="flex gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
            <label htmlFor="numberSelect">Select a number:</label>
            <select
              id="numberSelect"
              value={selectedNumber}
              onChange={handleNumberChange}
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-15 hover:ring-2 dark:text-white"
            >
              {[...Array(25)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-center">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Type of ad spaces for this offer
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Select the type of your offer</p>
          <div className="flex gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
            <label htmlFor="numberSelect">Select ads type:</label>
            <select
              id="numberSelect"
              value={selectedParameter}
              onChange={handleParameterChange}
              className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300  rounded-lg py-3 px-15 hover:ring-2 dark:text-white"
            >
              {AdParameterData.map((parameter, index) => (
                <option key={index} value={parameter.value}>
                  {parameter.type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_3_Create;
