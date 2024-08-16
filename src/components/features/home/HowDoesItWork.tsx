import React from "react";

const steps = [
  {
    title: "Acquire an Ad Space Token",
    description: (
      <span>
        Explore the available offers and decide whether to buy or bid based on the potential you
        see.
      </span>
    )
  },
  {
    title: "Submit Your Ad",
    description: (
      <span>
        As the token holder, you have the exclusive right to submit an ad for the designated space.
      </span>
    )
  },
  {
    title: "Wait for Ad Approval",
    description: (
      <span>
        Once your ad is approved, it will appear on the relevant platforms. For example, see the
        &apos;Bitcoin&apos; keyword search on the SiBorg app.
      </span>
    )
  },
  {
    title: "Keep or Sell Your Ad Space Token",
    description: (
      <span>
        You can update your ad at any time, or choose to sell your token whenever you wish.
      </span>
    )
  }
];

const HowDoesItWork = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold text-white ">How does it work?</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex p-[1px] bg-secondaryBlack hover:-translate-y-1 duration-300 rounded-lg">
              <div
                className="flex flex-col justify-between gap-4 p-6 bg-secondaryBlack rounded-lg relative"
                key={index}
              >
                <div className="gap-4 flex flex-col justify-between h-full">
                  <span className="text-white font-semibold">
                    {index + 1}. {step.title}
                  </span>

                  <span className="text-jacarta-100 text-sm">{step.description}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HowDoesItWork;
