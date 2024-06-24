import DropdownFilter from "./DropdownFilter";

const PriceFilter = () => {
  return (
    <>
      <DropdownFilter />
      {/* End dropdown */}

      <div className="flex space-x-4">
        <input
          className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:bg-secondaryBlack dark:text-white dark:placeholder:text-jacarta-100"
          type="text"
          placeholder="Min"
        />
        <input
          className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-jacarta-600 dark:bg-secondaryBlack dark:text-white dark:placeholder:text-jacarta-100"
          type="text"
          placeholder="Max"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-primaryPurple-lighter w-full py-3 px-8 text-center font-semibold text-white transition-all hover:bg-primaryPurple-dark"
      >
        Apply
      </button>
    </>
  );
};

export default PriceFilter;
