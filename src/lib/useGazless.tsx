import config from "@/config/config";
import { client } from "@/data/services/client";
import { OpenZeppelinOptions } from "thirdweb/dist/types/transaction/actions/gasless/providers/openzeppelin";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
// import type { GaslessOptions } from "thirdweb";

export default function useGasless(chainId: number): OpenZeppelinOptions | undefined {
  const wallet = useActiveAccount();
  const { data } = useWalletBalance({
    client: client,
    address: wallet?.address,
    chain: config[chainId]?.chainObject
  });

  if (!wallet || !data) {
    return;
  }

  const OZrelayer = config[chainId]?.features?.openZeppelinDefender?.relayerURL;
  const balanceThreshold = BigInt(config?.[chainId]?.gaslessBalanceThreshold ?? "0");
  const gaslessBalanceCondition = balanceThreshold && data.value && data.value >= balanceThreshold;

  if (OZrelayer && gaslessBalanceCondition) {
    return {
      relayerUrl: OZrelayer,
      provider: "openzeppelin",
      relayerForwarderAddress: config[chainId]?.forwarder
    } as OpenZeppelinOptions;
  }

  return undefined;
}
