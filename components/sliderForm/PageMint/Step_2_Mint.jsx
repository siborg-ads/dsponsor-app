import { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";


import { FileUploader } from "react-drag-drop-files";

const Step_2_Mint = ({ stepsRef, styles, file, handleLogoUpload, previewImage }) => {
  const fileTypes = ["JPG", "PNG", "SVG", "WEBP"];
  return (
    <div ref={(el) => (stepsRef.current[1] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-14">Step 2 : Ad Space logo</h3>
        {/* <!-- File Upload --> */}
        <div className="mb-6 items-center flex flex-col">
          <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Image, Video, Audio, or 3D Model
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">
            Please upload a media format that visually represents the content to be displayed on the site. This element will serve as a visual cue for users to quickly identify the associated content. Make sure the
            content is clear, relevant, and has a high enough resolution for good quality display. The visual will be approved by the Media before it is displayed on their site.
          </p>

          {file ? <p className="text-green text-2xs mb-3">successfully uploaded : {file.name}</p> : <p className="dark:text-jacarta-300 text-2xs mb-3">Drag or choose your file to upload</p>}

          <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
            <div className="relative z-10 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
              </svg>
              <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">JPG, PNG, GIF, WEBP. Max size: 25 MB</p>
            </div>
            <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
              <FileUploader handleChange={handleLogoUpload} name="file" types={fileTypes} classes="file-drag" maxSize={25} minSize={0} />
            </div>
          </div>
          {previewImage && (
            <div className="flex justify-center mt-3">
              <Image src={previewImage ? previewImage : "/"} width={200} height={200} alt="Preview" className="object-contain h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step_2_Mint;
