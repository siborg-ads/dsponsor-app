import { useState } from "react";
import DatePicker from "react-datepicker";
import Image from "next/image";

import { FileUploader } from "react-drag-drop-files";

const Step_1_Mint = ({ stepsRef, styles, adParamaters }) => {
  return (
    <div ref={(el) => (stepsRef.current[0] = el)} className={styles.form__step}>
      <div className="pr-6 pl-2">
        <h3 className="mb-14">Step 1 : Offer Type & Price</h3>

        {/* <!-- Ad Space type --> */}
        <div className="mb-6 flex  flex-col justify-center items-center gap-4">
          <div className="flex flex-col items-center">
            <label htmlFor="item-description" className="font-display text-jacarta-700 mb-2 block dark:text-white">
              Type of ad spaces for this offer :
            </label>

            <div className="flex gap-4 justify-center items-center w-full text-jacarta-700 dark:text-white">
              <p>{adParamaters}</p>
            </div>
          </div>
          <div className="mt-4">
            <Image width={120} height={120} src={`/images/offer_exemple_0.png`} alt="headling" className={"mr-1 inline-block  bg-contain bg-center text-xl  "} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step_1_Mint;
