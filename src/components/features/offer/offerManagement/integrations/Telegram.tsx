import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import Input from "@/components/ui/Input";
import config from "@/config/config";
import { Divider, Switch } from "@nextui-org/react";
import { Address, useContract, useContractWrite, useStorage } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Telegram = ({ chainId, offerData }: { chainId: number; offerData: any }) => {
  const [telegramChannels, setTelegramChannels] = React.useState<number[] | undefined>(undefined);
  const [valueTelegramChannels, setValueTelegramChannels] = React.useState<string | undefined>(
    undefined
  );
  const [isTelegramEnabled, setIsTelegramEnabled] = React.useState<boolean>(true);
  const [metadatas, setMetadatas] = React.useState<any | null>(null);

  const storage = useStorage();

  const { contract } = useContract(
    config[chainId as number]?.smartContracts?.DSPONSORADMIN?.address as Address
  );
  const { mutateAsync } = useContractWrite(contract, "updateOffer");

  useEffect(() => {
    const fetchMetadatas = async (metadataURL) => {
      if (!storage) return;

      if (metadataURL) {
        try {
          const initialMetadatas = await storage.downloadJSON(metadataURL);

          setMetadatas(initialMetadatas);
          setTelegramChannels(initialMetadatas?.offer?.telegramIntegration?.channels);
          setValueTelegramChannels(
            initialMetadatas?.offer?.telegramIntegration?.channels?.join(", ")
          );
          setIsTelegramEnabled(initialMetadatas?.offer?.telegramIntegration?.enabled);
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (offerData) {
      fetchMetadatas(offerData?.metadataURL);
    }
  }, [offerData, storage]);

  const handleTelegramChannelsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const channels = e.target.value?.split(/[\s,]+/).map((channel) => channel.trim());
    const filteredChannels = channels.filter((channel) => channel !== "");
    const uniqueChannels = [...new Set(filteredChannels)];
    const almostFinalChannels: (number | null)[] =
      uniqueChannels?.map((channel) => {
        const parsedChannel = parseInt(channel);
        return isNaN(parsedChannel) ? null : parsedChannel;
      }) ?? [];

    const finalChannels = almostFinalChannels?.filter((channel) => channel !== null) as number[];

    setTelegramChannels(finalChannels);
    setValueTelegramChannels(e.target.value);
  };

  const handleUpdateOffer = async (metadatas: any) => {
    if (!metadatas) return;

    const updatedMetadatas = {
      ...metadatas,
      telegramIntegration: {
        enabled: isTelegramEnabled,
        channels: telegramChannels
      }
    };

    try {
      // TODO: Fix this line with appropriate contract method
      await mutateAsync(updatedMetadatas);
    } catch (error) {
      console.error("Error updating offer:", error);
      throw new Error("Error updating offer");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="dark:text-jacarta-100 text-jacarta-100">
          To integrate your offer with Telegram, you need to add the{" "}
          <Link
            href="https://telegram.me/SiBorgAdsBot"
            target="_blank"
            className="text-primaryPurple hover:text-opacity-80"
          >
            SiBorg Ads Bot
          </Link>{" "}
          to your channel.
        </span>
      </div>

      <Divider className="my-4" />

      <span className="text-white text-lg font-semibold">Update your Telegram Channels</span>

      <span className="dark:text-jacarta-100 text-jacarta-100">
        You can add multiple channels to your offer. The bot will automatically post the ads to the
        channels every day.
      </span>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Input
            className="max-w-lg"
            type="text"
            id="item-telegram"
            value={valueTelegramChannels}
            onChange={handleTelegramChannelsChange}
            placeholder="Telegram Channels (e.g., -124234, 234234)"
          />

          <Switch
            checked={isTelegramEnabled}
            onChange={() => setIsTelegramEnabled(!isTelegramEnabled)}
          >
            Enable Telegram
          </Switch>
        </div>

        <StyledWeb3Button
          isFullWidth={false}
          defaultText="Update Telegram Channels"
          onClick={async () => {
            await toast.promise(handleUpdateOffer(metadatas), {
              pending: "Waiting for confirmation 🕒",
              success: `Telegram channels updated successfully 🎉`,
              error: "Transaction rejected 🤯"
            });
          }}
          contractAddress={config[chainId as number]?.smartContracts?.DSPONSORADMIN?.address}
        />
      </div>
    </div>
  );
};

export default Telegram;
