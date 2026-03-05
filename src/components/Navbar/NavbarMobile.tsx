import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, SidebarClose } from "lucide-react";

type NavbarMobileProps = {
  items: { href: string; label: string }[];
};

export const NavbarMobile = ({ items }: NavbarMobileProps) => {
  const pathname = usePathname();
  const PADDING = "px-6 py-3";

  return (
    <div className={cn("md:hidden ml-auto")}>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Menu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className={cn("border-b border-border", PADDING)}>
            <DrawerTitle className={cn("sr-only")}>Menu</DrawerTitle>
            <div className={cn("flex items-center justify-between")}>
              <DrawerClose asChild>
                <SidebarClose className={cn("w-6 h-6 rotate-180")} />
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  className={cn("font-bold text-xl mr-5 no-underline")}
                  href="/"
                >
                  Next Jobs
                </Link>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className={cn("grid")}>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <DrawerClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-medium transition-colors no-underline",
                      PADDING,
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                      !isLast && "border-b border-border",
                    )}
                  >
                    {item.label}
                  </Link>
                </DrawerClose>
              );
            })}
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
