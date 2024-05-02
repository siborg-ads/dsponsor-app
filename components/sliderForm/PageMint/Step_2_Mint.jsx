import { useState } from "react";
import DatePicker from "react-datepicker";
// import styles from "../../../styles/createPage/style.module.scss";

import { FileUploader } from "react-drag-drop-files";

const Step_2_Mint = ({ stepsRef, styles, setLink, link}) => {

  const handleChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("http://") && !value.startsWith("https://") && value.trim() !== "") {
      value = `https://${value}`;
    }
    setLink(value);
  };
  return (
    <div ref={(el) => (stepsRef.current[1] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-14">Step 3 : Ad space URL</h3>
        {/* <!-- Link --> */}
        <div className="mb-6">
          <label htmlFor="item-external-link" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            External link<span className="text-red">*</span>
          </label>
          <p className="dark:text-jacarta-300 text-jacarta-400 text-2xs mb-3">
            Enter the URL to which users will be redirected upon clicking the previously uploaded image. This link should lead to a page that expands on the content or service represented by the image. Make sure the URL
            is correct and leads to a safe, relevant webpage.
          </p>
          <input
            type="url"
            id="item-external-link"
            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            placeholder="https://yoursite.com"
            onChange={handleChange}
            value={link}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Step_2_Mint;
