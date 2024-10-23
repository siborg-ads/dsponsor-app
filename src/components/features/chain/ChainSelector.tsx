import React, { useEffect, useState } from "react";
import ModalHelper from "@/components/ui/modals/Helper";
import config from "@/config/config";
import { ChainObject } from "@/types/chain";
import { useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";

const ChainSelector = () => {
  const switchChain = useSwitchActiveWalletChain();
  const chain = useActiveWalletChain();

  const onChange = (e) => {
    const selectedChainName = e?.target?.value;

    const chainConfig: ChainObject = Object.entries(config)?.find(
      (c) => c?.[1]?.chainObject.name === selectedChainName
    )?.[1];

    if (!chainConfig) {
      return;
    }

    switchChain(chainConfig.chainObject);
  };

  if (!chain) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full gap-4 text-jacarta-900 dark:text-white">
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="numberSelect">Select a chain network</label>
        <ModalHelper
          title="Chain selection"
          body="Specify the blockchain you want to interact with."
        />
      </div>
      <select
        id="chainSelect"
        value={chain?.name}
        onChange={onChange}
        className="py-3 rounded-lg bg-jacarta-800 border-jacarta-100 px-15"
      >
        {Object.entries(config).map(([, value], index) => (
          <option key={index + 1} value={value.chainObject.name}>
            {value.chainObject.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelector;
