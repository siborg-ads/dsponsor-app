import Input from "../../../ui/input";
import DropdownFilter from "./DropdownFilter";

const PriceFilter = () => {
  return (
    <>
      <DropdownFilter />
      {/* End dropdown */}

      <div className="flex space-x-4">
        <Input type="text" placeholder="Min" />
        <Input type="text" placeholder="Max" />
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
