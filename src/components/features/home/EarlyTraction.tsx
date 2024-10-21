import React from "react";

const argumentsData: { title: string; description: string }[] = [
  {
    title: "3+ ",
    description: "Publishers"
  },
  {
    title: "$10k+",
    description: "Sponshorship revenue"
  },
  {
    title: "150+",
    description: "Transactions"
  }
];

const EarlyTraction = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-8 p-8 rounded-xl bg-secondaryBlack">
        <div className="grid gap-4 md:grid-cols-3">
          {argumentsData.map((argument, index) => (
            <div
              className="relative flex flex-col justify-between w-full gap-4 p-3 rounded-lg"
              key={index}
            >
              <div className="flex flex-col justify-between h-full gap-4">
                <span className="text-5xl font-semibold text-center text-primaryPurple">
                  {argument.title}
                </span>

                <span className="text-sm text-center text-jacarta-100">{argument.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarlyTraction;
