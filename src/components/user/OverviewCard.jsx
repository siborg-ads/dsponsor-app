import { InformationCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

const OverviewCard = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-primaryPurple p-6 rounded-lg relative">
      <Popover placeholder="bottom" isOpen={isHovered}>
        <PopoverTrigger>
          <button
            className="absolute top-0 right-0 p-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <InformationCircleIcon className="h-4 w-4 text-white hover:text-jacarta-100 cursor-help" />
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="px-3 py-2 text-white text-xs md:text-sm">{card.informations}</div>
        </PopoverContent>
      </Popover>
      <div className="flex items-center text-center justify-center">
        <span className="text-white text-4xl md:text-8xl font-semibold">{card.value}</span>
      </div>
      <div className="flex items-center justify-center text-center mt-1">
        <span className="text-white text-xs md:text-sm">{card.label}</span>
      </div>
    </div>
  );
};

export default OverviewCard;
