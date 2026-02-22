import { cn } from "@/lib/utils";

type SectionSeparatorProps = {
  className?: string;
};

export const SectionSeparator = (props: SectionSeparatorProps) => {
  return (
    <hr
      className={cn(
        "w-screen relative left-1/2 -translate-x-1/2",
        props.className,
      )}
    />
  );
};
