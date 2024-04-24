import React, { useEffect, useState } from "react";
import { collection_activity_item_data } from "../../data/collection_data";
import Link from "next/link";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Validated_refused_items = ({ statut, proposalData }) => {
  const [filterVal, setFilterVal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState(collection_activity_item_data);
  const [statutItem, setStatutItem] = useState(null);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const [filterData, setfilterData] = useState(
    collection_activity_item_data.map((item) => {
      const { category } = item;
      return category;
    })
  );

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const [inputText, setInputText] = useState("");

  const handleFilter = (category) => {
    setData(collection_activity_item_data.filter((item) => item.category === category));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newArray = collection_activity_item_data.filter((item) => {
      return item.title.toLowerCase().includes(inputText);
    });
    setData(newArray);
    setInputText("");
  };

  useEffect(() => {
    setfilterData(filterData.filter(onlyUnique));
    if (statut) {
      setStatutItem("check");
    } else {
      setStatutItem("refused");
    }
  }, []);
  console.log(proposalData);
  if (proposalData.length === 0) {
    return <div className="flex justify-center">{statut ? "No validated ads..." : "No refused ads..."}</div>;
  }

  return (
    <>
      {/* <!-- Activity Tab --> */}
      <div className="tab-pane fade">
        {/* <!-- Records / Filter --> */}
        {statut && (
          <div key="2" className="dropdown-item mb-4 p-6 dark:bg-jacarta-700 dark:border-jacarta-600 border hover:bg-jacarta-50 block w-full rounded-xl  text-left text-sm transition-colors dark:text-white">
            <div className="flex flex-wrap  gap-5 ">
              <span className="mb-2 md:w-1/3 flex-grow dark:text-jacarta-300 text-jacarta-400 text-sm">
                Don&apos;t forget to display the adSpaces on your website ! Copy paste this piece of code to display automatically your sponsor logo.
              </span>
              
              <div className="flex gap-2 w-full md:w-auto items-start ">
                <pre
                  style={{
                    backgroundColor: "#010101",
                    borderRadius: "5px",
                    fontFamily: "'Courier New', monospace",
                    padding: "10px",
                    overflowX: "auto",
                  }}
                >
                  <code>{`<iframe src="https://integrations.dsponsor.com/squareLogsoV1/...`}</code>
                </pre>
                <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                  <div className="js-copy-clipboard cursor-pointer">
                    <CopyToClipboard text="userId" onCopy={() => setCopied(true)}>
                      <Image src="/images/copy.svg" alt="icon" width={20} height={20} className="mt-2 " />
                    </CopyToClipboard>
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        )}
        <div className="lg:flex">
          {/* <!-- Records --> */}

          <div className="mb-10 shrink-0 basis-8/12 space-y-5 lg:mb-0 lg:pr-10">
            {proposalData?.map((item) => {
              const {adParametersList, proposalIds, tokenId, reason, title } = item;
       
              return (
                <div key={tokenId} className="dark:bg-jacarta-700  gap-5 p-8 dark:border-jacarta-700 transition-shadow hover:shadow-lg border-jacarta-100 rounded-2.5xl relative flex">
                  <div className=" relative flex items-center gap-5 flex-col sm:flex-row ">
                    <figure className=" self-start">
                      <Image src={adParametersList?.imageURL} alt={title} height={75} width={75} objectFit="contain" className="rounded-2lg min-w-[75px]" loading="lazy" />
                    </figure>
                    <div>
                      <h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
                        Item : <span className="text-accent"> {tokenId} </span>{" "}
                      </h3>
                      <span>
                        Proposals  :{" "}
                        <span className="text-accent">
                          [{proposalIds[0]}-{proposalIds[1]}]
                        </span>{" "}
                      </span>
                      <div className="flex flex-col">
                        <Tippy hideOnClick={false} content={copied ? <span>copied</span> : <span>copy</span>}>
                          <button className="js-copy-clipboard flex min-w-[20px] text-white max-w-[20rem]  select-none overflow-hidden text-ellipsis whitespace-nowrap">
                            <CopyToClipboard text="userId" onCopy={() => setCopied(true)}>
                              <span>{adParametersList?.linkURL}</span>
                            </CopyToClipboard>
                          </button>
                        </Tippy>
                      </div>
                      {reason && <span className="text-jacarta-500 dark:text-jacarta-300">Reason : {reason}</span>}
                      
                    </div>
                  </div>
                  <div className="dark:border-jacarta-600 border-jacarta-100 ml-auto rounded-full border p-3 self-start">
                    <Image width={24} height={24} src={`/images/${statutItem}.svg`} alt="icon" className="min-w-[25px]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* <!-- Filters --> */}

          {/* <aside className="basis-4/12 lg:pl-5">
           
             <form action="search" className="relative mb-12 block" onSubmit={handleSubmit}>
              <input
                type="search"
                className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
                placeholder="Search"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-jacarta-500 h-4 w-4 dark:fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
                </svg>
              </button>
            </form>

            <h3 className="font-display text-jacarta-500 mb-4 font-semibold dark:text-white">Filters</h3>
            <div className="flex flex-wrap">
              {filterData.map((category, i) => {
                return (
                  <button
                    className={
                      filterVal === i
                        ? "dark:border-jacarta-600 group bg-accent border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border px-4 py-3 border-transparent text-white dark:border-transparent"
                        : "dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 mr-2.5 mb-2.5 inline-flex items-center rounded-xl border bg-white px-4 py-3 hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent"
                    }
                    key={i}
                    onClick={() => {
                      handleFilter(category);
                      setFilterVal(i);
                    }}
                  >
                    <svg className={filterVal === i ? "icon mr-2 h-4 w-4 fill-white" : "icon fill-jacarta-700 mr-2 h-4 w-4 group-hover:fill-white dark:fill-white"}>
                      <use xlinkHref={`/icons.svg#icon-${category}`}></use>
                    </svg>
                    <span className="text-2xs font-medium capitalize">{category}</span>
                  </button>
                );
              })}
            </div> 
          </aside> */}
        </div>
      </div>
    </>
  );
};

export default Validated_refused_items;
