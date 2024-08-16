import React from "react";

const argumentsData: { title: string; description: string }[] = [
  {
    title: "Boost Visibility",
    description: "Use tokens to increase your brand’s presence."
  },
  {
    title: "Ad Space as a New Opportunity",
    description: "Convert ad spaces into valuable assets."
  },
  {
    title: "Effortless Ad Submission",
    description: "Easily submit your ad to publishers."
  }
];

const Arguments = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-semibold text-white ">
        Make Your Marketing Budget Work Smarter
      </span>
      <div className="grid md:grid-cols-3 gap-4">
        {argumentsData.map((argument, index) => (
          <div
            key={argument.title}
            className="flex p-[1px] bg-secondaryBlack hover:-translate-y-1 duration-300 rounded-lg"
          >
            <div
              className="flex flex-col justify-between gap-4 p-6 bg-secondaryBlack rounded-lg relative w-full"
              key={index}
            >
              <div className="gap-4 flex flex-col justify-between h-full">
                <span className="text-white text-lg text-center font-semibold">
                  {argument.title}
                </span>

                <span className="text-jacarta-100 text-center text-sm">{argument.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arguments;
