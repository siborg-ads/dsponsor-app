import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import renderDateToHumanString from "@/utils/dates/renderDateToHumanString";
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { HistoryProposalType } from "../AdValidation";
import { DateRangePicker } from "@nextui-org/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Input from "@/components/ui/Input";

function sanitizeType(type) {
  if (type === "linkURL") {
    return "Link";
  } else if (type.startsWith("imageURL")) {
    const sanitizedStatus = type.replace("-0", "");
    const ratio = sanitizedStatus.split("-")[1];
    return `Image (${ratio})`;
  } else {
    return type;
  }
}

function santizeStatus(status) {
  const moment = status.split("_")[0];
  const state = status.split("_")[1];
  if (moment === "CURRENT") {
    return state.charAt(0).toUpperCase() + state.slice(1).toLowerCase();
  }
  return `Previously ${state.toLowerCase()}`;
}

type FilterOptionsType = "All proposals" | "Accepted" | "Pending" | "Rejected";

const ProposalHistory = ({ data }: { data: HistoryProposalType[] }) => {
  const [currProposal, setCurrProposal] = useState<HistoryProposalType | null>(null);
  const [visibleListings, setVisibleListings] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterOption, setFilterOption] = useState<FilterOptionsType>("All proposals");
  const [filterName, setFilterName] = useState("");

  // No need to add the event when the modal opens and remove it when it closes because worst case it just remove an inexisting modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCurrProposal(null);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const filteredData = useMemo(() => {
    let tempData = [...data];
    setVisibleListings(0);
    // Filter by date
    if (startDate && endDate) {
      tempData = data.filter((proposal) => {
        const proposalDate = new Date(proposal.creationTimestamp * 1000);
        return proposalDate >= startDate && proposalDate <= endDate;
      });
    } else if (startDate) {
      tempData = data.filter((proposal) => {
        const proposalDate = new Date(proposal.creationTimestamp * 1000);
        return proposalDate >= startDate;
      });
    } else if (endDate) {
      tempData = data.filter((proposal) => {
        const proposalDate = new Date(proposal.creationTimestamp * 1000);
        return proposalDate <= endDate;
      });
    }

    // Filter by name or metadata
    if (filterName && filterName.length > 0 && filterName !== "") {
      tempData = [...tempData].filter(
        (proposal) =>
          proposal.id?.toString().includes(filterName.toLowerCase()) ||
          proposal.metadata?.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Filter by status
    switch (filterOption) {
      case "All proposals":
        return tempData;
      case "Accepted":
        return tempData.filter((proposal) => proposal.status.includes("ACCEPTED"));
      case "Pending":
        return tempData.filter((proposal) => proposal.status.includes("PENDING"));
      case "Rejected":
        return tempData.filter((proposal) => proposal.status.includes("REJECTED"));
    }
  }, [filterOption, startDate, endDate, filterName]);

  // In case there is one proposal with metadata, we will show the metadata column
  const containsMetadata = filteredData.some((proposal) => proposal.metadata);
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row flex-wrap-reverse items-center justify-end gap-2 mb-4 sm:gap-4">
        <div className="flex mr-0 md:mr-auto">
          <Input
            type="text"
            placeholder={`Filter by id${containsMetadata ? " or metadata" : ""}`}
            name="search"
            value={filterName}
            onChange={(e) => {
              setFilterName(e.target.value);
            }}
          />
        </div>
        <Menu as="div" className="h-8 w-fit">
          <MenuButton className="flex items-center justify-center w-full h-full px-4 border bg-secondaryBlack rounded-xl hover:bg-opacity-80 border-jacarta-100 border-opacity-10">
            <div className="flex items-center gap-1">
              {filterOption} <ChevronDownIcon className="w-5 h-5" />
            </div>
          </MenuButton>

          <MenuItems
            anchor="bottom start"
            className={`rounded-xl flex flex-col gap-2 [--anchor-gap:1rem] bg-secondaryBlack p-2 border border-jacarta-100 border-opacity-10`}
          >
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("All proposals");
                }}
                className="w-full p-2 pr-12 rounded-lg text-start hover:bg-primaryBlack md:pr-24"
              >
                <span>All proposals</span>
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("Accepted");
                }}
                className="w-full p-2 pr-12 rounded-lg text-start hover:bg-primaryBlack md:pr-24"
              >
                <span>Accepted</span>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("Pending");
                }}
                className="w-full p-2 pr-12 rounded-lg text-start hover:bg-primaryBlack md:pr-24"
              >
                <span>Pending</span>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setFilterOption("Rejected");
                }}
                className="w-full p-2 pr-12 rounded-lg text-start hover:bg-primaryBlack md:pr-24"
              >
                <span>Rejected</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
        <div className="flex items-center justify-center justify-self-start">
          <DateRangePicker
            aria-label="Select date range"
            size="sm"
            onChange={(value) => {
              if (!value) {
                setStartDate(null);
                setEndDate(null);
                return;
              }

              const startDateObject = value?.start;
              const endDateObject = value?.end;
              if (!startDateObject || !endDateObject) {
                setStartDate(null);
                setEndDate(null);
                return;
              }

              const startDate = new Date(
                startDateObject.year,
                startDateObject.month - 1,
                startDateObject.day
              );
              const endDate = new Date(
                endDateObject.year,
                endDateObject.month - 1,
                endDateObject.day
              );

              setStartDate(startDate);
              setEndDate(endDate);
            }}
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto text-left dark:bg-primaryBlack dark:text-white rounded-2lg">
        <table className="w-full mx-auto text-left border rounded-2lg dark:border-primaryPink dark:border-opacity-10">
          <thead className="rounded-2lg">
            <tr className="text-base bg-jacarta-50 dark:bg-primaryPurple rounded-2lg">
              <th className="px-4 py-3 font-medium text-jacarta-100 dark:text-jacarta-100">Id</th>
              {containsMetadata && (
                <th className="px-4 py-3 font-medium text-jacarta-100 dark:text-jacarta-100 w-fit">
                  Metadata
                </th>
              )}
              <th className="px-4 py-3 font-medium text-jacarta-100 text-nowrap dark:text-jacarta-100">
                Type
              </th>
              <th className="px-4 py-3 font-medium text-jacarta-100 text-nowrap dark:text-jacarta-100">
                Creation
              </th>
              <th className="px-4 py-3 font-medium text-jacarta-100 text-nowrap dark:text-jacarta-100">
                Last Update
              </th>
              <th className="px-4 py-3 font-medium text-jacarta-100 dark:text-jacarta-100">Data</th>
              <th className="px-4 py-3 font-medium text-jacarta-100 text-nowrap dark:text-jacarta-100 ">
                Reject Reason
              </th>
              <th className="px-4 py-3 font-medium text-jacarta-100 dark:text-jacarta-100">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.length > 0 &&
              filteredData
                .slice(visibleListings * 10, visibleListings * 10 + 10)
                .map((proposal, proposalIndex) => (
                  <tr key={proposalIndex}>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      {proposal.id?.toString().slice(0, 6)}...{proposal.id?.toString().slice(-4)}
                    </td>
                    {containsMetadata && (
                      <td
                        className={
                          proposal.metadata ? "px-4 py-4 text-green" : "px-4 py-4 text-jacarta-100"
                        }
                      >
                        {proposal.metadata || "-"}
                      </td>
                    )}
                    <td className="px-4 py-4 text-jacarta-100 text-nowrap dark:text-jacarta-100">
                      {sanitizeType(proposal.type)}
                    </td>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      {renderDateToHumanString(new Date(proposal.creationTimestamp * 1000))}
                    </td>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      {renderDateToHumanString(new Date(proposal.lastUpdateTimestamp * 1000))}
                    </td>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      <button
                        className="text-nowrap hover:cursor-pointer hover:underline"
                        onClick={(e) => {
                          if (proposal.type !== "linkURL") {
                            e.preventDefault();
                            setCurrProposal(proposal);
                          }
                        }}
                      >
                        {proposal.type === "linkURL" ? (
                          <Link href={proposal.data} target="_blank" className="text-green">
                            {proposal.data}
                          </Link>
                        ) : (
                          "Preview Image 🔎"
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      {proposal.rejectReason || "-"}
                    </td>
                    <td className="px-4 py-4 text-jacarta-100 dark:text-jacarta-100">
                      {santizeStatus(proposal.status)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {filteredData.length > 10 && (
          <div className="flex items-center justify-center gap-4 mx-auto mt-4 text-center">
            {visibleListings > 0 && (
              <button
                className="px-4 py-2 text-white rounded-lg bg-secondaryBlack hover:bg-opacity-80"
                onClick={() => setVisibleListings(visibleListings - 1)}
              >
                <span className="flex items-center gap-1">
                  <ChevronLeftIcon className="w-4 h-4" />
                  Previous
                </span>
              </button>
            )}
            {visibleListings + 1}

            {visibleListings + 1 < Math.floor(filteredData.length / 10) && (
              <button
                className="px-4 py-2 text-white rounded-lg bg-secondaryBlack hover:bg-opacity-80"
                onClick={() => setVisibleListings(visibleListings + 1)}
              >
                <span className="flex items-center gap-1">
                  Next <ChevronRightIcon className="w-4 h-4" />
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      {currProposal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setCurrProposal(null);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen max-w-full max-h-screen backdrop-blur-xl"
        >
          <div
            className="flex items-center justify-center max-w-full max-h-full"
            style={{
              aspectRatio: `${currProposal.cssAspectRatio}`
            }}
          >
            <div className="relative flex items-center justify-center w-3/4 max-w-full max-h-full h-3/4">
              <div className="relative flex items-center justify-center h-full max-w-full max-h-full overflow-hidden bg-white border-2 border-dotted border-jacarta-100 dark:bg-jacarta-200 bg-opacity-20 backdrop-blur-xl dark:bg-opacity-20 dark:border-jacarta-100">
                <Image
                  src={currProposal.data}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="object-contain object-center h-full max-w-full max-h-full"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                className="absolute top-0 right-0 -p-10"
                onClick={() => setCurrProposal(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="w-6 h-6 fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="flex items-center justify-center gap-4 mx-auto mt-4 text-center">
        {visibleListings > 1 && (
          <button
            className="px-4 py-2 text-white rounded-lg bg-secondaryBlack hover:bg-opacity-80"
            onClick={handleViewLess}
          >
            <span className="flex items-center gap-1">
              View Less <ChevronUpIcon className="w-4 h-4" />
            </span>
          </button>
        )}
        {visibleListings < sortedBids.length && (
          <button
            className="px-4 py-2 text-white rounded-lg bg-secondaryBlack hover:bg-opacity-80"
            onClick={handleViewMore}
          >
            <span className="flex items-center gap-1">
              View More <ChevronDownIcon className="w-4 h-4" />
            </span>
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ProposalHistory;
