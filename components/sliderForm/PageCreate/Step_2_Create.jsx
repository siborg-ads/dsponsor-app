import { useState } from "react";
import DatePicker from "react-datepicker";
// import styles from "../../../styles/createPage/style.module.scss";

import { FileUploader } from "react-drag-drop-files";

const Step_2_Create = ({ stepsRef, styles, setName, setDescription }) => {
  return (
    <div ref={(el) => (stepsRef.current[1] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-2">Step 2 : Name & Description</h3>
        <p className="text-center pt-2  mb-14 dark:text-white">Provide offer&apos;s name and a brief description.</p>
        {/* <!-- Name --> */}
        <div className="mb-6">
          <label htmlFor="item-name" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Title<span className="text-red">*</span>
          </label>
          <input
            type="text"
            id="item-name"
            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            placeholder="Provide a title for your offer."
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* <!-- Description --> */}
        <div className="mb-6">
          <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
            Description<span className="text-red">*</span>
          </label>
          <textarea
            id="item-description"
            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
            rows="4"
            maxLength="250"
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="This is a description of the offer. characters limit : 250"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Step_2_Create;
