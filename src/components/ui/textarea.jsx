import React from "react";
import clsx from "clsx";

const TextArea = ({ className, id, placeholder, required, disabled, value, onChange, maxLength, rows }) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white",
        className
      )}
      required={required}
      disabled={disabled}
      maxLength={maxLength}
      rows={rows}
    />
  );
};

export default TextArea;
