import { JobPreview } from "@/types/remotive";

type FilterJobsBaseProps = {
  className?: string;
  description?: string;
  jobs: JobPreview[];
};

export type FilterJobsProps = {
  jobs: JobPreview[];
  onApplied?: () => void;
};

export type FilterJobsCardProps = FilterJobsBaseProps & {
  title?: string;
};

export type FilterJobsDialogProps = FilterJobsBaseProps & {
  title: string;
};
