import React from "react";
import clsx from "clsx";

const Input = ({
  className,
  type,
  id,
  placeholder,
  required,
  disabled,
  value,
  onChange,
  onWheel,
  min,
  step,
  max,
  inputMode,
  pattern,
  ref,
  readOnly,
  accept,
  onClick,
  name,
  checked
}) => {
  return (
    <input
      type={type}
      name={name}
      checked={checked}
      id={id}
      placeholder={placeholder}
      accept={accept}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      onClick={onClick}
      step={step}
      inputMode={inputMode}
      ref={ref}
      pattern={pattern}
      readOnly={readOnly}
      className={clsx(
        "dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white",
        className
      )}
      required={required}
      disabled={disabled}
      onWheel={onWheel}
    />
  );
};

export default Input;
