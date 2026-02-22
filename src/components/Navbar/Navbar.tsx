"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const pathname = usePathname();
  const links = [
    { href: "/jobs", label: "Jobs" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className={cn("page-container py-3 flex items-center gap-4")}>
      <Link className={cn("font-bold text-xl mr-5")} href="/">
        Next Jobs
      </Link>

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "font-medium transition-colors",
            pathname === link.href
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}

      <LinkButton className={cn("ml-auto")} href="/jobs">
        Find jobs
      </LinkButton>
    </nav>
  );
};
