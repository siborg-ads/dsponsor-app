import React from "react";

const NormalButton = ({
  children,
  ...props
}: {
  isDisabled?: boolean;
  children?: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick: () => Promise<void> | void;
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (result: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: any) => void;
  onSubmit?: () => void;
  isGreen?: boolean;
  isRed?: boolean;
  isFullWidth?: boolean;
}) => {
  const baseClass = `!rounded-full !py-3 !px-8 !text-center !font-semibold !transition-all ${props.isFullWidth ? "!w-full" : ""}`;
  const disabledClass = "!bg-white !bg-opacity-30 !text-opacity-30 !text-white !cursor-not-allowed";
  const defaultClass = `!bg-opacity-100 !text-white !cursor-pointer hover:!bg-opacity-80 ${
    props.isGreen ? "!bg-green" : ""
  } ${props.isRed ? "!bg-red" : ""} ${!props.isRed && !props.isGreen ? "!bg-primaryPurple" : ""}`;

  return (
    <button
      {...props}
      className={`${baseClass} ${props.isDisabled ? disabledClass : ""} ${!props.isDisabled ? defaultClass : ""}`}
      onClick={() => {
        props.onClick();
      }}
    >
      {children}
    </button>
  );
};

export default NormalButton;
