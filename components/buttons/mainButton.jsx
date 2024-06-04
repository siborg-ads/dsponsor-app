import Link from "next/link";
import React from "react";

const whiteClass =
  "text-accent shadow-white-volume hover:bg-accent-dark hover:shadow-accent-volume w-36 rounded-full bg-white py-3 px-8 text-center font-semibold transition-all hover:text-white";

const purpleClass =
  "bg-accent shadow-accent-volume hover:shadow-accent-volume-dark hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all";

const MainButton = ({ link, isPurple, text }) => {
  return (
    <>
      {link ? (
        <Link href={link} className={`${isPurple ? purpleClass : whiteClass}`}>
          {text}
        </Link>
      ) : (
        <button className={`${isPurple ? purpleClass : whiteClass}`}>
          {text}
        </button>
      )}
    </>
  );
};

export default MainButton;
