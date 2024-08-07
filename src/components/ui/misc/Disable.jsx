import React from "react";

const Disable = ({ isOffer, offer, token, isDisabled }) => {
  if (!isOffer) {
    if (isDisabled) {
      return (
        <div className="p-4 bg-red rounded-lg my-4">
          <p className="text-center text-white font-semibold">
            {isOffer ? "This offer is disabled" : "This token is disabled"}
          </p>
        </div>
      );
    }
  } else if (isOffer) {
    return (
      <div className="p-4 bg-red rounded-lg my-4">
        <p className="text-center text-white font-semibold">
          {isOffer ? "This offer is disabled" : "This token is disabled"}
        </p>
      </div>
    );
  }
};

export default Disable;
