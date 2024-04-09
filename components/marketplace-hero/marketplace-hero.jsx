import React from "react";

import Image from "next/image";
import XWhiteIcon from "../../public/images/social-media-icons/x-social-media-white-icon.png";
import WebWhiteIcon from "../../public/images/social-media-icons/web-icon-white.webp";
import DiscordWhiteIcon from "../../public/images/social-media-icons/discord-white-icon.webp";

const MarketplaceHeroSection = () => {
  const herosection_social_links = [
    {
      name: "Twitter",
      label: "twitter.com/siborgapp",
      url: "https://twitter.com/siborgapp",
      imagePath: XWhiteIcon,
    },
    {
      name: "Website",
      label: "siborg.io",
      url: "https://siborg.io",
      imagePath: WebWhiteIcon,
    },
    {
      name: "Discord",
      label: "discord.gg/siborgapp",
      url: "https://discord.gg/siborgapp",
      imagePath: DiscordWhiteIcon,
    },
  ];

  const socialLink_label_style = {
    background:
      "linear-gradient(114deg, #7D56C9 34.58%, #9D66C9 53.57%, #CE7FCA 75.1%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div className="container">
      <h1
        className="text-4xl text-jacarta-700 font-medium font-display my-6 text-center dark:text-white"
        style={{
          lineHeight: "1.6",
        }}
      >
        Welcome to SiBorg Marketplace, you can buy tokenized advertising spaces
        corresponding to in app search ticker
      </h1>
      <div className="flex justify-center items-center gap-10 pt-6">
        {herosection_social_links.map((link, key) => (
          <div key={key} className="flex gap-4 items-center">
            <div
              className="p-1.5 rounded"
              style={{
                background:
                  "linear-gradient(114deg, #7D56C9 34.58%, #9D66C9 53.57%, #CE7FCA 75.1%)",
              }}
            >
              <Image
                src={link.imagePath}
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </div>
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={socialLink_label_style}
              className="text-jacarta-700 dark:text-white text-lg font-medium font-display"
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceHeroSection;
