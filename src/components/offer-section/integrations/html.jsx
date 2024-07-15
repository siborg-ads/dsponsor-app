import React from "react";
import Link from "next/link";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Divider } from "@nextui-org/react";
import InfoIcon from "../../informations/infoIcon";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import handleCopy from "../../../utils/handleCopy";
import Tippy from "@tippyjs/react";

const HtmlIntegration = () => {
  const [copied, setCopied] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <span className="dark:text-jacarta-100 text-jacarta-100">
            Copy and paste the provided HTML code to the desired location on your newsletter
            template. Compatible with platforms such as: Mailchimp, Brevo, etc...
          </span>

          <span className="dark:text-jacarta-100 text-jacarta-100">
            Read the full documentation by clicking{" "}
            <Link href="/" target="_blank" className="text-primaryPurple hover:text-opacity-80">
              here
            </Link>
            .
          </span>
        </div>

        <Divider className="my-4" />

        <div className="flex items-center">
          <span className="dark:text-jacarta-100 text-jacarta-100 mr-8">
            Select display type :{" "}
          </span>

          <RadioGroup.Root
            className="flex items-center gap-8"
            defaultValue="clickable-logo-grid"
            defaultChecked="clickable-logo-grid"
          >
            <div className="flex items-center gap-2">
              <RadioGroup.Item
                className="bg-white w-4 h-4 rounded-full hover:border-primaryPink outline-none cursor-default"
                value="clickable-logo-grid"
                id="r1"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primaryPurple" />
              </RadioGroup.Item>
              <label className="text-white leading-none pl-1" htmlFor="r1">
                Clickable Logo Grid
              </label>
              <InfoIcon text="This integration allows you to display a grid of clickable logos. (Example: sponsor logo grid at the bottom of the page). Each slot in the grid will display the sponsor's proposed logo redirecting to a URL. If you need to display a single static logo, you can also choose this integration.">
                <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
              </InfoIcon>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroup.Item
                className="bg-white w-4 h-4 rounded-full hover:border-primaryPink outline-none cursor-default"
                value="dynamic-banner"
                id="r2"
              >
                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primaryPurple" />
              </RadioGroup.Item>
              <label className="text-white leading-none pl-1" htmlFor="r2">
                Dynamic Banner
              </label>
              <InfoIcon text="This integration lets you display a randomly selected ad from those submitted by sponsors, with a new ad randomly selected at each request. The ad redirects to a URL.">
                <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
              </InfoIcon>
            </div>
          </RadioGroup.Root>
        </div>

        <span className="dark:text-jacarta-100 text-jacarta-100">
          Copy and paste the following code to the desired location on your page.
        </span>

        <div className="flex bg-primaryBlack border border-jacarta-500 p-4 rounded-md relative">
          <div className="absolute top-2 right-2">
            <button
              className="z-10"
              onClick={() => {
                handleCopy(``);

                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <Tippy content={`${copied ? "copied" : "copy"}`} placement="top" hideOnClick={false}>
                <ClipboardIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-pointer" />
              </Tippy>
            </button>
          </div>
          <code className="text-sm"></code>
        </div>

        <Divider className="my-4" />

        <span className="text-white text-lg font-semibold">Customize</span>

        <Divider className="my-4" />

        <span className="text-white text-lg font-semibold">Preview</span>
      </div>
    </>
  );
};

export default HtmlIntegration;
