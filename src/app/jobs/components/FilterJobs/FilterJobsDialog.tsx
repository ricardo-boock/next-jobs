import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FilterJobs } from "./FilterJobs";
import { FilterJobsDialogProps } from "./FilterJobsTypes";
import { Filter } from "lucide-react";
import { useState } from "react";

export const FilterJobsDialog = ({
  className,
  title,
  description,
  jobs,
}: FilterJobsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(className)}>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "aspect-square p-0 rounded-full size-14 fixed left-4 bottom-7 md:hidden z-20 shadow-lg",
            )}
          >
            <span className={cn("flex items-center")}>
              <Filter className={cn("w-5 h-5")} />
            </span>
            <span className={cn("sr-only")}>Filters</span>
          </Button>
        </DialogTrigger>

        {open && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
        )}
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className={cn("text-2xl mt-0")}>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <FilterJobs jobs={jobs} onApplied={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
