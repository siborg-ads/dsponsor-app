import React from "react";
import clsx from "clsx";

const TextArea = ({
  className,
  id,
  placeholder,
  required,
  disabled,
  value,
  onChange,
  maxLength,
  rows
}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "bg-jacarta-800 hover:bg-jacarta-800 border-primaryPurple ring-0 focus:ring-0 focus:border-primaryPurple placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 text-white",
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
