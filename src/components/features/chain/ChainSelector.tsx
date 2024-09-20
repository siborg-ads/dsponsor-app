import React, { useState } from "react";
import ModalHelper from "@/components/ui/modals/Helper";
import config from "@/config/config";
import { ChainObject } from "@/types/chain";
import { useSwitchChain, useAddress } from "@thirdweb-dev/react";

const ChainSelector = ({ setChainConfig, chainConfig }) => {
  const getInitialChainName = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("chainName") ?? Object.entries(config)[0][1].chainName;
    }
    return Object.entries(config)[0][1].chainName;
  };

  const getInitialChainId = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return Number(localStorage.getItem("chainId")) ?? Object.entries(config)[0][1].chainId;
    }
    return Object.entries(config)[0][1].chainId;
  };

  const [chainName, setChainName] = useState<string>(getInitialChainName());
  const [chainId, setChainId] = useState<number>(getInitialChainId());

  const switchChain = useSwitchChain();
  const address = useAddress();

  const onChange = (e) => {
    const selectedChainName = e?.target?.value;

    const chainConfig: ChainObject = Object.entries(config)?.find(
      (c) => c?.[1]?.chainName === selectedChainName
    )?.[1];

    if (!chainConfig) {
      return;
    }

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("chainName", selectedChainName);
      localStorage.setItem("chainId", chainConfig.chainId.toString());
    }

    setChainName(selectedChainName);
    setChainConfig(chainConfig);
    setChainId(chainConfig.chainId);
  };

  React.useEffect(() => {
    if (chainConfig) {
      setChainConfig(chainConfig);
    } else {
      setChainConfig(Object.entries(config)[0][1]);
    }
  }, [chainConfig, chainName, setChainConfig]);

  React.useEffect(() => {
    const switchingChain = async (chainId: number) => {
      try {
        await switchChain(chainId);
      } catch (error) {
        console.error("Error switching chain", error);
      }
    };

    if (address && chainId) {
      switchingChain(Number(chainId));
    }
  }, [chainId, switchChain, address]);

  return (
    <div className="flex gap-4 justify-center items-center w-full text-jacarta-900 dark:text-white">
      <div className="flex gap-2 items-center justify-center">
        <label htmlFor="numberSelect">Select a chain network</label>
        <ModalHelper
          title="Chain selection"
          body="Specify the blockchain you want to interact with."
        />
      </div>
      <select
        id="chainSelect"
        value={chainName}
        onChange={onChange}
        className="bg-jacarta-800 border-jacarta-100 rounded-lg py-3 px-15"
      >
        {Object.entries(config).map(([, value], index) => (
          <option key={index + 1} value={value.chainName}>
            {value.chainName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelector;
