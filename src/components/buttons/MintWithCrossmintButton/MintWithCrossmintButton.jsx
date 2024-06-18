import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import React from "react";
import { BigNumber, ethers } from "ethers";
import { parseUnits, formatUnits } from "ethers/lib/utils";

export default function MintWithCrossmintButton(props = {}) {
  const { offer, token, user, referrer, actions } = props;

  const price = ethers.utils.parseUnits(props.token.price, "wei");
  // console.log({ offer, token, user, referrer });
  if (!token.fee) {
    console.warn("MintWithCrossmint: Token fee not found - Using default fee");
  }

  let reason = null;
  const expected = ["token.currency", "token.tokenId", "offer.offerId", "user.address"];
  for (const fullKey of expected) {
    const [parent, key] = fullKey.split(".");

    const value = props?.[parent]?.[key];
    if (!value) {
      // Missing token.currency -> Missing token currency in case happen in face of users.
      reason = `Missing ${key.replace(".", " ")}`;
      break;
    }
  }
  if (reason) {
    // We do not throw, we display in place of the button
    return (
      <code>
        Pay with card not available: {reason} ${JSON.stringify({ offer, token, user, referrer })}
      </code>
    );
  }

  const feesBPS = token.fee ?? 400;
  const fee = price.mul(feesBPS).div(10000);
  const totalFee = fee;
  const cumulativePrice = price.add(totalFee);
  const totalPriceFormatted = formatUnits(price.add(totalFee), "ether");

  const config = {
    // No matter what, will be exposed to the client (SPA)
    // TODO: May be have we have a RSC Rendering via specific route ?
    crossmintProjectId: "82d192a5-c754-4280-a6cb-cb3d7b0f9bd9",
    crossmintCollectionId: "9d83e973-d852-4b9d-80a8-0da10c8ae451",
    crossmintEnvironment: "staging",
    currency: "EUR",
    locale: "en-EN",
    paymentMethod: "fiat"
  };
  const buttonProps = {
    projectId: config.crossmintProjectId,
    collectionId: config.crossmintCollectionId,
    environment: config.crossmintEnvironment,
    currency: config.currency,
    locale: config.locale,
    paymentMethod: config.paymentMethod,
    mintTo: user.address,
    mintConfig: {
      totalPrice: totalPriceFormatted,
      params: {
        tokenId: token.tokenId,
        to: user.address,
        currency: token.currency,
        tokenData: token.tokenData ?? "",
        offerId: offer.offerId,
        adParameters: [],
        adDatas: [],
        referralAdditionalInformation: referrer.address ?? "0x"
      }
    }
  };

  if (user.email && user.email) {
    buttonProps.emailTo = user.email;
  }

  if (config.successCallbackURL) {
    buttonProps.successCallbackURL = config.successCallbackURL;
  }

  if (config.errorCallbackURL) {
    buttonProps.errorCallbackURL = config.errorCallbackURL;
  }

  return (
    <>
      <CrossmintPayButton
        getButtonText={(connecting, paymentMethod) => {
          if (actions?.processing && connecting) {
            actions.processing();
          }
          return connecting
            ? "Processing..."
            : `Buy NOW with ${paymentMethod} for ${totalPriceFormatted}`;
        }}
        {...buttonProps}
        onEvent={(event) => {
          console.log("Event", event);
          switch (event.type) {
            case "payment:process.succeeded":
              actions?.success?.(event);
              break;
            case "payment:process.failed":
              actions?.error?.(event);
              break;
            default:
              console.log(event);
              break;
          }
        }}
      />
    </>
  );
}
