"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SearchKey =
  | "keywords"
  | "category"
  | "company_name"
  | "sort"
  | "page";

export type SortValue = "newest" | "oldest" | "title";

export type SearchUpdate = Partial<Record<SearchKey, string | null>> & {
  sort?: SortValue | null;
};

export function useURLFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = (data: SearchUpdate): void => {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of Object.keys(data) as SearchKey[]) {
      const value = data[key];

      params.delete(key);

      if (value) {
        params.set(key, value);
      }
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const reset = (): void => {
    router.replace(pathname);
  };

  return {
    params: searchParams,
    update,
    reset,
  };
}
