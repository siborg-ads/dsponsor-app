"use client";
import { explore, homes, pages, resources } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActiveParentMenu = (menus) => {
    return menus.some(
      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
    );
  };
  return (
    <>
      <li className="js-nav-dropdown group relative">
        <a
          href="#"
          className={`dropdown-toggle flex items-center justify-between py-3.5 font-display text-base ${
            isActiveParentMenu(homes)
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent  dark:hover:text-accent dark:focus:text-accent lg:px-5`}
          id="navDropdown-1"
          aria-expanded="false"
          role="button"
          data-bs-toggle="dropdown"
        >
          Home
          <i className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </i>
        </a>
        <ul
          className="dropdown-menu group-hover:visible lg:invisible -left-6 top-[85%] z-10 hidden grid-flow-row grid-cols-[repeat(2,_1fr)] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:!grid lg:translate-y-4 lg:py-8 lg:px-5 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
          aria-labelledby="navDropdown-1"
        >
          {homes.map((elm, i) => (
            <li key={i}>
              <Link
                href={elm.href}
                className="flex items-center justify-between rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
              >
                <span
                  className={`mr-4 font-display text-sm ${
                    elm.href == pathname
                      ? "text-accent dark:text-accent"
                      : "text-jacarta-700 dark:text-white"
                  }  `}
                >
                  {elm.text}
                </span>
                {elm.badge && (
                  <span className="rounded bg-green py-1 px-2 text-xxs font-bold uppercase leading-none text-white">
                    {elm.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="js-nav-dropdown group relative">
        <a
          href="#"
          className={`dropdown-toggle flex items-center justify-between py-3.5 font-display text-base  ${
            isActiveParentMenu(pages)
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent  dark:hover:text-accent dark:focus:text-accent lg:px-5`}
          id="navDropdown-2"
          aria-expanded="false"
          role="button"
          data-bs-toggle="dropdown"
        >
          Pages
          <i className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </i>
        </a>
        <ul
          className="dropdown-menu group-hover:visible lg:invisible -left-6 top-[85%] z-10 hidden grid-flow-row grid-cols-[repeat(2,_1fr)] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:!grid lg:translate-y-4 lg:py-8 lg:px-5 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
          aria-labelledby="navDropdown-2"
        >
          {pages.map((elm, i) => (
            <li key={i}>
              <Link
                href={elm.href}
                className="flex items-center justify-between rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
              >
                <span
                  className={`mr-4 font-display text-sm  ${
                    elm.href.split("/")[1] == pathname.split("/")[1]
                      ? "text-accent dark:text-accent"
                      : "text-jacarta-700 dark:text-white"
                  }  `}
                >
                  {elm.text}
                </span>
                {elm.badge && (
                  <span className="rounded bg-green py-1 px-2 text-xxs font-bold uppercase leading-none text-white">
                    {elm.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="js-nav-dropdown nav-item dropdown group relative">
        <Link
          href="/collections"
          className="dropdown-toggle flex items-center justify-between py-3.5 font-display text-base text-jacarta-700 hover:text-accent focus:text-accent dark:text-white dark:hover:text-accent dark:focus:text-accent lg:px-5"
          id="navDropdown-3"
          aria-expanded="false"
          role="button"
          data-bs-toggle="dropdown"
        >
          Explore
          <i className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </i>
        </Link>
        <ul
          className="dropdown-menu group-hover:visible lg:invisible -left-6 top-[85%] z-10 hidden grid-flow-col grid-rows-5 gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:!grid lg:translate-y-4 lg:py-8 lg:px-5 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
          aria-labelledby="navDropdown-1"
        >
          {explore.map((elm, i) => (
            <li key={i}>
              <Link
                href={elm.href}
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
              >
                <span
                  className={`mr-3 rounded-xl bg-[${elm.bgColor}] p-[0.375rem]`}
                  style={{ backgroundColor: elm.bgColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className={`h-4 w-4 fill-[${elm.svgFill}]`}
                    style={{ fill: elm.svgFill }}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d={elm.svgPath} />
                  </svg>
                </span>
                <span className="font-display text-sm text-jacarta-700 dark:text-white">
                  {elm.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="js-nav-dropdown group relative">
        <a
          href="#"
          className={`dropdown-toggle flex items-center justify-between py-3.5 font-display text-base ${
            isActiveParentMenu(resources)
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent  dark:hover:text-accent dark:focus:text-accent lg:px-5`}
          id="navDropdown-4"
          aria-expanded="false"
          role="button"
          data-bs-toggle="dropdown"
        >
          Resources
          <i className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="h-4 w-4 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
            </svg>
          </i>
        </a>
        <ul
          className="dropdown-menu group-hover:visible lg:invisible left-0 top-[85%] z-10 hidden min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:opacity-100 dark:bg-jacarta-800 lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2"
          aria-labelledby="navDropdown-4"
        >
          {resources.map((elm, i) => (
            <li key={i}>
              <Link
                href={elm.href}
                className="flex items-center rounded-xl px-5 py-2 transition-colors hover:bg-jacarta-50 hover:text-accent focus:text-accent dark:hover:bg-jacarta-600"
              >
                <span
                  className={`font-display text-sm  ${
                    elm.href.split("/")[1] == pathname.split("/")[1]
                      ? "text-accent dark:text-accent"
                      : "text-jacarta-700 dark:text-white"
                  } `}
                >
                  {elm.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="group">
        <Link
          href="/create"
          className={`flex items-center justify-between py-3.5 font-display text-base  ${
            "/create".split("/")[1] == pathname.split("/")[1]
              ? "text-accent dark:text-accent"
              : "text-jacarta-700 dark:text-white"
          }  hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent lg:px-5`}
        >
          Create
        </Link>
      </li>
    </>
  );
}
