import React, { useState, useCallback } from "react";
import Image from "next/image";
import { Switch, cn } from "@nextui-org/react";
import { FileUploader } from "react-drag-drop-files";
import Input from "@/components/ui/Input";
import { useStorage } from "@thirdweb-dev/react";
import MainButton from "@/components/ui/buttons/MainButton";

const fileTypes = ["JPG", "PNG", "WEBP"];

const OfferImageAndURL = ({
  stepsRef,
  styles,
  setLink,
  link,
  file,
  handleLogoUpload,
  previewImage,
  terms,
  setTerms,
  numSteps,
  currentSlide
}: {
  stepsRef: React.MutableRefObject<any>;
  styles: any;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  file: any;
  // eslint-disable-next-line no-unused-vars
  handleLogoUpload: (e: any) => void;
  previewImage: string[];
  terms: string;
  setTerms: React.Dispatch<React.SetStateAction<string>>;
  numSteps: number;
  currentSlide: number;
}) => {
  const [isSelected, setIsSelected] = useState(true);

  const handleChange = useCallback(
    (e) => {
      setLink(e.target.value);
    },
    [setLink]
  );

  const handleTermsSwitch = useCallback((value) => {
    setIsSelected(value);
  }, []);

  if (currentSlide !== 2) return null;

  return (
    <div
      ref={(el) => {
        stepsRef.current[2] = el;
      }}
      className={styles.form__step}
    >
      <div className="pr-6 pl-2 relative flex flex-col items-center gap-8">
        <div className="absolute top-0 right-0">
          {currentSlide + 1}/{numSteps}
        </div>
        <StepHeader title="URL & Image" />
        <ExternalLinkInput value={link} onChange={handleChange} />
        <FileUploadSection
          file={file}
          previewImage={previewImage}
          handleLogoUpload={handleLogoUpload}
        />
        <TermsSection
          isSelected={isSelected}
          onSwitchChange={handleTermsSwitch}
          termsURL={terms}
          setTermsURL={setTerms}
        />
      </div>
    </div>
  );
};

const StepHeader = ({ title }) => (
  <div className="flex flex-col w-full items-center border-b-1 border-primaryPurple shadow-2xl pb-2">
    <h3 className="mb-2 text-jacarta-100 bg-primaryPurple rounded-md px-4 py-2">{title}</h3>
    <p className="text-center pt-2 dark:text-white">
      Provide the landing page URL, an image, and the terms that represent the offer.
    </p>
  </div>
);

const ExternalLinkInput = ({ value, onChange }) => (
  <div className="">
    <label
      htmlFor="item-external-link"
      className="font-display text-jacarta-900 mb-2 block dark:text-white"
    >
      Specify where advertisements will be exposed (website URL, mobile app, ...)
      <span className="text-red">*</span>
    </label>
    <Input
      type="url"
      id="item-external-link"
      placeholder="Provide an url, the name of your app, or what characterizes your platform."
      onChange={onChange}
      value={value}
    />
  </div>
);

const FileUploadSection = ({ file, previewImage, handleLogoUpload }) => (
  <div className="flex items-center justify-center flex-col">
    <label className="font-display text-jacarta-900 mb-2 block dark:text-white">
      Illustration
      <span className="text-red">*</span>
    </label>
    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
      Submit a square image to illustrate your offer
    </p>
    {file.length > 0 ? (
      <p className="text-2xs mb-3 text-green">Successfully uploaded: {file[0].name}</p>
    ) : (
      <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
        Drag or choose your file to upload
      </p>
    )}

    <div
      className={`bg-jacarta-800 dark:border-primaryPurple border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed text-center ${
        previewImage.length <= 0 ? "py-20" : "p-1"
      }`}
      style={{ width: `300px`, height: `300px` }}
    >
      {previewImage.length <= 0 ? (
        <EmptyFileUploader />
      ) : (
        <ImagePreview previewImage={previewImage} />
      )}
      <FileUploadOverlay handleChange={handleLogoUpload} fileTypes={fileTypes} />
    </div>
  </div>
);

const TermsPdfUploader = ({
  termsURL,
  setTermsURL
}: {
  termsURL: string;
  setTermsURL: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const storage = useStorage();

  const handleTermsUpload = async (e) => {
    if (!storage) {
      throw new Error("Storage is not initialized");
    }

    const file = e.target.files[0];
    const url = await storage.upload(file);
    const finalURL = await storage.resolveScheme(url);

    setTermsURL(finalURL);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <label className="font-display text-jacarta-900 mb-2 block dark:text-white">
        Terms of Use
        <span className="text-red">*</span>
      </label>
      <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
        Submit the terms of use for the ad space you are offering.
      </p>

      {termsURL ? (
        <p className="text-2xs mb-3 text-center text-green">Successfully uploaded: {termsURL}</p>
      ) : (
        <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
          Drag or choose your file to upload
        </p>
      )}

      {!termsURL ? (
        <Input
          className={`flex justify-center items-center mt-4 text-white`}
          type="file"
          onChange={handleTermsUpload}
          accept="application/pdf"
        />
      ) : (
        <div className="mt-4">
          <MainButton onClick={() => setTermsURL("")} text="Remove file" />
        </div>
      )}
    </div>
  );
};

const EmptyFileUploader = () => (
  <div className="relative flex justify-center items-center z-10 cursor-pointer p-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
    </svg>
    <p className="dark:text-jacarta-100 mx-auto max-w-xs text-xs">JPG, PNG, WEBP Max size: 25 MB</p>
  </div>
);

const ImagePreview = ({ previewImage }) => (
  <div className="flex justify-center" style={{ width: `300px`, height: `300px` }}>
    <Image src={previewImage[0]} fill={true} alt="Preview" className="object-contain h-full" />
  </div>
);

const FileUploadOverlay = ({ handleChange, fileTypes }) => (
  <div className="dark:bg-primaryPurple bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100">
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      classes="file-drag !max-w-full !min-w-[fit-content]"
      maxSize={25}
    />
  </div>
);

const TermsSection = ({
  isSelected,
  onSwitchChange,
  termsURL,
  setTermsURL
}: {
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSwitchChange: (value: boolean) => void;
  termsURL: string;
  setTermsURL: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="mb-6 flex items-center justify-center flex-col">
    <label className="font-display text-jacarta-900 mb-2 block dark:text-white">
      Legal <span className="text-sm text-jacarta-100">(optional)</span>
    </label>
    <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3">
      Provide the terms of use for the ad space you are offering. This helps to clearly define what
      is expected of the advertisements displayed in the sold spaces and the rules that must be
      adhered to. <br /> Import a PDF or a link.
    </p>
    <div className="flex mb-4">
      <span className="mr-3">URL</span>
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
      <span className="ml-1">File</span>
    </div>
    {!isSelected && <ExternalTermsInput termsURL={termsURL} setTermsURL={setTermsURL} />}
    {isSelected && <TermsPdfUploader termsURL={termsURL} setTermsURL={setTermsURL} />}
  </div>
);

const ExternalTermsInput = ({ termsURL, setTermsURL }) => (
  <div className="mb-6">
    <label
      htmlFor="terms-external-link"
      className="font-display text-jacarta-900 mb-2 block dark:text-white"
    >
      URL of your terms
    </label>

    <Input
      type="url"
      id="terms-external-link"
      placeholder="URL of your terms e.g., https://yoursite.com"
      onChange={(e) => setTermsURL(e.target.value)}
      value={termsURL}
    />
  </div>
);

export default OfferImageAndURL;
