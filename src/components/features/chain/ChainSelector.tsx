import { useState } from "react";
import ModalHelper from "@/components/ui/modals/Helper";
import config from "@/config/config";
import { ChainObject } from "@/types/chain";

const ChainSelector = ({ setChainConfig }) => {
  const [chainName, setChainName] = useState<string>(Object.entries(config)[0][1].chainName);

  const onChange = (e) => {
    const selectedChainName = e?.target?.value;

    const chainConfig: ChainObject = Object.entries(config)?.find(
      (c) => c?.[1]?.chainName === selectedChainName
    )?.[1];

    if (!chainConfig) {
      return;
    }

    setChainName(selectedChainName);
    setChainConfig(chainConfig);
  };

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
