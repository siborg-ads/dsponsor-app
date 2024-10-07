import { useState, useCallback, Dispatch, SetStateAction } from "react";
import ModalHelper from "@/components/ui/modals/Helper";
import Input from "@/components/ui/Input";
import { Switch } from "@nextui-org/react";
import { cn } from "@/lib/utils";

const AdSpaceSelector = ({
  AdIntegrationData,
  selectedIntegration,
  handleIntegrationChange,
  imageRatios,
  handleCustomRatioChange,
  handleCustomRatioInput,
  customRatioInputShown,
  customImageRatio,
  validRatio,
  predefinedRatios
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-col">
      <label className="block mb-2 text-center font-display text-jacarta-900 dark:text-white">
        Type of ad space for this offer <span className="text-red">*</span>
      </label>
      <p className="mb-3 text-center dark:text-jacarta-100 text-2xs">
        Select the appropriate type.
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-2">
      {AdIntegrationData.map((integration, index) => (
        <div key={index} className="relative">
          <div
            className={`card relative ${selectedIntegration.includes(index) ? "bg-primaryPurple-dark" : "hover:ring-primaryPurple/30 border-primaryPurple border-2"}`}
            onClick={(e) => {
              if (e?.target === e?.currentTarget)
                document?.getElementById(`checkbox-${index}`)?.click();
            }}
          >
            {selectedIntegration?.includes(index) && (
              <span className="absolute z-30 flex items-center justify-center w-6 h-6 font-bold border-2 border-green rounded-2xl -right-3 text-green -bottom-2">
                ✓
              </span>
            )}

            <Input
              id={`checkbox-${index}`}
              type="checkbox"
              value={index}
              checked={selectedIntegration.includes(index)}
              onChange={handleIntegrationChange}
              className="hidden"
            />

            <div className="flex gap-3">
              <div
                className={`card-label ${selectedIntegration.includes(index) && "text-white"}`}
                onClick={(e) => {
                  e?.stopPropagation();
                  document?.getElementById(`checkbox-${index}`)?.click();
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e?.key === "Enter" || e?.key === " ") {
                    document?.getElementById(`checkbox-${index}`)?.click();
                  }
                }}
              >
                {integration.integrationName}
              </div>

              <ModalHelper
                dark={false}
                title={integration.integrationName}
                body={integration.bodyDescription}
                tooltips={integration.tooltips}
                images={integration.imagesExemple ?? ""}
                titleImages={integration.titleImages ?? ""}
              />
            </div>

            {selectedIntegration.includes(index) && (
              <RatioSelector
                index={index}
                predefinedRatios={predefinedRatios}
                imageRatios={imageRatios}
                customRatioInputShown={customRatioInputShown}
                customImageRatio={customImageRatio}
                validRatio={validRatio}
                handleCustomRatioChange={handleCustomRatioChange}
                handleCustomRatioInput={handleCustomRatioInput}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RatioSelector = ({
  index,
  predefinedRatios,
  imageRatios,
  customRatioInputShown,
  customImageRatio,
  validRatio,
  handleCustomRatioChange,
  handleCustomRatioInput
}) => (
  <div className="flex flex-col items-center mt-4">
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={`imageRatioSelect-${index}`} className="text-sm text-white font-display">
        Select Image Ratio <span className="text-red">*</span>
      </label>
      <ModalHelper
        title="Image ratio"
        body="Specify the ratio of the image you expect from the sponsor."
        size="small"
      />
    </div>
    <select
      id={`imageRatioSelect-${index}`}
      onClick={(e) => e.stopPropagation()}
      value={predefinedRatios.includes(imageRatios[index]) ? imageRatios[index] : "custom"}
      onChange={(e) => handleCustomRatioChange(index, e)}
      className="select-style text-jacarta-900"
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
        <Input
          type="text"
          value={customImageRatio[index]}
          onChange={(e) => handleCustomRatioInput(index, e)}
          onClick={(e) => e.stopPropagation()}
          placeholder="e.g., 16:10"
          className={`mt-2 w-full rounded-lg py-3 px-3 ${validRatio[index] ? "border-green border-2" : "border-red"}`}
        />
        {validRatio[index] && (
          <span className="absolute font-bold right-3 text-green top-5">✓</span>
        )}
      </div>
    )}
  </div>
);

const AdSpaceNumberSelector = ({ selectedNumber, handleNumberChange }) => (
  <div className="flex flex-col items-center mb-6">
    <label className="block mb-2 font-display text-jacarta-900 dark:text-white">
      Number of ads to display for this offer <span className="text-red">*</span>
    </label>
    <p className="mb-3 dark:text-jacarta-100 text-2xs">
      {/*  Warning: DSponsor works with a fixed quantity of ads per location... */}
    </p>
    <div className="flex items-center justify-center w-full gap-4 text-jacarta-900 dark:text-white">
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="numberSelect">Select a number</label>
        <ModalHelper
          title="Number of ad spaces"
          body="Specify the number of tokens you want to sell."
        />
      </div>
      <select
        id="numberSelect"
        value={selectedNumber}
        onChange={handleNumberChange}
        className="py-3 rounded-lg bg-jacarta-800 border-jacarta-100 px-15"
      >
        {[...Array(25)].map((_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const ChooseParameters = ({
  parameters,
  setParameters
}: {
  parameters: string[];
  setParameters: Dispatch<SetStateAction<string[]>>;
}) => {
  const [isSelected, setIsSelected] = useState(parameters.includes("linkURL"));
  const onSwitchChange = (value) => {
    setIsSelected(value);
    if (value) {
      setParameters((prev) => [...prev, "linkURL"]);
    } else {
      setParameters((prev) => prev.filter((param) => param !== "linkURL"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="block mb-2 font-display text-jacarta-900 dark:text-white">Link</label>
      <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
        Do you want your offer to include a link that will redirect users upon ad interaction ?
      </p>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex mb-4">
            <span className="mr-3">No</span>
            <Switch
              isSelected={isSelected}
              onValueChange={onSwitchChange}
              classNames={{
                wrapper: "p-0 h-4 overflow-visible bg-primaryPurple",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  "group-data-[selected=true]:ml-6",
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                )
              }}
            />
            <span className="ml-1">Yes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OfferType = ({
  selectedParameter,
  setDisplayedParameter,
  selectedNumber,
  setSelectedNumber,
  selectedIntegration,
  imageRatios,
  setImageRatios,
  setSelectedIntegration,
  setSelectedParameter,
  numSteps,
  currentSlide
}) => {
  const [customRatioInputShown, setCustomRatioInputShown] = useState({});
  const [validRatio, setValidRatio] = useState({});
  const [customImageRatio, setCustomImageRatio] = useState({});

  const AdIntegrationData = [
    {
      integrationName: "Image Ad Space",
      imagesExemple: [
        "/images/examples/offer_exemple_0.png",
        "/images/examples/offer_exemple_1.png"
      ],
      titleImages: ["Clickable logos Grid", "Dynamic Banner"],
      tooltips: [
        "This ad integration lets you display a grid of clickable logos, like a sponsor section at the bottom of a webpage. Each slot in the grid will show a sponsor's logo, and clicking it will redirect to their URL. You can use this integration to display logos, with or without a link.",
        "This ad integration displays a randomly selected ad from the submitted sponsor ads, choosing a new one with each request."
      ],
      bodyDescription: "Available ad integrations: You are free to integrate ads as you like."
    }
  ];

  const predefinedRatios = ["1:1", "16:9", "4:3"];

  const handleNumberChange = useCallback(
    (e) => {
      setSelectedNumber(parseInt(e.target.value, 10));
    },
    [setSelectedNumber]
  );

  const handleAddParameter = useCallback(
    (value) => {
      const initialRatio = imageRatios[value] || "";
      let paramsToAdd: string[] = [];

      if (value === 0) {
        paramsToAdd = [`imageURL${initialRatio ? `-${initialRatio}` : ""}`, "linkURL"];
        setDisplayedParameter((prev) => [...prev, "ClickableLogosGrid"]);
      } else if (value === 1) {
        paramsToAdd = [`imageURL${initialRatio ? `-${initialRatio}` : ""}`, "linkURL"];
        setDisplayedParameter((prev) => [...prev, "DynamicBanner"]);
      }
      setSelectedParameter((prev) => [...prev, ...paramsToAdd]);
    },
    [imageRatios, setDisplayedParameter, setSelectedParameter]
  );

  const handleRemoveParameter = useCallback(
    (value) => {
      let paramsToRemove = [`imageURL-${value}`, `linkURL-${value}`];

      setDisplayedParameter((prev) =>
        prev.filter((item) => item !== (value === 0 ? "ClickableLogosGrid" : "DynamicBanner"))
      );
      setSelectedParameter((prev) => prev.filter((param) => !paramsToRemove.includes(param)));
    },
    [setDisplayedParameter, setSelectedParameter]
  );

  const handleIntegrationChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      const intValue = parseInt(value);

      if (checked) {
        setSelectedIntegration([intValue]);
        setImageRatios((prev) => ({
          ...prev,
          [intValue]: prev[intValue] || "1:1"
        }));
        handleAddParameter(intValue);
      } else {
        setSelectedIntegration((prev) => prev.filter((item) => item !== intValue));
        handleRemoveParameter(intValue);
      }
    },
    [setSelectedIntegration, setImageRatios, handleAddParameter, handleRemoveParameter]
  );

  const updateParameterWithRatio = useCallback(
    (index, ratio) => {
      setSelectedParameter((prev) =>
        prev.map((param) => (param.startsWith(`imageURL`) ? `imageURL-${ratio}` : param))
      );
    },
    [setSelectedParameter]
  );

  const handleCustomRatioChange = useCallback(
    (index, e) => {
      const { value } = e.target;

      setImageRatios((prev) => ({ ...prev, [index]: value }));

      if (value === "custom") {
        setCustomImageRatio((prev) => ({ ...prev, [index]: "" }));
        setCustomRatioInputShown((prev) => ({ ...prev, [index]: true }));
        setValidRatio((prev) => ({ ...prev, [index]: false }));
      } else {
        setCustomRatioInputShown((prev) => ({ ...prev, [index]: false }));
        if (/^\d+:\d+$/.test(value)) {
          updateParameterWithRatio(index, value);
          setValidRatio((prev) => ({ ...prev, [index]: true }));
        } else {
          setValidRatio((prev) => ({ ...prev, [index]: false }));
        }
      }
    },
    [
      setImageRatios,
      setCustomImageRatio,
      setCustomRatioInputShown,
      setValidRatio,
      updateParameterWithRatio
    ]
  );

  const handleCustomRatioInput = useCallback(
    (index, e) => {
      const { value } = e.target;

      setCustomImageRatio((prev) => ({ ...prev, [index]: value }));
      if (/^\d+:\d+$/.test(value)) {
        setImageRatios((prev) => ({ ...prev, [index]: value }));
        updateParameterWithRatio(index, value);
        setValidRatio((prev) => ({ ...prev, [index]: true }));
      } else {
        setImageRatios((prev) => ({ ...prev, [index]: "custom" }));
        setValidRatio((prev) => ({ ...prev, [index]: false }));
      }
    },
    [setCustomImageRatio, setImageRatios, setValidRatio, updateParameterWithRatio]
  );

  return (
    currentSlide === 0 && (
      <div className="flex flex-col gap-10">
        <div className="absolute top-0 right-0">
          {currentSlide + 1}/{numSteps}
        </div>
        <div className="flex flex-col items-center w-full pb-2 shadow-2xl border-b-1 border-primaryPurple">
          <h3 className="mb-2 text-jacarta-100"> OFFER TYPE & AVAILABILITY</h3>
          <p className="text-center dark:text-white">
            Choose the type of ad space that suits your media and specify the number of tokenized
            spaces available for purchase.
          </p>
        </div>
        <AdSpaceSelector
          AdIntegrationData={AdIntegrationData}
          selectedIntegration={selectedIntegration}
          handleIntegrationChange={handleIntegrationChange}
          imageRatios={imageRatios}
          handleCustomRatioChange={handleCustomRatioChange}
          handleCustomRatioInput={handleCustomRatioInput}
          customRatioInputShown={customRatioInputShown}
          customImageRatio={customImageRatio}
          validRatio={validRatio}
          predefinedRatios={predefinedRatios}
        />
        <ChooseParameters parameters={selectedParameter} setParameters={setSelectedParameter} />
        <AdSpaceNumberSelector
          selectedNumber={selectedNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>
    )
  );
};

export default OfferType;
