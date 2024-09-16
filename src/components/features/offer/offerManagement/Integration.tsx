import React from "react";
import "tippy.js/dist/tippy.css";
import * as Tabs from "@radix-ui/react-tabs";
import Iframe from "@/components/features/offer/offerManagement/integrations/Iframe";
import HTML from "@/components/features/offer/offerManagement/integrations/HTML";
import Telegram from "./integrations/Telegram";
import { features } from "@/data/features";

const Integration = ({
  chainId,
  offerId,
  offerTokens,
  offerData
}: {
  chainId: number;
  offerId: number;
  offerTokens: any;
  offerData: any;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-secondaryBlack p-4 rounded-md">
        <span className="dark:text-jacarta-100 text-jacarta-100">
          Here are instructions to give you examples of how you can integrate ads from your
          sponsors.
        </span>
      </div>

      <Tabs.Root defaultValue="iframe">
        <Tabs.List className="flex items-center gap-4">
          <Tabs.Trigger
            value="iframe"
            className="cursor-pointer data-[state=active]:bg-primaryPurple border border-primaryPurple rounded-md p-2"
          >
            Website (iFrame)
          </Tabs.Trigger>

          <Tabs.Trigger
            value="html"
            className="cursor-pointer data-[state=active]:bg-primaryPurple border border-primaryPurple rounded-md p-2"
          >
            Newsletter (HTML)
          </Tabs.Trigger>

          {features.telegramIntegrationEnabled && (
            <Tabs.Trigger
              value="telegram"
              className="cursor-pointer data-[state=active]:bg-primaryPurple border border-primaryPurple rounded-md p-2"
            >
              Telegram (Bot)
            </Tabs.Trigger>
          )}
        </Tabs.List>

        <div className="flex w-full mt-4">
          <Tabs.Content value="iframe" className="w-full">
            <Iframe chainId={chainId} offerId={offerId} />
          </Tabs.Content>

          <Tabs.Content value="html" className="w-full">
            <HTML chainId={chainId} offerId={offerId} offerTokens={offerTokens} />
          </Tabs.Content>

          <Tabs.Content value="telegram" className="w-full">
            <Telegram chainId={chainId} offerData={offerData} offerId={offerId} />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default Integration;
