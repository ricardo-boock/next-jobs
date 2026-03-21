"use client";

import { SubmitEventHandler, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { SearchBarFilter } from "@/components/SearchBar/SearchBarFilter";
import { FilterSelect } from "@/components/FilterSelect/FilterSelect";
import { useURLFilters } from "@/hooks/useURLFilters";
import { FilterJobsProps } from "./FilterJobs.types";

export const FilterJobs = ({ jobs, onApplied }: FilterJobsProps) => {
  const { params, update } = useURLFilters();

  const [filter, setFilter] = useState<{
    keywords: string;
    category: string | null;
    company_name: string | null;
  }>({
    keywords: params.get("keywords") ?? "",
    category: params.get("category") ?? null,
    company_name: params.get("company_name") ?? null,
  });

  const filterOptions: { categories: string[]; companies: string[] } = useMemo(
    () => ({
      categories: Array.from(new Set(jobs.map((job) => job.category))).sort(),
      companies: Array.from(
        new Set(jobs.map((job) => job.company_name)),
      ).sort(),
    }),
    [jobs],
  );

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    update({ ...filter, page: "1" });
    onApplied?.();
  };

  const handleReset = () => {
    const nextFilter = { keywords: "", category: null, company_name: null };
    setFilter(nextFilter);
    update({ ...nextFilter, page: "1" });
    onApplied?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <SearchBarFilter
          id="keywords"
          label="Keywords"
          value={filter.keywords}
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, keywords: value }))
          }
          placeholder="eg. Frontend, React..."
        />
        <FilterSelect
          id="category"
          label="Category"
          options={filterOptions.categories}
          value={filter.category}
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, category: value }))
          }
          placeholder="All categories"
          emptyValue="No categories found."
        />
        <FilterSelect
          id="company_name"
          label="Company name"
          options={filterOptions.companies}
          value={filter.company_name}
          onValueChange={(value) =>
            setFilter((prev) => ({ ...prev, company_name: value }))
          }
          placeholder="All companies"
          emptyValue="No companies found."
        />
        <Field>
          <Button type="submit">Apply filters</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset filters
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
