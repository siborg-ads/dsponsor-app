import React, { useEffect } from "react";
import { Divider } from "@nextui-org/react";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import config from "../../config/config";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import { toast } from "react-toastify";
import { activated_features } from "../../data/activated_features";

const UpdateOffer = ({ offer }) => {
  const [offerId, setOfferId] = useState(null);
  const [metadataURL, setMetadataURL] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [initialAdmins, setInitialAdmins] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [validators, setValidators] = useState([]);
  const [initialValidators, setInitialValidators] = useState([]);
  const [imageRatio, setImageRatio] = useState(null);
  const [initialImageRatio, setInitialImageRatio] = useState(null);
  const [name, setName] = useState("");
  const [disabledLocked, setDisabledLocked] = useState(false);

  const { currentChainObject } = useChainContext();
  const chainId = currentChainObject?.chainId;

  const { contract } = useContract(config[chainId]?.smartContracts?.DSPONSORADMIN?.address);
  const { mutateAsync } = useContractWrite(contract, "updateOffer");

  useEffect(() => {
    if (offer) {
      setName(offer?.name);
      setOfferId(offer?.id);
      setMetadataURL(offer?.metadataURL);
      setAdmins(offer?.admins);
      setInitialAdmins(offer?.admins);
      setDisabled(offer?.disable);
      setValidators(offer?.validators);
      setInitialValidators(offer?.validators);

      const param = offer?.adParameters?.find((param) => param?.adParameter?.base === "imageURL");

      // if variants are not present, set image ratio to null
      // if variants length is 0, set image ratio to null
      // if variants length is 1, set image ratio to the first element
      // if variants length is greater than 1, set image ratio to the first element + ":" + the second element

      let imageRatio;
      if (!param?.adParameter?.variants || param?.adParameter?.variants.length === 0) {
        imageRatio = null;
      }

      if (param?.adParameter?.variants.length === 1) {
        imageRatio = param?.adParameter?.variants[0];
      }

      if (param?.adParameter?.variants.length > 1) {
        imageRatio = param?.adParameter?.variants[0] + ":" + param?.adParameter?.variants[1];
      }

      setInitialImageRatio(imageRatio);
      setImageRatio(imageRatio);
    }
  }, [offer]);

  const handleAddAdmin = () => {
    if (!admins) {
      setAdmins([""]);
      return;
    }
    if (admins.length === 0) {
      setAdmins([""]);
      return;
    }

    setAdmins([...admins, ""]);
  };

  const handleRemoveAdmin = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  const handleAdminChange = (index, value) => {
    if (!admins) setAdmins([""]);

    const newAdmins = admins?.map((admin) => admin);

    newAdmins[index] = value;

    setAdmins(newAdmins);
  };

  const handleAddValidator = () => {
    if (!validators) {
      setValidators([""]);
      return;
    }
    if (validators.length === 0) {
      setValidators([""]);
      return;
    }

    setValidators([...validators, ""]);
  };

  const handleRemoveValidator = (index) => {
    setValidators(validators.filter((_, i) => i !== index));
  };

  const handleValidatorChange = (index, value) => {
    if (!validators) setValidators([""]);

    const newValidators = validators?.map((validator) => validator);

    newValidators[index] = value;

    setValidators(newValidators);
  };

  const handleImageRatioChange = (value) => {
    if (value === "") {
      setImageRatio("");
      return;
    }

    console.log(value);

    if (value.includes("/")) {
      const [width, height] = value.split("/");

      if (width === "" || height === "") {
        setImageRatio("");
        return;
      }

      if (isNaN(width) || isNaN(height)) {
        setImageRatio("");
        return;
      }

      setImageRatio(width + ":" + height);
    } else {
      setImageRatio(value);
    }
  };

  const handleUpdateOffer = async () => {
    // remove empty strings from admins and validators
    const updatedAdmins = admins?.filter((admin) => !!admin) ?? [];
    const updatedValidators = validators?.filter((validator) => !!validator) ?? [];

    // admins for add options are admins not included in initial admins
    const updatedAdminsForAddOptions =
      updatedAdmins?.filter((admin) => !initialAdmins?.includes(admin)) ?? [];

    // admins for remove options are initial admins not included in updated admins
    const updatedAdminsForRemoveOptions =
      initialAdmins?.filter((admin) => !updatedAdmins?.includes(admin)) ?? [];

    // validators for add options are validators not included in initial validators
    const updatedValidatorsForAddOptions =
      updatedValidators?.filter((validator) => !initialValidators?.includes(validator)) ?? [];

    // validators for remove options are initial validators not included in updated validators
    const updatedValidatorsForRemoveOptions =
      initialValidators?.filter((validator) => !updatedValidators?.includes(validator)) ?? [];

    // init ad parameters for add options and remove options
    let updatedAdParametersForAddOptions = [];
    let updatedAdParametersForRemoveOptions = [];

    // ad parameters as initial are in the format of [{adParameter: {id: string, base: string, variants: [""]}}]
    // we want to send to the blockchain an array of ad parameters that are string in the format base-variant1:variant2 (for image ratio for example)
    // so we need to check if the new image ratio is different from the initial image ratio
    const isRatioDifferent = initialImageRatio !== imageRatio;

    // if the ratio is different, we need to add it to the ad parameters for add options
    if (isRatioDifferent) {
      updatedAdParametersForAddOptions.push("imageURL-" + imageRatio);
    }

    // if the ratio is different, we need to remove it from the ad parameters for remove options
    if (isRatioDifferent) {
      updatedAdParametersForRemoveOptions.push("imageURL-" + initialImageRatio);
    }

    setDisabledLocked(disabled);

    const updatedOfferParams = {
      offerId: parseFloat(offerId),
      disable: disabled,
      name,
      offerMetadata: metadataURL,
      addOptions: {
        admins: updatedAdminsForAddOptions,
        validators: updatedValidatorsForAddOptions,
        adParameters: updatedAdParametersForAddOptions
      },
      removeOptions: {
        admins: updatedAdminsForRemoveOptions,
        validators: updatedValidatorsForRemoveOptions,
        adParameters: updatedAdParametersForRemoveOptions
      }
    };

    console.log(updatedOfferParams);

    try {
      await mutateAsync({
        args: [
          updatedOfferParams?.offerId,
          updatedOfferParams?.disable,
          updatedOfferParams?.name,
          updatedOfferParams?.offerMetadata,
          updatedOfferParams?.addOptions,
          updatedOfferParams?.removeOptions
        ]
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Offer name</label>
        <input
          type="text"
          className="bg-secondaryBlack rounded-lg w-full p-2 text-white"
          value={name}
          placeholder={name ?? ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Metadata URL</label>
        <input
          type="text"
          className="bg-secondaryBlack rounded-lg w-full p-2 text-white"
          value={metadataURL}
          placeholder={metadataURL ?? ""}
          onChange={(e) => setMetadataURL(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Admins</label>

        {admins &&
          admins.map((admin, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="bg-secondaryBlack rounded-lg p-2 text-white w-1/2"
                value={admin}
                placeholder={admin}
                onChange={(e) => handleAdminChange(index, e.target.value)}
              />
              <button
                type="button"
                className="bg-red text-white rounded-lg px-4 py-2"
                onClick={() => handleRemoveAdmin(index)}
              >
                Remove
              </button>
            </div>
          ))}
        <button
          type="button"
          className="bg-green text-white rounded-lg px-4 py-2"
          onClick={handleAddAdmin}
        >
          Add Admin
        </button>
      </div>

      {activated_features.canChangeValidators && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Validators</label>

          {validators &&
            validators.map((validator, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="bg-secondaryBlack rounded-lg p-2 text-white w-1/2"
                  value={validator}
                  placeholder={validator}
                  onChange={(e) => handleValidatorChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red text-white rounded-lg px-4 py-2"
                  onClick={() => handleRemoveValidator(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            type="button"
            className="bg-green text-white rounded-lg px-4 py-2"
            onClick={handleAddValidator}
          >
            Add Validator
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-4">Ad Parameters</label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 mb-4">
            <label className="block text-gray-700 text-xs">Image aspect ratio (width:height)</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="bg-secondaryBlack rounded-lg p-2 text-white"
                value={imageRatio}
                placeholder={imageRatio}
                onChange={(e) => handleImageRatioChange(e.target.value)}
              />
            </div>
            <span className="text-jacarta-300 text-xs">
              Leave empty or put 0 if you don&apos;t want to specify an aspect ratio.
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Switch.Root
          checked={disabled}
          onCheckedChange={setDisabled}
          id="disable"
          className="w-[42px] h-[25px] rounded-full relative data-[state=checked]:bg-primaryPurple border border-white border-opacity-10 outline-none cursor-default"
        >
          <Switch.Thumb className="block w-[19px] h-[19px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </Switch.Root>
        <label className="block text-white text-sm font-semibold">Disable the offer</label>
      </div>

      <Web3Button
        action={() => {
          toast
            .promise(handleUpdateOffer, {
              pending: "Waiting for confirmation 🕒",
              success: disabledLocked
                ? "The offer has been disabled 🎉"
                : "The offer has been updated 🎉",
              error: "Transaction rejected 🤯"
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        contractAddress={config[chainId]?.smartContracts?.DSPONSORADMIN?.address}
        className="!mt-4 !bg-primaryPurple !w-fit !hover:bg-opacity-80 !px-4 !py-2 !text-white !font-semibold !rounded-full mb-4"
      >
        Update Offer
      </Web3Button>
    </div>
  );
};

export default UpdateOffer;
