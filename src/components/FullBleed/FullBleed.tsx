import { cn } from "@/lib/utils";
import "./FullBleed.scss";

export function FullBleed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // <div className={cn("-mx-[calc((100vw-100%)/2)] max-w-full", className)}>
    //   {children}
    // </div>
    <div className={cn("full-bleed", className)}>{children}</div>
  );
}
