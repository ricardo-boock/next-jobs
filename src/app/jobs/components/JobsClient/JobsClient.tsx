"use client";

import { JobList } from "@/components/JobList/JobList";
import type { JobPreview } from "@/types/remotive";

export default function JobsClient({ jobs }: { jobs: JobPreview[] }) {
  return (
    <JobList
      title="Jobs"
      description="Browse remote job opportunities from top companies."
      jobs={jobs}
      filterJobs={jobs}
      showFavoritesLink
    />
  );
}
