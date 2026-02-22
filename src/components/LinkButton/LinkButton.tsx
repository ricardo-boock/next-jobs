import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/dist/client/link";

type LinkButtonProps = {
  children?: React.ReactNode;
  className?: string;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  variant?: "outline" | "secondary" | "ghost" | "destructive" | "link";
};

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Button
      asChild
      variant={props.variant}
      className={cn("w-fit", props.className)}
    >
      <Link
        href={props.href}
        target={props.target}
        rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {props.children}
      </Link>
    </Button>
  );
};
