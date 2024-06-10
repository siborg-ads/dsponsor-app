import {useContract, useContractWrite} from "@thirdweb-dev/react";
import config from "../utils/config";

async function UseWrapEth(amount, chainId) {
    const { contract: wrapContract } = useContract(config[chainId]?.smartContracts.WNATIVE.address);
    const { mutateAsync: deposit } = useContractWrite(wrapContract, "deposit")
    const wrapped = await deposit({ overrides: {
            value: amount
        }});
    return wrapped;
};

export default UseWrapEth;
