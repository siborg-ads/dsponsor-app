import { Checkbox } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { StepType } from "../../profile/tabs/OwnedTokens";

const AdBriefing = ({
  stepsRef,
  styles,
  adParameters,
  setImageUrlVariants,
  currentSlide,
  numSteps,
  steps,
  setSteps
}: {
  stepsRef: React.MutableRefObject<any>;
  styles: any;
  adParameters: any;
  setImageUrlVariants: React.Dispatch<React.SetStateAction<string[]>>;
  currentSlide: number;
  numSteps: number;
  steps: StepType[];
  setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
}) => {
  // const [selectedItems, setSelectedItems] = useState<any[]>([]);

  // useEffect(() => {
  //   if (!adParameters) return;
  //   setSelectedItems(adParameters);
  //   const imageVariants = adParameters
  //     .filter((id) => id.startsWith("imageURL"))
  //     .map((id) => id.slice("imageURL-".length));

  //   setImageUrlVariants((prev) => [...prev, ...imageVariants]);
  // }, [adParameters, setImageUrlVariants]);

  return (
    <div
      ref={(el) => {
        stepsRef.current[0] = el;
      }}
      className={styles.form__step}
    >
      <div className="pl-2 pr-6">
        <h3 className="mb-12 !text-jacarta-100">
          Step {currentSlide + 1}/{numSteps} : Ad Description
        </h3>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              To display your ad you need to provide the following parameters:
              {/* <DisplayImageIds ids={selectedItems} /> */}
              <div>
                <p className="font-display">Image :</p>
                {steps
                  .filter(({ adParameter }) => adParameter.startsWith("imageURL"))
                  .map((step) => {
                    const { adParameter, selected } = step;
                    const variant = adParameter.slice("imageURL-".length);

                    return (
                      <div key={adParameter}>
                        <ul>
                          <li>
                            <div className="flex justify-between w-3/4">
                              {variant
                                ? `- Format : ${variant} (example:
                              ${(() => {
                                const [width, height] = variant.split(":");
                                return width && height
                                  ? `${parseFloat(width) * 100}x${parseFloat(height) * 100}px`
                                  : "No size";
                              })()})`
                                : "- Format : No restrictions on ratio"}
                              {/* add a checkbox to determine if the image is mandatory */}
                              <Checkbox
                                color="secondary"
                                checked={selected}
                                defaultChecked={selected}
                                defaultSelected={selected}
                                isSelected={selected}
                                onChange={() => {
                                  setSteps((prev) => {
                                    const newSteps = prev.map((step) => {
                                      if (step.adParameter === adParameter) {
                                        return { ...step, selected: !step.selected };
                                      }
                                      return step;
                                    });
                                    return newSteps;
                                  });
                                }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                {steps.filter((step) => step.adParameter.startsWith("linkURL")).length !== 0 && (
                  <p className="font-display">Link :</p>
                )}
                {steps
                  .filter((step) => step.adParameter.startsWith("linkURL"))
                  .map((step) => {
                    const { adParameter, selected } = step;
                    const variant = adParameter.slice("linkURL-".length);
                    return (
                      <div key={adParameter}>
                        <ul>
                          <li>
                            <div className="flex justify-between w-3/4">
                              {variant ? `- ${variant}` : "- Should start with https://"}
                              <Checkbox
                                color="secondary"
                                checked={selected}
                                defaultChecked={selected}
                                defaultSelected={selected}
                                isSelected={selected}
                                onChange={() => {
                                  setSteps((prev) => {
                                    const newSteps = prev.map((step) => {
                                      if (step.adParameter === adParameter) {
                                        return { ...step, selected: !step.selected };
                                      }
                                      return step;
                                    });
                                    return newSteps;
                                  });
                                }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
              {/* <select
                id="adIntegrationSelect"
                className="dark:bg-secondaryBlack min-w-[110px] border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-800 dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-5 hover:ring-2 dark:text-white"
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

export default AdBriefing;
