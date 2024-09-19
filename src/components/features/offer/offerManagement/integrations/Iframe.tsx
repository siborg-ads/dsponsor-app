import React, { useEffect, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Divider } from "@nextui-org/react";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import { InformationCircleIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import handleCopy from "@/utils/misc/handleCopy";
import Tippy from "@tippyjs/react";
import { ChromePicker } from "react-color";
import Input from "@/components/ui/Input";
import config from "@/config/config";

const Iframe = ({ chainId, offerId }) => {
  const relayerURL = config[chainId]?.relayerURL;

  const [copied, setCopied] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [customHeight, setCustomHeight] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).customHeight
      : false
  );
  const [height, setHeight] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).height
      : "400px"
  );
  const [bgColor, setBgColor] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).bgColor
      : false
  );
  const [color, setColor] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).color
      : "#0d102d"
  );
  const [changeRatio, setChangeRatio] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).changeRatio
      : false
  );

  const [includeAvailable, setIncludeAvailable] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).includeAvailable
      : true
  );

  const [includeReserved, setIncludeReserved] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).includeReserved
      : true
  );

  const [ratio, setRatio] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).ratio
      : "1:1"
  );
  const [customAdPreview, setCustomAdPreview] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).customAdPreview
      : false
  );
  const [tokenId, setTokenId] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).tokenId
      : ""
  );
  const [tokenIds, setTokenIds] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).tokenIds
      : []
  );
  const [previewImage, setPreviewImage] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).previewImage
      : ""
  );
  const [previewLink, setPreviewLink] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).previewLink
      : ""
  );
  const [displayType, setDisplayType] = useState(
    localStorage.getItem("iframeSettings")
      ? JSON.parse(localStorage.getItem("iframeSettings") as string).displayType
      : "ClickableLogosGrid"
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (bgColor) {
      params.append("bgColor", color);
    }
    if (changeRatio) params.append("ratio", ratio);
    if (!includeAvailable) params.append("includeAvailable", includeAvailable);
    if (!includeReserved) params.append("includeReserved", includeReserved);

    if (customAdPreview) {
      if (displayType === "ClickableLogosGrid") params.append("previewTokenId", tokenId);
      if (displayType === "DynamicBanner") params.append("tokenIds", tokenIds.join(","));
      if (previewImage) params.append("previewImage", previewImage);
      if (previewLink) params.append("previewLink", previewLink);
    }
    setIframeSrc(
      `${relayerURL}/${chainId}/integrations/${offerId}/${displayType}/iFrame${params.toString() ? "?" + params.toString() : ""}`
    );
  }, [
    chainId,
    relayerURL,
    offerId,
    bgColor,
    color,
    changeRatio,
    ratio,
    customAdPreview,
    tokenId,
    tokenIds,
    previewImage,
    previewLink,
    displayType,
    includeAvailable,
    includeReserved
  ]);

  useEffect(() => {
    const savedSettings = localStorage.getItem("iframeSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCustomHeight(settings.customHeight);
      setHeight(settings.height);
      setBgColor(settings.bgColor);
      setColor(settings.color);
      setChangeRatio(settings.changeRatio);
      setRatio(settings.ratio);
      setCustomAdPreview(settings.customAdPreview);
      setTokenId(settings.tokenId);
      setTokenIds(settings.tokenIds);
      setPreviewImage(settings.previewImage);
      setPreviewLink(settings.previewLink);
      setDisplayType(settings.displayType);
      setIncludeAvailable(settings.includeAvailable);
      setIncludeReserved(settings.includeReserved);
    }
  }, []);

  useEffect(() => {
    const settings = {
      customHeight,
      height,
      bgColor,
      color,
      changeRatio,
      ratio,
      customAdPreview,
      tokenId,
      tokenIds,
      previewImage,
      previewLink,
      displayType,
      includeAvailable,
      includeReserved
    };
    localStorage.setItem("iframeSettings", JSON.stringify(settings));
  }, [
    customHeight,
    height,
    bgColor,
    color,
    changeRatio,
    ratio,
    customAdPreview,
    tokenId,
    tokenIds,
    previewImage,
    previewLink,
    displayType,
    includeAvailable,
    includeReserved
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="dark:text-jacarta-100 text-jacarta-100">
          Use iframes for simple integration on your website. Copy and paste the code to the desired
          location on your page. Compatible with platforms such as: WordPress, Webflow, Wix,
          GoDaddy, Squarespace, etc...{" "}
        </span>

        {/* Add the following code snippet 
        <span className="dark:text-jacarta-100 text-jacarta-100">
          Read the full documentation by clicking{" "}
          <Link href="/" target="_blank" className="text-primaryPurple hover:text-opacity-80">
            here
          </Link>
          .
        </span>
        */}
      </div>

      <Divider className="my-4" />

      <div className="flex flex-col items-start md:items-center md:flex-row">
        <span className="mb-4 dark:text-jacarta-100 text-jacarta-100 md:mr-8">
          Select display type :{" "}
        </span>

        <RadioGroup.Root
          className="flex flex-col items-start gap-4 md:items-center md:gap-8 md:flex-row"
          onValueChange={(value) => setDisplayType(value)}
          value={displayType}
        >
          <div className="flex items-center gap-2">
            <RadioGroup.Item
              className="w-4 h-4 bg-white rounded-full outline-none cursor-default hover:border-primaryPink"
              value="ClickableLogosGrid"
              id="r1"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primaryPurple" />
            </RadioGroup.Item>
            <label className="pl-1 leading-none text-white" htmlFor="r1">
              Clickable Logo Grid
            </label>
            <ResponsiveTooltip text="This ad integration lets you display a grid of clickable logos, like a sponsor section at the bottom of a webpage. Each slot in the grid will show a sponsor's logo, and clicking it will redirect to their URL. You can use this integration to display logos, with or without a link.">
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroup.Item
              className="w-4 h-4 bg-white rounded-full outline-none cursor-default hover:border-primaryPink"
              value="DynamicBanner"
              id="r2"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primaryPurple" />
            </RadioGroup.Item>
            <label className="pl-1 leading-none text-white" htmlFor="r2">
              Dynamic Banner
            </label>
            <ResponsiveTooltip text="This ad integration displays a randomly selected ad from the submitted sponsor ads, choosing a new one with each request.">
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </div>
        </RadioGroup.Root>
      </div>

      <span className="dark:text-jacarta-100 text-jacarta-100">
        Copy and paste the following code to the desired location on your page.
      </span>

      <div className="relative w-full p-3 text-white border rounded-lg bg-jacarta-800 hover:bg-jacarta-800 border-primaryPurple ring-0 focus:ring-0 focus:border-primaryPurple placeholder:text-jacarta-300">
        <div className="absolute top-2 right-2">
          <button
            className="z-10"
            onClick={() => {
              handleCopy(
                `<iframe allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation" src="${iframeSrc}" style="width: 100%; ${customHeight ? `height: ${height};` : "height: 100%;"} ${bgColor ? "" : "background-color: transparent;"} overflow: hidden; border: none; color-scheme: normal;"></iframe>`,
                setCopied
              );

              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <Tippy content={`${copied ? "copied" : "copy"}`} placement="top" hideOnClick={false}>
              <ClipboardIcon className="w-5 h-5 text-white cursor-pointer hover:text-jacarta-100" />
            </Tippy>
          </button>
        </div>

        <code className="flex flex-col items-start overflow-x-scroll text-sm hide-scrollbar">
          {`<iframe allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation" src="${iframeSrc}" style="width:100%; ${customHeight ? `height:${height};` : "height:100%;"} ${bgColor ? "" : "background-color: transparent;"} overflow:hidden; border: none; color-scheme: normal;"></iframe>`}
        </code>
      </div>

      <Divider className="my-4" />

      <span className="text-lg font-semibold text-white">Customize</span>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={customHeight}
              onChange={(e) => setCustomHeight(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Custom height</span>
            <ResponsiveTooltip text="Some integrations do not support automatic height adjustment. In such cases, we recommend setting a predefined height (which you can change at any time) to match the designated space on your page.">
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
          {customHeight && (
            <Input
              type="number"
              value={parseInt(height)}
              onChange={(e) => setHeight(`${e.target.value}px`)}
              placeholder="Height in px (ex: 400)"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={bgColor}
              onChange={(e) => setBgColor(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Background color</span>
            <ResponsiveTooltip text="By default, the background color of the space is #0d102d. You can select a different color to match your content.">
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
          {bgColor && (
            <ChromePicker
              color={color}
              onChangeComplete={(color) => setColor(color.hex.replace("#", ""))}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={changeRatio}
              onChange={(e) => setChangeRatio(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Change ratio</span>
            <ResponsiveTooltip text="The ratio defined in your offer will apply by default to each ad space. You can choose a different display ratio for the ad spaces if desired; this will not affect the original ad image ratio.">
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
          {changeRatio && (
            <Input
              type="text"
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              placeholder="Ratio (ex: 16:9)"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={includeAvailable}
              onChange={(e) => setIncludeAvailable(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Show Available tokens</span>
            <ResponsiveTooltip
              text={`Show "Own this ad space" if there is no validated ad but the token is available on the market`}
            >
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={includeReserved}
              onChange={(e) => setIncludeReserved(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Show Reserved tokens</span>
            <ResponsiveTooltip
              text={`Show "Reserved ad space" if there is no validated ad and the token is not available on the market`}
            >
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
        </div>

        {/* 
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={customAdPreview}
              onChange={(e) => setCustomAdPreview(e.target.checked)}
              className=" !text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
            />
            <span className="text-white">Custom ad preview</span>
            <ResponsiveTooltip
              text={
                displayType === "ClickableLogosGrid"
                  ? "You can choose to display a custom preview for any of the desired ad spaces. In this case, specify the token it should apply to, the URL of the preview image, and the link to the target page."
                  : "You can choose the token ids you want to display (by default all from the offer can be displayed). You can choose to display a custom image instead of the images from the tokens, in this case, specify the URL of the preview image, and the link to the target page."
              }
            >
              <InformationCircleIcon className="w-5 h-5 text-white hover:text-jacarta-100 cursor-help" />
            </ResponsiveTooltip>
          </label>
          {customAdPreview && (
            <div className="flex flex-col gap-4">
              {displayType === "ClickableLogosGrid" ? (
                <select
                  placeholder="Token Id"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  className="p-2 rounded-md bg-secondaryBlack text-jacarta-100"
                >
                  {offerTokens.map((token) => (
                    <option key={token?.tokenId} value={token?.tokenId}>
                      {token?.tokenId}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  {offerTokens?.map((token) => (
                    <label key={token?.tokenId} className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        checked={tokenIds.includes(token?.tokenId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTokenIds([...tokenIds, token?.tokenId]);
                          } else {
                            setTokenIds(tokenIds.filter((id) => id !== token?.tokenId));
                          }
                        }}
                        className="!text-primaryPurple border-jacarta-200 focus:ring-primaryPurple/20 dark:border-jacarta-500 h-5 !w-5 self-start rounded focus:ring-offset-0"
                      />
                      <span className="text-white">{token?.tokenId}</span>
                    </label>
                  ))}
                </div>
              )}
              <Input
                type="text"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                placeholder="Preview Image URL"
              />
              <Input
                type="text"
                value={previewLink}
                onChange={(e) => setPreviewLink(e.target.value)}
                placeholder="Preview Link URL"
              />
            </div>
          )}
        </div>*/}
      </div>

      <Divider className="my-4" />

      <span className="text-lg font-semibold text-white">Preview</span>

      <div
        className={`w-full bg-transparent dark:bg-transparent`}
        style={{ height: customHeight ? height : "500px" }}
      >
        <iframe
          title="offer"
          loading="lazy"
          src={iframeSrc}
          height={customHeight ? height : "100%"}
          width="100%"
          className={`w-full ${bgColor ? `bg-${color} dark:bg-${color}` : "bg-transparent dark:bg-transparent"}`}
          allowTransparency={true}
          style={{ colorScheme: "normal" }}
        />
      </div>
    </div>
  );
};

export default Iframe;
