import React from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { Spinner } from "@nextui-org/spinner";
import { Address } from "thirdweb";

/**
 * StyledWeb3Button component
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.isDisabled] - Flag to disable the button.
 * @param {string} props.defaultText - The default text to display on the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {Address} props.contractAddress - The contract address.
 * @param {any} [props.contractAbi] - The contract ABI.
 * @param {function} [props.onSuccess] - The function to call on successful action.
 * @param {function} [props.onError] - The function to call on error.
 * @param {function} [props.onSubmit] - The function to call on submit.
 * @param {boolean} [props.isGreen] - Flag to style the button green.
 * @param {boolean} [props.isRed] - Flag to style the button red.
 * @param {boolean} [props.isNormalButton] - Flag to render a normal button instead of Web3Button.
 *
 * @returns {JSX.Element} The StyledWeb3Button component.
 */
const StyledWeb3Button = ({
  ...props
}: {
  isDisabled?: boolean;
  defaultText: string;
  // eslint-disable-next-line no-unused-vars
  onClick: (contract?: any) => Promise<void> | void;
  contractAddress: Address;
  contractAbi?: any;
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (result: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: any) => void;
  onSubmit?: () => void;
  isGreen?: boolean;
  isRed?: boolean;
  isNormalButton?: boolean;
  isFullWidth?: boolean;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const baseClass = `!rounded-full !py-3 !px-8 !text-center !font-semibold !transition-all ${props.isFullWidth ? "!w-full" : ""}`;
  const loadingClass = "!bg-white !bg-opacity-30 !text-opacity-30 !text-white !cursor-not-allowed";
  const disabledClass = "!bg-white !bg-opacity-30 !text-opacity-30 !text-white !cursor-not-allowed";
  const defaultClass = `!bg-opacity-100 !text-white !cursor-pointer hover:!bg-opacity-80 ${
    props.isGreen ? "!bg-green" : ""
  } ${props.isRed ? "!bg-red" : ""} ${!props.isRed && !props.isGreen ? "!bg-primaryPurple" : ""}`;

  if (props.isNormalButton) {
    return (
      <button
        className={`${baseClass} ${props.isDisabled ? disabledClass : ""} ${!props.isDisabled ? defaultClass : ""}`}
        onClick={async () => {
          await props.onClick();
        }}
      >
        {props.defaultText}
      </button>
    );
  }

  return (
    <Web3Button
      {...props}
      className={`${baseClass} ${isLoading ? loadingClass : ""} ${props.isDisabled ? disabledClass : ""} ${!props.isDisabled && !isLoading ? defaultClass : ""}`}
      action={async (contract: any) => {
        try {
          setIsLoading(true);
          await props.onClick(contract);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? <Spinner size="sm" color="default" /> : props.defaultText}
    </Web3Button>
  );
};

export default StyledWeb3Button;
