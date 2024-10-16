import React, { forwardRef } from "react";
import clsx from "clsx";

interface InputProps {
  className?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  min?: number;
  step?: number;
  max?: number;
  inputMode?: any;
  pattern?: string;
  readOnly?: boolean;
  accept?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  name?: string;
  checked?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  enterKeyHint?: "search" | "enter" | "done" | "go" | "next" | "previous" | "send" | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      min,
      step,
      max,
      inputMode,
      pattern,
      readOnly,
      accept,
      onClick,
      name,
      checked,
      maxLength,
      onKeyDown,
      enterKeyHint
    }: InputProps,
    ref: any
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
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        className={clsx(
          "bg-jacarta-800 hover:bg-jacarta-800 border border-primaryPurple ring-0 focus:ring-0 focus:border-primaryPurple placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 text-white",
          className
        )}
        required={required}
        disabled={disabled}
        enterKeyHint={enterKeyHint}
        onWheel={(e) => {
          if (type === "number") {
            e.currentTarget.blur();
          }
        }}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
