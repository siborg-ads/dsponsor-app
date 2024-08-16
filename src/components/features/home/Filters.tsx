import React from "react";
import type { Filter } from "@/components/layout/Home";
import { features } from "@/data/features";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";

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
        All
      </button>

      {features.homepageFilters.canSeeMedias ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "medias" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeMedias ? "cursor-not-allowed" : ""}`}
          onClick={() => setFilter("medias")}
        >
          Medias
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "medias" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeMedias ? "cursor-not-allowed" : ""}`}
            onClick={() => setFilter("medias")}
            disabled
          >
            Medias
          </button>
        </ResponsiveTooltip>
      )}

      {features.homepageFilters.canSeeDapps ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "dapps" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeDapps ? "cursor-not-allowed" : ""}`}
          onClick={() => setFilter("dapps")}
        >
          dApps
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "dapps" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeDapps ? "cursor-not-allowed" : ""}`}
            onClick={() => setFilter("dapps")}
            disabled
          >
            dApps
          </button>
        </ResponsiveTooltip>
      )}

      {features.homepageFilters.canSeeWebsites ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "websites" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeWebsites ? "cursor-not-allowed" : ""}`}
          onClick={() => setFilter("websites")}
        >
          Websites
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "websites" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeWebsites ? "cursor-not-allowed" : ""}`}
            onClick={() => setFilter("websites")}
            disabled
          >
            Websites
          </button>
        </ResponsiveTooltip>
      )}

      {features.homepageFilters.canSeeNewsletters ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "newsletters" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeNewsletters ? "cursor-not-allowed" : ""}`}
          onClick={() => setFilter("newsletters")}
        >
          Newsletters
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "newsletters" ? "bg-white text-black" : "bg-secondaryBlack text-white"} ${!features.homepageFilters.canSeeNewsletters ? "cursor-not-allowed" : ""}`}
            onClick={() => setFilter("newsletters")}
            disabled
          >
            Newsletters
          </button>
        </ResponsiveTooltip>
      )}
    </div>
  );
};

export default Filters;
