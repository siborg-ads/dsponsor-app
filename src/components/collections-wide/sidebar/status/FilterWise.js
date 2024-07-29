import React, { useState } from "react";
import Input from "../../../ui/input";

const FilterWise = () => {
  const filterOptions = [
    { id: "buyNow", label: "Buy Now" },
    { id: "onAuction", label: "On Auction" },
    { id: "new", label: "New" },
    { id: "hasOffers", label: "Has Offers" }
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterToggle = (filterId) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  return (
    <>
      {filterOptions.map((option) => (
        <li key={option.id}>
          <label className="flex items-center cursor-pointer w-full">
            <Input
              type="checkbox"
              id={option.id}
              className="h-5 w-5 mr-3 rounded border-jacarta-200 text-primaryPurple checked:bg-primaryPurple focus:ring-primaryPurple/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-800"
              checked={selectedFilters.includes(option.id)}
              onChange={() => handleFilterToggle(option.id)}
            />
            <span className="dark:text-white">{option.label}</span>
          </label>
        </li>
      ))}
    </>
  );
};

export default FilterWise;
