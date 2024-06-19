import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import React from "react";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

/**
 * Mint with Crossmint Button
 * @description Allow to use card to mint a new available a token. Specific to Mint collection / configuration.
 * @param props
 * @param {Object} props.offer
 * @param {String} props.offer.offerId - Offer ID
 * @param {Object} props.token
 * @param {String} props.token.tokenId - Token ID
 * @param {String} props.token.currency - Token currency
 * @param {String} props.token.buyoutPricePerToken - Token buyout price per token
 * @param {String} props.token.price - Token price
 * @param {String} props.token.listingId - Token listing ID
 * @param {String} props.token.protocolFeeBPS - Token protocol fee BPS
 * @param {String} props.token.royaltiesBPS - Token royalties BPS
 * @param {String} props.token.fee - Token fee
 * @param {Object} props.user
 * @param {String} props.user.address - User address
 * @param {String} props.user.email - User email
 * @param {Object} props.referrer
 * @param {String} props.referrer.address - Referrer address
 * @param {Function} props.actions
 * @param {Function} props.actions.processing - Processing action
 * @param {Function} props.actions.success - Success action
 * @param {Function} props.actions.error - Error action
 * @param {Boolean} props.isDisabled - Is disabled
 * @param {String} props.isLoadingRender - Loading render
 * @param {String} props.isActiveRender - Active render
 * @returns {Element} - CrossmintPayButton
 * @constructor
 */
export default function MintWithCrossmintButton(props = {}) {
  const { offer, token, user, referrer, actions } = props;

  const price = ethers.utils.parseUnits(props.token.price, "wei");

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

  const feesBPS = token.protocolFeeBPS ?? 400;
  const fee = price.mul(feesBPS).div(10000);
  const totalFee = fee;
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
        disabled={props?.isDisabled}
        className={(props?.isDisabled && "opacity-50 cursor-not-allowed") || ""}
        getButtonText={(connecting, paymentMethod) => {
          if (actions?.processing && connecting) {
            actions.processing();
          }
          return connecting
            ? props?.isLoadingRender ?? "Connecting..."
            : props?.isActiveRender ?? `Buy NOW with ${paymentMethod} for ${totalPriceFormatted}`;
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
      ></CrossmintPayButton>
    </>
  );
}
