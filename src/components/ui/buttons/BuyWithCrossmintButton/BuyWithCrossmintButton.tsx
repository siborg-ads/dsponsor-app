import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import React from "react";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { Address } from "thirdweb";

/**
 * Buy with Crossmint Button
 * @description Allow to use card to buy a token. Specific to Auction collection / configuration for buyout.
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
export default function BuyWithCrossmintButton(
  props: Readonly<{
    offer: { offerId: string };
    token: {
      tokenId: string;
      currency: string;
      buyoutPricePerToken: string;
      price: string;
      listingId: string;
      protocolFeeBPS: string;
      royaltiesBPS: string;
      fee: string;
    };
    user: { address: string; email: string };
    referrer: Address;
    actions: { processing: Function; success: Function; error: Function };
    isDisabled: boolean;
    isLoadingRender: () => React.JSX.Element;
    isActiveRender?: (() => React.JSX.Element) | string;
    isBid: boolean;
    price: BigNumber;
    config: {
      projectId: string;
      buyCollectionId: string;
      environment: string;
      currency: any;
      locale: any;
      paymentMethod: any;
    };
    successCallbackURL?: string;
    failureCallbackURL?: string;
    whPassThroughArgs?: string;
    isLoading?: boolean;
    currencyDecimals: number;
  }>
) {
  const { offer, token, user, referrer, whPassThroughArgs } = props;

  if (!token.fee) {
    console.warn("MintWithCrossmint: Token fee not found - Using default fee");
  }

  let reason: string = "";
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

  const royaltyBPS = BigNumber.from(token.royaltiesBPS || 0);
  const protocolBPS = BigNumber.from(token.protocolFeeBPS || 0);

  const royalty = props?.price.mul(royaltyBPS).div(10000);
  const protocolFee = props?.price.mul(protocolBPS).div(10000);
  const totalFees = royalty.add(protocolFee);

  const cumulativePrice = props?.price.add(totalFees);
  const totalPriceFormatted = formatUnits(cumulativePrice, "ether");

  const buttonProps = {
    projectId: props.config?.projectId,
    collectionId: props.config?.buyCollectionId,
    environment: props.config?.environment,
    currency: props.config?.currency,
    locale: props.config?.locale,
    paymentMethod: props.config?.paymentMethod,
    mintTo: user.address,
    mintConfig: {
      totalPrice: totalPriceFormatted,
      quantity: 1,
      buyParams: {
        listingId: token.listingId,
        buyFor: user.address,
        quantity: 1,
        currency: token.currency,
        referralAdditionalInformation: referrer ?? "0x5b15Cbb40Ef056F74130F0e6A1e6FD183b14Cdaf"
      }
    },
    successCallbackURL: props.successCallbackURL,
    failureCallbackURL: props.failureCallbackURL
  };

  if (props?.successCallbackURL) {
    const successCallbackURL = props.successCallbackURL.split("?")[0];
    buttonProps.successCallbackURL = successCallbackURL;
  }

  if (props?.failureCallbackURL) {
    const failureCallbackURL = props.failureCallbackURL.split("?")[0];
    buttonProps.failureCallbackURL = failureCallbackURL;
  }

  return (
    <CrossmintPayButton
      whPassThroughArgs={whPassThroughArgs}
      disabled={props?.isDisabled}
      className={(props?.isDisabled && "opacity-30 cursor-not-allowed") || ""}
      getButtonText={() => {
        if (props?.isBid) {
          return `Bid NOW with Credit Card`;
        } else {
          return `Buy NOW with Credit Card`;
        }
      }}
      {...buttonProps}
    />
  );
}
