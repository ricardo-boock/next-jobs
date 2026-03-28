import { describe, it, expect } from "vitest";
import { filterByKeywords } from "@/lib/filter";
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
  createJob({
    id: 1,
    title: "Junior Full Stack Developer",
    company_name: "Google",
    category: "Software Development",
    tags: ["TypeScript", "Next.js"],
    job_type: "Full-time",
    candidate_required_location: "Worldwide",
  }),
  createJob({
    id: 2,
    title: "Senior Full Stack Developer",
    company_name: "Amazon",
    category: "Software Development",
    tags: ["React", "Node.js"],
    job_type: "Full-time",
    candidate_required_location: "Worldwide",
  }),
  createJob({
    id: 3,
    title: "Full Stack Developer",
    company_name: "Microsoft",
    category: "Software Development",
    tags: ["Python", "Django"],
    job_type: "Full-time",
    candidate_required_location: "Germany",
  }),
  createJob({
    id: 4,
    title: "Manager",
    company_name: "Facebook",
    category: "Web Development",
    tags: ["JavaScript", "React"],
    job_type: "Full-time",
    candidate_required_location: "Germany",
  }),
];

describe("filterByKeywords", () => {
  it("returns jobs that match all text terms across searchable fields", () => {
    const result: JobPreview[] = filterByKeywords(
      jobs.slice(),
      "Full Stack Developer Germany",
    );

    expect(result.map((job) => job.id)).toEqual([3]);
  });

  it("returns the source when keywords are null or blank", () => {
    expect(filterByKeywords(jobs.slice(), null)).toEqual(jobs.slice());
    expect(filterByKeywords(jobs.slice(), "")).toEqual(jobs.slice());
    expect(filterByKeywords(jobs, "   ")).toEqual(jobs.slice());
  });

  it("filters by exact id syntax", () => {
    const result: JobPreview[] = filterByKeywords(jobs.slice(), "id: 1");

    expect(result.map((job) => job.id)).toEqual([1]);
  });

  it("filters by numeric-only keywords as job ids", () => {
    const result: JobPreview[] = filterByKeywords(jobs.slice(), "1 3");

    expect(result.map((job) => job.id)).toEqual([1, 3]);
  });

  it("filters by a single text term", () => {
    const result: JobPreview[] = filterByKeywords(jobs.slice(), "Developer");

    expect(result.map((job) => job.id)).toEqual([1, 2, 3]);
  });
});
