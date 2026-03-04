import Link from "next/link";
import { ComponentPropsWithoutRef, HTMLAttributeAnchorTarget } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Button>,
  "asChild"
> & {
  href: ComponentPropsWithoutRef<typeof Link>["href"];
  target?: HTMLAttributeAnchorTarget;
};

export function LinkButton({
  href,
  target,
  rel,
  className,
  children,
  ...buttonProps
}: LinkButtonProps) {
  const safeRel: string | undefined =
    target === "_blank" ? (rel ?? "noopener noreferrer") : rel;

  return (
    <Button asChild className={cn("w-fit", className)} {...buttonProps}>
      <Link href={href} target={target} rel={safeRel}>
        {children}
      </Link>
    </Button>
  );
}
