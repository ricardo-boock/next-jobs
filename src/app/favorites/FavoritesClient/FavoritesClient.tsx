"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FilterJobsDialog } from "@/components/FilterJobs/FilterJobsDialog";
import { FilterJobsCard } from "@/components/FilterJobs/FilterJobsCard";
import { JobItem } from "@/components/JobItem/JobItem";
import { SortSelect } from "@/components/SortSelect/SortSelect";
import { Field } from "@/components/ui/field";
import { toggleFavorite } from "@/lib/favorites/favorites";
import { useFavorites } from "@/lib/favorites/useFavorites";
import { getFilteredJobs } from "@/lib/filter";
import { getSortedJobs } from "@/lib/sort";
import { cn } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";

type FavoritesClientProps = { jobs: JobPreview[] };

export const FavoritesClient = ({ jobs }: FavoritesClientProps) => {
  const searchParams = useSearchParams();
  const [sortedBy, setSortedBy] = useState<"newest" | "oldest" | "title">(
    "newest",
  );

  const keywords: string | null = searchParams.get("keywords");
  const category: string | null = searchParams.get("category");
  const company_name: string | null = searchParams.get("company_name");

  const favoriteIds: number[] = useFavorites();
  const favoriteIdSet: Set<number> = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds],
  );

  const favoriteJobs = useMemo(() => {
    return jobs.filter((job) => favoriteIdSet.has(job.id));
  }, [jobs, favoriteIdSet]);

  const filteredJobs: JobPreview[] = useMemo(
    () => getFilteredJobs(favoriteJobs, keywords, category, company_name),
    [favoriteJobs, keywords, category, company_name],
  );

  const sortedJobs: JobPreview[] = useMemo(
    () => getSortedJobs(filteredJobs, sortedBy),
    [filteredJobs, sortedBy],
  );

  return (
    <div className={cn("lg:grid lg:grid-cols-4 lg:gap-10")}>
      {/* Filter section */}
      <aside className={cn("hidden lg:block lg:col-span-1")}>
        <FilterJobsCard title="Filters" jobs={jobs} />
      </aside>

      <FilterJobsDialog
        className={cn("lg:hidden")}
        title="Filters"
        jobs={jobs}
      />

      {/* Job list section */}
      <section className={cn("lg:col-span-3")}>
        <h1>Favorites</h1>
        <p className={cn("mb-4")}>
          Browse your saved favorites and never miss the perfect remote job
          opportunities from top companies.
        </p>

        <div
          className={cn(
            "flex items-center justify-between flex-wrap mb-6 gap-3",
          )}
        >
          <span className={cn("whitespace-nowrap")}>
            {filteredJobs.length} {filteredJobs.length !== 1 ? "jobs" : "job"}{" "}
            found
          </span>

          <Field orientation="horizontal" className={cn("w-auto")}>
            <SortSelect value={sortedBy} onChange={setSortedBy} />
          </Field>
        </div>

        <div className={cn("grid gap-4")}>
          {sortedJobs.map((job) => (
            <JobItem
              key={job.id}
              job={job}
              isFav={favoriteIds.includes(job.id)}
              onToggleFav={() => toggleFavorite(job.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
