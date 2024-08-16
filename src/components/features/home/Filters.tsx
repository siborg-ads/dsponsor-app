import React from "react";
import type { Filter } from "@/components/layout/Home";
import { features } from "@/data/features";

const Filters = ({
  filter,
  setFilter
}: {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  return (
    <div className="flex items-center flex-wrap gap-4">
      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "all" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeAll ? "cursor-not-allowed" : ""}`}
        onClick={() => setFilter("all")}
        disabled={!features.homepageFilters.canSeeAll}
      >
        {features.homepageFilters.canSeeAll ? "All" : "Coming soon..."}
      </button>

      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "medias" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeMedias ? "cursor-not-allowed" : ""}`}
        onClick={() => setFilter("medias")}
        disabled={!features.homepageFilters.canSeeMedias}
      >
        {features.homepageFilters.canSeeMedias ? "Medias" : "Coming soon..."}
      </button>

      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "dapps" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeDapps ? "cursor-not-allowed" : ""}`}
        onClick={() => setFilter("dapps")}
        disabled={!features.homepageFilters.canSeeDapps}
      >
        {features.homepageFilters.canSeeDapps ? "dApps" : "Coming soon..."}
      </button>

      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "websites" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeWebsites ? "cursor-not-allowed" : ""}`}
        onClick={() => setFilter("websites")}
        disabled={!features.homepageFilters.canSeeWebsites}
      >
        {features.homepageFilters.canSeeWebsites ? "Websites" : "Coming soon..."}
      </button>

      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "newsletters" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeNewsletters ? "cursor-not-allowed" : ""}`}
        onClick={() => setFilter("newsletters")}
        disabled={!features.homepageFilters.canSeeNewsletters}
      >
        {features.homepageFilters.canSeeNewsletters ? "Newsletters" : "Coming soon..."}
      </button>
    </div>
  );
};

export default Filters;
