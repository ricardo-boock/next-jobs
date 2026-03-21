import { Filter } from "lucide-react";
import { useState } from "react";

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
import { FilterJobsDialogProps } from "./FilterJobs.types";

import "./FilterJobsDialog.scss";

export const FilterJobsDialog = ({
  className,
  title,
  description,
  jobs,
}: FilterJobsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "aspect-square p-0 rounded-full size-14 fixed left-4 bottom-7 z-20 shadow-lg hover:bg-primary",
              className,
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
        <DialogContent
          id="filter-jobs-dialog"
          className={cn(className)}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className={cn("text-2xl mt-0")}>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <FilterJobs jobs={jobs} onApplied={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
