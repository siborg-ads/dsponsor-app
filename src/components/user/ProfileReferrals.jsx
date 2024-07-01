import React from "react";
import Referrals from "./referrals/Referrals";
import SiBorgApp from "./referrals/SiBorgApp";

const ProfileReferrals = ({ userData, userAddr, manageAddress }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Referrals userData={userData} userAddr={userAddr} />

        <SiBorgApp manageAddress={manageAddress} />
      </div>
    </>
  );
};

export default ProfileReferrals;
