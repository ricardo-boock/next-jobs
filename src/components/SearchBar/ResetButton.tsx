import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResetButtonProps = {
  className?: string;
  onClick: () => void;
};

export const ResetButton = ({ className, onClick }: ResetButtonProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 mr-0.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-[calc(var(--radius)-5px)]",
        className,
      )}
      onClick={() => {
        onClick();
      }}
    >
      <XIcon />
      <span className={cn("sr-only")}>Clear</span>
    </Button>
  );
};
