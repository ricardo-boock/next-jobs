import { JobPreview } from "@/types/remotive";

export function getSortedJobs(
  jobs: JobPreview[],
  sortedBy: "newest" | "oldest" | "title",
): JobPreview[] {
  const copy: JobPreview[] = [...jobs];

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
}
