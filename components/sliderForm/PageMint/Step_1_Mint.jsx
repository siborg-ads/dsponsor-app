import React, { useState } from "react";
import Image from "next/image";

const Step_1_Mint = ({ stepsRef, styles, adParameters}) => {
 
  const selectedItems = adParameters.map((param) => param);
  const  DisplayImageIds =({ ids }) => {
  return (
    <div>
      <p className="font-display">Image :</p>
      {ids
        .filter((id) => id.startsWith("imageURL"))
        .map((id) => {
          const variant = id.slice("imageURL-".length);
          return (
            <div key={id}>
              <ul>
                <li>{variant ? `- ${variant}` : "- No variant"}</li>
              </ul>
            </div>
          );
        })}
      <p className="font-display">Link :</p>
      {ids
        .filter((id) => id.startsWith("linkURL"))
        .map((id) => {
          const variant = id.slice("link".length);
          return (
            <div key={id}>
              <ul>
                <li>{variant ? `- ${variant}` : "-No variant"}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}

  return (
    <div ref={(el) => (stepsRef.current[0] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-14">Step 1 : Offer Type</h3>
        <div className="mb-6 flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <label htmlFor="adIntegrationSelect" className="font-display text-jacarta-700 mb-2 block dark:text-white">
              Type of ad spaces for this offer:
            </label>
            <div className="flex flex-col gap-4">
              To display your ad you need to provide the following parameters:
              {DisplayImageIds({ ids: selectedItems })}
              {/* <select
                id="adIntegrationSelect"
                className="dark:bg-jacarta-700 min-w-[110px] border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
                value={selectedIntegration}
                onChange={handleSelectionChange}
              >
                <option value="">Select an Integration</option>
                {adParameters.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select> */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_1_Mint;
