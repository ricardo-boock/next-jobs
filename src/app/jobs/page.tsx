"use client";

import { Heart } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { getJobs } from "@/lib/jobs";
import { cn } from "@/lib/utils";
import { JobPreview, RemotiveResponse } from "@/types/remotive";
import { Filter } from "./components/Filter";
import { Sort } from "./components/Sort";
import { JobItem } from "./components/JobItem";

const data: RemotiveResponse = await getJobs();
const jobs: JobPreview[] = data.jobs;

export default function Jobs() {
  const [sortedBy, setSortedBy] = useState<"newest" | "oldest" | "title">(
    "newest",
  );
  const [filteredJobs, setFilteredJobs] = useState<JobPreview[]>(jobs);

  const sortedJobs = useMemo(() => {
    const copy = [...filteredJobs];

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
        <Filter jobs={jobs} onSubmit={setFilteredJobs} />
      </aside>

      {/* Job list section */}
      <section className={cn("md:col-span-3")}>
        <h1 className={cn("text-3xl font-bold mb-2")}>Jobs</h1>
        <p className={cn("mb-4")}>
          Browse remote job opportunities from top companies.
        </p>

        <div className={cn("flex items-center justify-between mb-6")}>
          <span className={cn("whitespace-nowrap")}>
            {jobs.length} jobs found
          </span>

          <Field orientation="horizontal" className={cn("w-auto")}>
            <Sort value={sortedBy} onChange={setSortedBy} />
            <Button variant="outline">
              <Heart />
              Favorites
            </Button>
          </Field>
        </div>

        <div className="grid gap-4">
          {sortedJobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
