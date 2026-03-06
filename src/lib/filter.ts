import Fuse, { type Expression, type IFuseOptions } from "fuse.js";
import { JobPreview } from "@/types/remotive";

export function filterByKey<K extends keyof JobPreview>(
  source: JobPreview[],
  key: K,
  value: JobPreview[K] | null,
): JobPreview[] {
  if (value === null || value === "") return source;
  return source.filter((job) => job[key] === value);
}

type ExtendedSearchQuery<T> = {
  $and: Array<{
    $or: Array<Partial<Record<keyof T, string>>>;
  }>;
};

const fuseOptions: IFuseOptions<JobPreview> = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.35,
  useExtendedSearch: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.55 },
    { name: "company_name", weight: 0.2 },
    { name: "category", weight: 0.2 },
    { name: "tags", weight: 0.05 },
    { name: "candidate_required_location", weight: 0.05 },
  ],
};

// keeps "a.team" together; keeps numbers too
function tokenize(q: string): string[] {
  return q.toLowerCase().match(/[a-z0-9]+(?:[.+-][a-z0-9]+)*/g) ?? [];
}

export function filterByKeywords(
  source: JobPreview[],
  keywords: string | null,
): JobPreview[] {
  const raw = keywords?.trim();
  if (!raw) return source;

  // Support "id:123"
  const idMatch = raw.match(/\bid\s*:\s*(\d+)\b/i);
  if (idMatch) {
    const id = Number(idMatch[1]);
    return source.filter((j) => j.id === id);
  }

  const terms = tokenize(raw);
  if (terms.length === 0) return source;

  // If query is ONLY a number (or numbers), treat as ID search
  const numericOnly = terms.every((t) => /^\d+$/.test(t));
  if (numericOnly) {
    const ids = new Set(terms.map((t) => Number(t)));
    return source.filter((j) => ids.has(j.id));
  }

  // If query contains a number AND text, narrow by id first
  const idTerms = terms.filter((t) => /^\d+$/.test(t));
  const textTerms = terms.filter((t) => !/^\d+$/.test(t));

  let base = source;
  if (idTerms.length > 0) {
    const ids = new Set(idTerms.map((t) => Number(t)));
    base = base.filter((j) => ids.has(j.id));
    // if user typed id + words but id doesn't exist, return empty fast
    if (base.length === 0) return [];
  }

  // If no text terms left after removing ids, return the id-filtered base
  if (textTerms.length === 0) return base;

  // Single text term: do a LIKE prefilter so category matches like "Sales / Business" always show
  if (textTerms.length === 1) {
    const t = textTerms[0];

    const pre = base.filter((job) => {
      const hay = [
        job.title,
        job.company_name,
        job.category,
        job.job_type,
        job.candidate_required_location,
        ...(job.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(t);
    });

    // If LIKE found stuff, return it (don’t let Fuse remove it)
    if (pre.length > 0) return pre;

    // Otherwise fall back to fuzzy for typos
    const fuse = new Fuse(base, fuseOptions);
    return fuse.search(t).map((r) => r.item);
  }

  // Multi-term: AND across words, OR across fields
  const fuse = new Fuse(base, fuseOptions);

  const query: ExtendedSearchQuery<JobPreview> = {
    $and: textTerms
      .filter((t) => t.length >= 2) // ignore tiny noise words like "a"
      .map((t) => ({
        $or: [
          { title: t },
          { company_name: t },
          { category: t },
          { tags: t },
          { candidate_required_location: t },
        ],
      })),
  };

  if (query.$and.length === 0) return base;

  return fuse.search(query as unknown as Expression).map((r) => r.item);
}

export function getFilteredJobs(
  jobs: JobPreview[],
  keywords: string | null,
  category: string | null,
  company_name: string | null,
): JobPreview[] {
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
}
