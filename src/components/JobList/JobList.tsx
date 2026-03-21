"use client";

import { useEffect, useMemo } from "react";
import { Heart } from "lucide-react";

import { FilterJobsCard } from "@/components/FilterJobs/FilterJobsCard";
import { FilterJobsDialog } from "@/components/FilterJobs/FilterJobsDialog";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { JobItem } from "@/components/JobItem/JobItem";
import { Pagination } from "@/components/Pagination/Pagination";
import {
  SORT_OPTIONS,
  SortSelect,
  type SortSelectOptions,
} from "@/components/SortSelect/SortSelect";
import { Field } from "@/components/ui/field";

import { useFavorites } from "@/hooks/useFavorites";
import { type SearchUpdate, useURLFilters } from "@/hooks/useURLFilters";

import { toggleFavorite } from "@/lib/favorites";
import { getFilteredJobs } from "@/lib/filter";
import { getSortedJobs } from "@/lib/sort";
import { cn } from "@/lib/utils";

import type { JobPreview } from "@/types/remotive";

type JobListProps = {
  title: string;
  description: string;
  jobs: JobPreview[];
  filterJobs: JobPreview[];
  showFavoritesLink?: boolean;
};

function isSortOption(value: string | null): value is SortSelectOptions {
  return !!value && SORT_OPTIONS.includes(value as SortSelectOptions);
}

export function JobList({
  title,
  description,
  jobs,
  filterJobs,
  showFavoritesLink = false,
}: JobListProps) {
  const { params, update } = useURLFilters();
  const favoriteIds: number[] = useFavorites();

  const MAX_ITEM_COUNT = 5;

  const keywords: string | null = params.get("keywords");
  const category: string | null = params.get("category");
  const company_name: string | null = params.get("company_name");

  const sortParam: string | null = params.get("sort");
  const sortedBy: SortSelectOptions = isSortOption(sortParam)
    ? sortParam
    : "newest";

  const filteredJobs: JobPreview[] = useMemo(
    () => getFilteredJobs(filterJobs, keywords, category, company_name),
    [filterJobs, keywords, category, company_name],
  );

  const sortedJobs: JobPreview[] = useMemo(
    () => getSortedJobs(filteredJobs, sortedBy),
    [filteredJobs, sortedBy],
  );

  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / MAX_ITEM_COUNT));

  const rawPage = Number(params.get("page") ?? "1");
  const currentPage =
    Number.isNaN(rawPage) || rawPage < 1 ? 1 : Math.min(rawPage, totalPages);

  useEffect(() => {
    const nextUpdates: SearchUpdate = {};

    const pageParam: string | null = params.get("page");
    const normalizedPage = String(currentPage);

    if (pageParam !== normalizedPage) {
      nextUpdates.page = normalizedPage;
    }

    if (sortParam !== null && !isSortOption(sortParam)) {
      nextUpdates.sort = "newest";
    }

    if (Object.keys(nextUpdates).length > 0) {
      update(nextUpdates);
    }
  }, [params, currentPage, sortParam, update]);

  const startIndex = (currentPage - 1) * MAX_ITEM_COUNT;
  const currentItems: JobPreview[] = sortedJobs.slice(
    startIndex,
    startIndex + MAX_ITEM_COUNT,
  );

  const handleOnPageChange = (page: number): void => {
    update({ page: String(page) });
  };

  const handleSortChange = (value: SortSelectOptions): void => {
    update({
      sort: value,
      page: "1",
    });
  };

  return (
    <div className={cn("lg:grid lg:grid-cols-4 lg:gap-10")}>
      <aside className={cn("hidden lg:block lg:col-span-1")}>
        <FilterJobsCard title="Filters" jobs={jobs} />
      </aside>

      <FilterJobsDialog
        className={cn("lg:hidden")}
        title="Filters"
        jobs={jobs}
      />

      <section className={cn("lg:col-span-3")}>
        <h1>{title}</h1>
        <p className={cn("mb-4")}>{description}</p>

        <div
          className={cn(
            "mb-6 flex flex-wrap items-center justify-between gap-3",
          )}
        >
          <span className={cn("whitespace-nowrap")}>
            {filteredJobs.length} {filteredJobs.length !== 1 ? "jobs" : "job"}{" "}
            found
          </span>

          <Field orientation="horizontal" className={cn("w-auto")}>
            <SortSelect value={sortedBy} onChange={handleSortChange} />

            {showFavoritesLink && (
              <LinkButton
                className={cn("no-underline")}
                variant="outline"
                href="/favorites"
              >
                <Heart />
                Favorites
              </LinkButton>
            )}
          </Field>
        </div>

        <div className={cn("grid gap-4")}>
          {currentItems.map((job) => (
            <JobItem
              key={job.id}
              job={job}
              isFav={favoriteIds.includes(job.id)}
              onToggleFav={() => toggleFavorite(job.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onPageChange={handleOnPageChange}
          />
        )}
      </section>
    </div>
  );
}
