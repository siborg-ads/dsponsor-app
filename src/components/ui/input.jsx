import React, { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
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
      readOnly,
      accept,
      onClick,
      name,
      checked
    },
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        checked={checked}
        id={id}
        placeholder={placeholder}
        accept={accept}
        ref={ref}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        onClick={onClick}
        step={step}
        inputMode={inputMode}
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
  }
);

Input.displayName = "Input";

export default Input;
