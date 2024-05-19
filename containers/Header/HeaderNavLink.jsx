import Link from "next/link";
import {isChildrenPageActive} from "../../utils/daynamicNavigation";
import {usePathname} from "next/navigation";

export default function HeaderNavLink({ to, children }) {
    const pathname = usePathname();
    return (
        <Link href={to} className={`px-5 py-3.5 ${isChildrenPageActive(pathname, to) ? "text-accent" : "text-white" } hover:text-accent`}>
            {children}
        </Link>
    );
}
