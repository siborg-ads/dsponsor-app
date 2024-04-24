import React, { useState } from "react";
import Image from "next/image";

const Step_1_Mint = ({ stepsRef, styles, adParameters, setSelectedParamsIntegration }) => {
  const [selectedIntegration, setSelectedIntegration] = useState("");
  const [details, setDetails] = useState({ requiredParams: [], platforms: [] });

  const handleSelectionChange = (event) => {
    const selected = event.target.value;
    setSelectedIntegration(selected);
    const selectedDetails = adParameters.find((integration) => integration.name === selected);
    setSelectedParamsIntegration(selectedDetails);
    if (selectedDetails) {
      setDetails({
        requiredParams: selectedDetails.requiredParams,
        platforms: selectedDetails.platforms,
      });
    } else {
      setDetails({ requiredParams: [], platforms: [] });
    }
  };

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
              <select
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
              </select>
              {selectedIntegration && (
                <div>
                  <h3>Details for {selectedIntegration}:</h3>
                  <p>Required Parameters: {details.requiredParams.join(", ")}</p>
                  <p>Supported Platforms: {details.platforms.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <Image width={120} height={120} src={`/images/offer_exemple_0.png`} alt="headling" className="mr-1 inline-block bg-contain bg-center text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_1_Mint;
