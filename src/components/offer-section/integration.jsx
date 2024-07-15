import React from "react";
import { Divider } from "@nextui-org/react";
import "tippy.js/dist/tippy.css";
import * as Tabs from "@radix-ui/react-tabs";
import IframeIntegration from "./integrations/iframe";
import HtmlIntegration from "./integrations/html";

const Integration = ({ chainId, offerId }) => {
  return (
    <div className="container flex flex-col gap-4">
      <Divider className="my-4" />
      <h2 className="text-jacarta-900 font-bold font-display text-center text-3xl dark:text-white ">
        Integration
      </h2>

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
        </Tabs.List>

        <div className="flex w-full mt-4">
          <Tabs.Content value="iframe">
            <IframeIntegration chainId={chainId} offerId={offerId} />
          </Tabs.Content>
          <Tabs.Content value="html">
            <HtmlIntegration chainId={chainId} offerId={offerId} />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
};

export default Integration;
