"use client";

import { useMemo } from "react";
import { JobList } from "@/components/JobList/JobList";
import { useFavorites } from "@/hooks/useFavorites";
import type { JobPreview } from "@/types/remotive";

export function FavoritesClient({ jobs }: { jobs: JobPreview[] }) {
  const favoriteIds = useFavorites();

  const favoriteJobs = useMemo(() => {
    const favoriteIdSet = new Set(favoriteIds);
    return jobs.filter((job) => favoriteIdSet.has(job.id));
  }, [jobs, favoriteIds]);

  return (
    <JobList
      title="Favorites"
      description="Browse your saved favorites and never miss the perfect remote job opportunities from top companies."
      jobs={jobs}
      filterJobs={favoriteJobs}
    />
  );
}
