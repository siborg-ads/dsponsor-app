import React from "react";
import Link from "next/link";
import { items_offer_data } from "../../data/items_tabs_data";

const OfferTab = () => {
  return (
    <>
      {/* <!-- Offers --> */}
      <div
        className="tab-pane fade show active"
        id="offers"
        role="tabpanel"
        aria-labelledby="offers-tab"
      >
        <table className="scrollbar-custom dark:bg-secondaryBlack dark:border-jacarta-600 border-jacarta-100 grid max-h-72 w-full grid-cols-5 overflow-y-auto rounded-lg rounded-tl-none border bg-white text-sm dark:text-white">
          <tr className="contents">
            <th className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4">
              <span className="text-jacarta-900 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                Price
              </span>
            </th>
            <th className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4">
              <span className="text-jacarta-900 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                USD Price
              </span>
            </th>
            <th className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4">
              <span className="text-jacarta-900 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                Floor Difference
              </span>
            </th>
            <th className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4">
              <span className="text-jacarta-900 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                Expiration
              </span>
            </th>
            <th className="dark:bg-jacarta-600 bg-light-base sticky top-0 py-2 px-4">
              <span className="text-jacarta-900 dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                From
              </span>
            </th>
          </tr>
          {items_offer_data.map((item) => {
            const { ethPrice, id, usdPrice, difference, Expiration, user } = item;
            return (
              <tr className="contents" key={id}>
                <td className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap border-t py-4 px-4">
                  <span className="text-green text-sm font-medium tracking-tight">
                    {ethPrice} ETH
                  </span>
                </td>
                <td className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4">
                  {usdPrice}
                </td>
                <td className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4">
                  {difference} below
                </td>
                <td className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4">
                  in {Expiration} months
                </td>
                <td className="dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4">
                  <Link href="#" className="text-primaryPurple">
                    {user}
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default OfferTab;
