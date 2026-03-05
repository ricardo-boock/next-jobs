"use client";

import { Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { Field } from "@/components/ui/field";
import { filterByKey, filterByKeywords } from "@/lib/filter";
import { cn } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";
import { FilterJobsCard } from "../FilterJobs/FilterJobsCard";
import { FilterJobsDialog } from "../FilterJobs/FilterJobsDialog";
import { SortSelect } from "../SortSelect/SortSelect";
import { JobItem } from "../JobItem/JobItem";

export default function JobsClient({ jobs }: { jobs: JobPreview[] }) {
  const searchParams = useSearchParams();
  const [sortedBy, setSortedBy] = useState<"newest" | "oldest" | "title">(
    "newest",
  );

  const keywords: string | null = searchParams.get("keywords");
  const category: string | null = searchParams.get("category");
  const company_name: string | null = searchParams.get("company_name");

  const filteredJobs = useMemo(() => {
    const byKeywords: JobPreview[] = filterByKeywords(jobs, keywords);
    const byCategory: JobPreview[] = filterByKey(
      byKeywords,
      "category",
      category,
    );
    const byCompany: JobPreview[] = filterByKey(
      byCategory,
      "company_name",
      company_name,
    );

    return byCompany;
  }, [jobs, keywords, category, company_name]);

  const sortedJobs: JobPreview[] = useMemo(() => {
    const copy: JobPreview[] = [...filteredJobs];

    switch (sortedBy) {
      case "newest":
        return copy.sort(
          (a, b) =>
            new Date(b.publication_date).getTime() -
            new Date(a.publication_date).getTime(),
        );
      case "oldest":
        return copy.sort(
          (a, b) =>
            new Date(a.publication_date).getTime() -
            new Date(b.publication_date).getTime(),
        );
      case "title":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copy;
    }
  }, [filteredJobs, sortedBy]);

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
        <h1>Jobs</h1>
        <p className={cn("mb-4")}>
          Browse remote job opportunities from top companies.
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
            <LinkButton
              className={cn("no-underline")}
              variant="outline"
              href="/favorites"
            >
              <Heart />
              Favorites
            </LinkButton>
          </Field>
        </div>

        <div className={cn("grid gap-4")}>
          {sortedJobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
