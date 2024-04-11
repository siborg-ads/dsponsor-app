import { useState } from "react";
import DatePicker from "react-datepicker";

import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["JPG", "PNG", "SVG", "WEBP"];
const Step_2_Create = ({ stepsRef, styles, setLink, link, file, handleLogoUpload}) => {

  const handleChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("http://") && !value.startsWith("https://") && value.trim() !== "") {
      value = `https://${value}`;
    }
    setLink(value);
  };
  return (
    <div ref={(el) => (stepsRef.current[2] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-2">Step 3 : URL & Image</h3>
        <p className="text-center pt-2  mb-14 dark:text-white"> Add the landing page URL and an offer image.</p>

        {/* <!-- External Link --> */}
        <div className="mb-6">
          <label htmlFor="item-external-link" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Url where your ads will be displayed<span className="text-red">*</span>
          </label>
          <input
            type="url"
            id="item-external-link"
          
            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            placeholder="Provide an url for your offer. Eg.  https://yoursite.com"
            onChange={handleChange}
            value={link}
          />
        </div>
        {/* <!-- File Upload --> */}
        <div className="mb-6 flex items-center justify-center flex-col">
          <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Illustration
            <span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Import an image that will represent your offer</p>
          {file ? <p className=" text-2xs mb-3 text-green">successfully uploaded : {file.name}</p> : <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">Drag or choose your file to upload</p>}

          <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
            <div className="relative z-10 cursor-pointer px-16">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
              </svg>
              <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">JPG, PNG, SVG, WEBP Max size: 25 MB</p>
            </div>
            <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
              <FileUploader handleChange={handleLogoUpload} name="file" types={fileTypes} classes="file-drag" maxSize={25} minSize={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_2_Create;
