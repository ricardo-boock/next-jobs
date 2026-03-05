import { cn } from "@/lib/utils";

export const SectionSeparator = ({ className }: { className?: string }) => {
  return <hr className={cn("my-16", className)} />;
};
