import ModalHelper from "@/components/ui/modals/Helper";
import config from "@/config/config";
import { useSwitchChainContext } from "@/providers/SwitchChain";

const ChainSelector = () => {
  const { selectedChain, setSelectedChain } = useSwitchChainContext();

  const onChange = (e) => {
    const selectedChainName = e?.target?.value;

    const chainConfig = Object.entries(config)?.find(
      (c) => c?.[1]?.chainObject.name === selectedChainName
    )?.[1];

    if (!chainConfig) {
      return;
    }

    setSelectedChain(chainConfig);
  };

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
        value={selectedChain.chainObject.name}
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
