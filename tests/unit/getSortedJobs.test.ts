import { describe, it, expect } from "vitest";
import { getSortedJobs } from "@/lib/sort";
import { JobPreview } from "@/types/remotive";

function createJob(overrides?: Partial<JobPreview>): JobPreview {
  return {
    id: 1,
    title: "Test Job",
    company_name: "Test Company",
    category: "Software Development",
    tags: [],
    job_type: "Full-time",
    publication_date: "2022-01-01",
    candidate_required_location: "Worldwide",
    ...overrides,
  };
}

const jobs: JobPreview[] = [
  createJob({ id: 1, title: "ö", publication_date: "2022-03-01" }),
  createJob({ id: 2, title: "B", publication_date: "2022-01-17" }),
  createJob({ id: 3, title: "ß", publication_date: "2023-02-09" }),
  createJob({ id: 4, title: "?", publication_date: "2022-01-16" }),
  createJob({ id: 5, title: "a", publication_date: "2022-12-24" }),
];

describe("getSortedJobs", () => {
  it("sorts jobs by newest", () => {
    const result: JobPreview[] = getSortedJobs(jobs.slice(), "newest");

    expect(result.map((job) => job.id)).toEqual([3, 5, 1, 2, 4]);
  });

  it("sorts jobs by oldest", () => {
    const result: JobPreview[] = getSortedJobs(jobs.slice(), "oldest");

    expect(result.map((job) => job.id)).toEqual([4, 2, 1, 5, 3]);
  });

  it("sorts jobs by title", () => {
    const result: JobPreview[] = getSortedJobs(jobs.slice(), "title");

    expect(result.map((job) => job.id)).toEqual([4, 5, 2, 1, 3]);
  });

  it("returns an empty array if no jobs are provided", () => {
    const result: JobPreview[] = getSortedJobs([], "newest");

    expect(result).toEqual([]);
  });
});
