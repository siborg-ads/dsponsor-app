import Link from "next/link";

export default function HeaderMobileMenuLink({ to, children }) {
    return (
        <Link href={to} onClick={() => setToggle(false)} className="py-3.5 block w-full text-center text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
            {children}
        </Link>
    );
}
