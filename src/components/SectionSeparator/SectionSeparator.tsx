import { cn } from "@/lib/utils";

export const SectionSeparator = ({ className }: { className?: string }) => {
  return <hr className={cn("w-full my-16", className)} />;
};
