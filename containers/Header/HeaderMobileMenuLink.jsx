import Link from "next/link";

export default function HeaderMobileMenuLink({ to, children, setToggle }) {
    return (
      <Link
        href={to}
        onClick={() => setToggle(false)}
        className="text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5"
      >
        {children}
      </Link>
    );
}
