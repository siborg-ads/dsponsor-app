import React from "react";

const argumentsData: { title: string; description: string }[] = [
  {
    title: "3+ publishers",
    description: "Key partners in the crypto community. More to come !"
  },
  {
    title: "$10k+ in ad revenue",
    description: "Achieving consistent income since the beginning"
  },
  {
    title: "150+ transactions",
    description: "Streamlined ad submissions and marketplace listings"
  }
];

const EarlyTraction = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold text-white ">Early traction</span>

      <div className="rounded-xl w-full bg-secondaryBlack flex flex-col gap-8 p-8">
        <div className="grid md:grid-cols-3 gap-4">
          {argumentsData.map((argument, index) => (
            <div
              className="flex flex-col justify-between gap-4 p-6 bg-primaryBlack rounded-lg relative w-full"
              key={index}
            >
              <div className="gap-4 flex flex-col justify-between h-full">
                <span className="text-white text-lg text-center font-semibold">
                  {argument.title}
                </span>

                <span className="text-jacarta-100 text-center text-sm">{argument.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarlyTraction;
