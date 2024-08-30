import React from "react";
import { features } from "@/data/features";
import ResponsiveTooltip from "@/components/ui/ResponsiveTooltip";
import type { Filter, CurationDataItem } from "@/data/curation";

const Filters = ({
  data,
  filter,
  setFilter
}: {
  data: CurationDataItem[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const hasSomeMedias = data.find((d) => d.type.includes("medias"));
  const hasSomeDapps = data.find((d) => d.type.includes("dapps"));
  const hasSomeWebsites = data.find((d) => d.type.includes("websites"));
  const hasSomeNewsletters = data.find((d) => d.type.includes("newsletters"));

  return (
    <div className="flex items-center overflow-scroll md:overflow-auto md:flex-wrap gap-2 md:gap-4 hide-scrollbar">
      <button
        className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "all" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
        onClick={() => setFilter("all")}
        disabled={data.length === 0}
      >
        All
      </button>

      {hasSomeMedias ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "medias" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
          onClick={() => setFilter("medias")}
        >
          Medias
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "medias" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
            onClick={() => setFilter("medias")}
            disabled
          >
            Medias
          </button>
        </ResponsiveTooltip>
      )}

      {hasSomeDapps ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "dapps" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
          onClick={() => setFilter("dapps")}
        >
          dApps
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "dapps" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
            onClick={() => setFilter("dapps")}
            disabled
          >
            dApps
          </button>
        </ResponsiveTooltip>
      )}

      {hasSomeWebsites ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "websites" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
          onClick={() => setFilter("websites")}
        >
          Websites
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "websites" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
            onClick={() => setFilter("websites")}
            disabled
          >
            Websites
          </button>
        </ResponsiveTooltip>
      )}

      {hasSomeNewsletters ? (
        <button
          className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "newsletters" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
          onClick={() => setFilter("newsletters")}
        >
          Newsletters
        </button>
      ) : (
        <ResponsiveTooltip text="Coming soon...">
          <button
            className={`px-4 py-2 rounded-lg hover:bg-opacity-80 ${filter === "newsletters" ? "bg-white text-black" : "bg-secondaryBlack text-white"}`}
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
