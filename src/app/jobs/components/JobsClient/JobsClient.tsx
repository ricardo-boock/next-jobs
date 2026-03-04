"use client";

import { Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Field } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";
import { FilterJobs } from "../FilterJobs/FilterJobs";
import { SortSelect } from "../SortSelect/SortSelect";
import { JobItem } from "../JobItem/JobItem";
import { filterByKey, filterByKeywords } from "@/lib/filter";
import { LinkButton } from "@/components/LinkButton/LinkButton";

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
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-10")}>
      {/* Filter section */}
      <aside className={cn("md:col-span-1 grid")}>
        <FilterJobs jobs={jobs} />
      </aside>

      {/* Job list section */}
      <section className={cn("md:col-span-3")}>
        <h1 className={cn("text-3xl font-bold mb-2")}>Jobs</h1>
        <p className={cn("mb-4")}>
          Browse remote job opportunities from top companies.
        </p>

        <div className={cn("flex items-center justify-between mb-6")}>
          <span className={cn("whitespace-nowrap")}>
            {filteredJobs.length} {filteredJobs.length !== 1 ? "jobs" : "job"}{" "}
            found
          </span>

          <Field orientation="horizontal" className={cn("w-auto")}>
            <SortSelect value={sortedBy} onChange={setSortedBy} />
            <LinkButton variant="outline" href="/favorites">
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
