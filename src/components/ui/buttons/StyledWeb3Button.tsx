import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { Address } from "thirdweb";
import {
  useActiveAccount,
  useActiveWalletChain,
  useConnectModal,
  useSwitchActiveWalletChain
} from "thirdweb/react";
import { ChainsConfig } from "@/types/chain";
import { client } from "@/data/services/client";
import { useSwitchChainContext } from "@/providers/SwitchChain";

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
  onClick: () => Promise<void> | void;
  contractAddress: Address;
  contractAbi?: any;
  // eslint-disable-next-line no-unused-vars
  onSuccess?: (result: any) => void;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: any) => void;
  onSubmit?: () => void;
  isGreen?: boolean;
  isRed?: boolean;
  isFullWidth?: boolean;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const wallet = useActiveAccount();
  const address = wallet?.address;
  const { connect } = useConnectModal();
  const chain = useActiveWalletChain();
  const { selectedChain } = useSwitchChainContext();
  const switchActiveWalletChain = useSwitchActiveWalletChain();

  const baseClass = `!rounded-full !py-3 !px-8 !text-center !font-semibold !transition-all ${props.isFullWidth ? "!w-full" : "!w-fit"}`;
  const loadingClass = "!bg-white !bg-opacity-30 !text-opacity-30 !text-white !cursor-not-allowed";
  const disabledClass = "!bg-white !bg-opacity-30 !text-opacity-30 !text-white !cursor-not-allowed";
  const defaultClass = `!bg-opacity-100 !text-white !cursor-pointer hover:!bg-opacity-80 ${
    props.isGreen ? "!bg-green" : ""
  } ${props.isRed ? "!bg-red" : ""} ${!props.isRed && !props.isGreen ? "!bg-primaryPurple" : ""}`;

  console.log("selectedChain", selectedChain);
  console.log("chain", chain);

  return (
    <button
      {...props}
      className={`${baseClass} ${isLoading && address ? loadingClass : ""} ${props.isDisabled && address ? disabledClass : ""} ${(!props.isDisabled && !isLoading) || !address ? defaultClass : ""}`}
      onClick={async () => {
        if (!address) {
          await connect({
            client: client
          });
          return;
        }

        if (chain?.id !== selectedChain.chainId) {
          await switchActiveWalletChain(selectedChain.chainObject);
          return;
        }

        try {
          setIsLoading(true);
          await props.onClick();
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? (
        <Spinner size="sm" color="default" />
      ) : address ? (
        chain?.id === selectedChain.chainId ? (
          props.defaultText
        ) : (
          "Switch Chain"
        )
      ) : (
        "Connect Wallet"
      )}
    </button>
  );
};

export default StyledWeb3Button;
