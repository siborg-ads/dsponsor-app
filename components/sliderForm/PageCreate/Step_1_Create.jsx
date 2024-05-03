import { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";

import { FileUploader } from "react-drag-drop-files";
import ModalHelper from "../../Helper/modalHelper";

const Step_1_Create = ({ stepsRef, styles, setDisplayedParameter, displayedParameter, selectedNumber, setSelectedNumber, selectedIntegration, imageRatios, setImageRatios, setSelectedIntegration, setSelectedParameter }) => {
  
  const [customRatioInputShown, setCustomRatioInputShown] = useState({});
  const [validRatio, setValidRatio] = useState({});
  const [customImageRatio, setCustomImageRatio] = useState({});
  const AdIntegrationData = [
    {
    integrationName : "ClickableLogosGrid",
    imageExemple : "/images/offer_exemple_0.png",
    bodyDescription : "This integration allows you to display a grid of clickable logos. Each logo can redirect to a different URL. You can choose the number of logos to display and the image ratio for each logo."
}, 
{integrationName : "DynamicBanner",
imageExemple : "/images/offer_exemple_1.png",
bodyDescription : "This integration allows you to display a dynamic banner. You can choose the image ratio of the banner. The banner can redirect to a URL when clicked."
}

];
const predefinedRatios = ["1:1", "16:9", "4:3"];

  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value, 10));
  };

  const handleIntegrationChange = (e) => {
    const { value, checked } = e.target;
    const intValue = parseInt(value);

    if (checked) {
      setSelectedIntegration((prev) => [...prev, intValue]);
      setImageRatios((prev) => ({
        ...prev,
        [intValue]: prev[intValue] || "1:1", 
      }));
      handleAddParameter(intValue);
    } else {
      setSelectedIntegration((prev) => prev.filter((item) => item !== intValue));
      handleRemoveParameter(intValue);
    }
  };

  const handleAddParameter = (value) => {
    const initialRatio = imageRatios[value] || "";
    let paramsToAdd = [];
    switch (value) {
      case 0:
        paramsToAdd = [`imageURL-${value}${initialRatio ? `-${initialRatio}` : ""}`, `linkURL-${value}`];
        setDisplayedParameter((prev) => [...prev, "ClickableLogosGrid"]);
        
        break;
      case 1:
        paramsToAdd = [`imageURL-${value}${initialRatio ? `-${initialRatio}` : ""}`, `linkURL-${value}`];
        setDisplayedParameter((prev) => [...prev, "DynamicBanner"]);
        break;
      default:
        break;
    }
    setSelectedParameter((prev) => [...prev, ...paramsToAdd]);
  };

  const handleRemoveParameter = (value) => {
    let paramsToRemove = [];
    switch (value) {
      case 0:
        paramsToRemove = [`imageURL-${value}`, `linkURL-${value}`];
        
        const filter0 = displayedParameter.filter((item) => item !== "ClickableLogosGrid");
        setDisplayedParameter(filter0);
        break;
      case 1:
        paramsToRemove = [`imageURL-${value}`, `linkURL-${value}`];
        const filter1 = displayedParameter.filter((item) => item !== "DynamicBanner");
        setDisplayedParameter(filter1);
        break;
      default:
        break;
    }
    setSelectedParameter((prev) => {
      const removalCount = {};
      paramsToRemove.forEach((param) => {
        removalCount[param] = 1;
      });

      return prev.filter((param) => {
        const baseParam = param.split("-").slice(0, 2).join("-");
        if (removalCount[baseParam] && removalCount[baseParam] > 0) {
          removalCount[baseParam] -= 1;
          return false;
        }
        return true;
      });
    });
  };

  
  const updateParameterWithRatio = (index, ratio) => {
    setSelectedParameter((prev) => {
      return prev.map((param) => {
        if (param.startsWith(`imageURL-${index}`) && !param.includes("linkURL")) {
          return `imageURL-${index}-${ratio}`;
        }
        return param;
      });
    });
  };
  const handleCustomRatioChange = (index, e) => {
    const { value } = e.target;
   
    setImageRatios((prev) => ({ ...prev, [index]: value }));
  
    if (value === "custom") {
      
      setCustomRatioInputShown((prev) => ({ ...prev, [index]: true }));
    } else {
     
      setCustomRatioInputShown((prev) => ({ ...prev, [index]: false }));
     
      if (isValidRatioFormat(value)) {
        updateParameterWithRatio(index, value);
        setValidRatio((prev) => ({ ...prev, [index]: true }));
      } else {
        setValidRatio((prev) => ({ ...prev, [index]: false }));
      }
    }
  };
  const handleCustomRatioInput = (index, e) => {
    const { value } = e.target;
   setCustomImageRatio((prev) => ({ ...prev, [index]: value }));
    if (isValidRatioFormat(value)) {
      setImageRatios((prev) => ({ ...prev, [index]: value }));
      updateParameterWithRatio(index, value);
      setValidRatio((prev) => ({ ...prev, [index]: true }));
    } else {
      setImageRatios((prev) => ({ ...prev, [index]: "custom" }));
      setValidRatio((prev) => ({ ...prev, [index]: false }));
    }
  };
  


  const isValidRatioFormat = (ratio) => {

    return /^\d+:\d+$/.test(ratio); 
  };

  return (
    <div ref={(el) => (stepsRef.current[0] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-2">Step 1 : Offer Type & Availability</h3>

        <p className="text-center pt-2  mb-14 dark:text-white">Choose offer category and number of ads.</p>
        {/* <!-- Ad Space type --> */}
        <div className="mb-6 flex  flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
              Type of ad spaces for this offer
              <span className="text-red">*</span>
            </label>
            <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Select the type of your offer</p>
            <div className="flex flex-col gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
              <label htmlFor="adsType">Select ads type:</label>
              <div id="adsType" className="flex flex-wrap justify-center gap-2">
                {AdIntegrationData.map((integration, index) => (
                  <div key={index} className="relative ">
                    <div
                      className={`card ${selectedIntegration.includes(index) ? "bg-accent-dark" : ""}`}
                      onClick={() => {
                        document.getElementById(`checkbox-${index}`).click();
                      }}
                    >
                      <input id={`checkbox-${index}`} type="checkbox" value={index} checked={selectedIntegration.includes(index)} onChange={handleIntegrationChange} className="hidden" />
                      <div className="flex gap-3 ">

                      <label
                        htmlFor={`checkbox-${index}`}
                        className={`card-label ${selectedIntegration.includes(index) ? "text-white" : "text-jacarta-700"}`}
                        onClick={() => {
                          document.getElementById(`checkbox-${index}`).click();
                        }}
                      >
                        {integration.integrationName}
                      </label>
                        <ModalHelper dark={true} title={integration.integrationName} body={integration.bodyDescription} image={integration.imageExemple}  />
                      </div>
                      {selectedIntegration.includes(index) && (
                        <div className="flex flex-col items-center mt-4">
                          <label htmlFor={`imageRatioSelect-${index}`} className="font-display text-sm mb-2 block text-white">
                            Select Image Ratio
                            <span className="text-red">*</span>
                          </label>
                          <select
                            id={`imageRatioSelect-${index}`}
                            onClick={(e) => e.stopPropagation()}
                            value={predefinedRatios.includes(imageRatios[index]) ? imageRatios[index] : "custom"}
                            onChange={(e) => handleCustomRatioChange(index, e)}
                            className="select-style text-jacarta-700"
                          >
                            {predefinedRatios.map((ratio) => (
                              <option key={ratio} value={ratio}>
                                {ratio}
                              </option>
                            ))}
                            <option value="custom">Custom...</option>
                          </select>
                          {customRatioInputShown[index] && (
                            <div className="relative">
                              <input
                                type="text"
                                value={customImageRatio[index] === "custom" ? "" : customImageRatio[index]}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleCustomRatioInput(index, e)}
                                placeholder="e.g., 16:10"
                                className={`mt-2 dark:bg-jacarta-700  hover:ring-accent/10 focus:ring-accent dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white ${
                                  validRatio[index] ? "border-green border-2" : "border-red"
                                }`}
                              />
                              {validRatio[index] && <span className="absolute right-3 text-green font-bold top-5">✓</span>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
      </div>
    </div>
  );
};

export default Step_1_Create;
