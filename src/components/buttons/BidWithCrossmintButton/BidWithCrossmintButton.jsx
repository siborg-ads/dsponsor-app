import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import React from "react";
import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

/**
 * Bid with Crossmint Button
 * @description Allow to use card to bid on a token. Specific to Auction collection for bid.
 * @description Mint params is used to allow integration with the card payment system.
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
export default function BidWithCrossmintButton(props = {}) {
  const { offer, token, user, referrer, actions } = props;

  const price = ethers.utils.parseUnits(props.token.buyoutPricePerToken, "wei");
  if (!token.fee) {
    console.warn("MintWithCrossmint: Token fee not found - Using default fee");
  }

  let reason = null;
  const expected = [
    "token.currency",
    "token.tokenId",
    "offer.offerId",
    "user.address",
    "token.buyoutPricePerToken"
  ];
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

  /*
  const royaltyBPS = BigNumber.from(token.royaltiesBPS || 0);
  const protocolBPS = BigNumber.from(token.protocolFeeBPS || 0);

  const royalty = price.mul(royaltyBPS).div(10000);
  const protocolFee = price.mul(protocolBPS).div(10000);
  const totalFees = royalty.add(protocolFee);

  const cumulativePrice = price.add(totalFees);
  */
  const totalPriceFormatted = formatUnits(price, "ether");

  const buttonProps = {
    projectId: props.config?.projectId,
    collectionId: props.config?.bidCollectionId,
    environment: props.config?.environment,
    currency: props.config?.currency,
    locale: props.config?.locale,
    paymentMethod: props.config?.paymentMethod,
    mintTo: user.address,
    mintConfig: {
      totalPrice: totalPriceFormatted,
      quantity: 1,
      _listingId: token.listingId,
      _pricePerToken: price.toString(),
      _bidder: user.address,
      _referralAdditionalInformation: referrer.address ?? "0x"
    }
  };

  if (user.email && user.email) {
    buttonProps.emailTo = user.email;
  }

  if (props?.successCallbackURL) {
    buttonProps.successCallbackURL = props.successCallbackURL;
  }

  if (props?.errorCallbackURL) {
    buttonProps.errorCallbackURL = props.errorCallbackURL;
  }

  return (
    <>
      <CrossmintPayButton
        disabled={props?.isDisabled === true}
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
