import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import ModalHelper from "@/components/ui/modals/Helper";
import { FileUploader } from "react-drag-drop-files";
import { StepType } from "../../profile/tabs/OwnedTokens";

const AdImage = ({
  // id,
  stepsRef,
  styles,
  // file,
  handleLogoUpload,
  // previewImage,
  currentStep,
  currentSlide,
  numSteps,
  step
}: {
  stepsRef: React.MutableRefObject<any>;
  styles: any;
  handleLogoUpload: (e: any) => void;
  currentStep: number;
  currentSlide: number;
  numSteps: number;
  step: StepType;
}) => {
  const fileTypes = ["JPG", "PNG", "WEBP", "GIF"];
  const modalHelper = {
    title: "Importance of Correct Image Aspect Ratio",
    body: "Ensuring images, especially logos, have the correct aspect ratio is crucial to prevent distortion when displayed. A distorted logo can undermine a brand’s professionalism and mislead potential clients. Maintaining the correct aspect ratio preserves the image's integrity across various platforms, supporting brand consistency and visual quality."
  };
  const containerElement = useRef(null);
  const [widthRatioImage, setWidthRatioImage] = useState<number | null>(null);
  const [heightRatioImage, setHeightRatioImage] = useState<number | null>(null);
  useEffect(() => {
    const stepWidth = 250;
    let tempId = step.adParameter.slice("imageURL-".length);
    if (step.adParameter.includes("0-")) {
      tempId = step.adParameter.slice(2);
    }
    console.log("tempId", tempId);
    const ratios = tempId.split(":");
    let width = Number(ratios[0]);
    let height = Number(ratios[1]);

    if (ratios.length !== 2) {
      width = 1;
      height = 1;
    }

    if (width / height > 1) {
      setWidthRatioImage(stepWidth);
      setHeightRatioImage(stepWidth * (height / width));
    } else {
      setHeightRatioImage(stepWidth);
      setWidthRatioImage(stepWidth * (width / height));
    }

    console.log("COUOUC");
  }, [step]);

  return (
    <div
      ref={(el) => {
        stepsRef.current[currentStep] = el;
      }}
      className={styles.form__step}
    >
      <div className="pl-2 pr-6" ref={containerElement}>
        <h3 className="mb-12 text-jacarta-200">
          Step {currentSlide + 1}/{numSteps} : Ad Image {step.adParameter}
        </h3>
        {/* <!-- File Upload --> */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <label className="block font-display text-jacarta-900 dark:text-white">
              Image {step.adParameter}
              <span className="text-red">*</span>
            </label>
            <ModalHelper title={modalHelper.title} body={modalHelper.body} dark={false} />
          </div>
          <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
            Please upload a media format that visually represents the content to be displayed on the
            platform. This element will serve as a visual cue for users to quickly identify the
            associated content. Make sure the content is clear, relevant, and has a high enough
            resolution for good quality display. The visual will be approved by the Media before it
            is displayed on their platform.
          </p>

          {step.file ? (
            <p className="mb-3 text-green text-2xs">successfully uploaded : {step.file.name}</p>
          ) : (
            <p className="mb-3 dark:text-jacarta-100 text-2xs">
              Drag or choose your file to upload
            </p>
          )}

          <div
            className={`bg-jacarta-800 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-primaryPurple w-[${widthRatioImage}px] h-[${heightRatioImage}px] text-center ${
              !step.previewImage ? "px-2 py-8" : "py-1 px-1"
            }`}
            style={{ width: `${widthRatioImage}px`, height: `${heightRatioImage}px` }}
          >
            <div
              className={`relative z-10 cursor-pointer  ${!step.previewImage ? "px-2 py-2" : "px-0 h-full w-full"}`}
            >
              {!step.previewImage ? (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="inline-block mb-2 fill-jacarta-500 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="max-w-xs mx-auto text-xs dark:text-jacarta-100">
                    JPG, PNG, WEBP, GIF Max size: 25 MB
                  </p>
                </div>
              ) : (
                <div
                  className={`flex justify-center w-[${widthRatioImage}px] h-[${heightRatioImage}px] `}
                  style={{ width: `${widthRatioImage}px`, height: `${heightRatioImage}px` }}
                >
                  <Image
                    src={step.previewImage ?? ""}
                    fill={true}
                    alt="Preview"
                    className="object-contain h-full"
                  />
                </div>
              )}
            </div>
            <div className="absolute w-full h-full rounded opacity-0 cursor-pointer dark:bg-jacarta-800 bg-jacarta-50 group-hover:opacity-100">
              <FileUploader
                handleChange={handleLogoUpload}
                name="file"
                types={fileTypes}
                classes="file-drag"
                maxSize={25}
                minSize={0}
              />
            </div>
          </div>
          {step.file && (
            <p className="mt-3 text-warning text-2xs">
              ⚠️ This is how your ad will be displayed on the media plateform. Be carefull to fill
              all the dotted square.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdImage;
