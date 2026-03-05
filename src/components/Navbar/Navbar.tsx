"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { cn } from "@/lib/utils";
import { NavbarMobile } from "./NavbarMobile";

export const Navbar = () => {
  const pathname = usePathname();
  const links: { href: string; label: string }[] = [
    { href: "/jobs", label: "Jobs" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav className={cn("page-container py-3 flex items-center gap-4")}>
        <Link className={cn("font-bold text-xl mr-5 no-underline")} href="/">
          Next Jobs
        </Link>

        <div className={cn("hidden md:flex items-center gap-4 flex-1")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium transition-colors no-underline",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <LinkButton className={cn("ml-auto no-underline")} href="/jobs">
            Find jobs
          </LinkButton>
        </div>

        <NavbarMobile items={links} />
      </nav>
    </>
  );
};
