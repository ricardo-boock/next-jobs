"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { JobPreview } from "@/types/remotive";

export const Filter = ({
  jobs,
  onSubmit,
}: {
  jobs: JobPreview[];
  onSubmit: (filteredJobs: JobPreview[]) => void;
}) => {
  const categories = Array.from(
    new Set(jobs.map((job) => job.category)),
  ).sort();
  const companies = Array.from(
    new Set(jobs.map((job) => job.company_name)),
  ).sort();

  const [filteredJobs, setFilteredJobs] = useState<JobPreview[]>(jobs);
  const [filter, setFilter] = useState<{
    category: string | null;
    company_name: string | null;
  }>({
    category: null,
    company_name: null,
  });

  const handleOnSubmit = () => {
    const filtered = jobs.filter((job) => {
      if (filter.category && filter.category !== job.category) {
        return false;
      }

      if (filter.company_name && filter.company_name !== job.company_name) {
        return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
    onSubmit(filtered);
  };

  const handleOnReset = () => {
    setFilter({ category: null, company_name: null });
    setFilteredJobs(jobs);
    onSubmit(jobs);
  };

  return (
    <>
      <FieldGroup>
        <h2 className={cn("text-xl font-bold")}>Filters</h2>

        <Field>
          <FieldLabel htmlFor="keyword">Keyword</FieldLabel>
          <Input
            id="keyword"
            type="text"
            placeholder="eg. Frontend, React..."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Combobox
            items={categories}
            value={filter.category ?? ""}
            onValueChange={(value) => {
              setFilter({
                ...filter,
                category: value ? (value as string) : null,
              });
            }}
            autoHighlight
          >
            <ComboboxInput placeholder="All categories" showClear />
            <ComboboxContent>
              <ComboboxEmpty>No categories found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className={cn("cursor-pointer")}
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>

        <Field>
          <FieldLabel htmlFor="company">Company</FieldLabel>
          <Combobox
            items={companies}
            value={filter.company_name ?? ""}
            onValueChange={(value) => {
              setFilter({
                ...filter,
                company_name: value ? (value as string) : null,
              });
            }}
            autoHighlight
          >
            <ComboboxInput placeholder="Company name..." showClear />
            <ComboboxContent>
              <ComboboxEmpty>No companies found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className={cn("cursor-pointer")}
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>

        <Field>
          <Button onClick={handleOnSubmit}>Apply Filters</Button>
          <Button variant="outline" onClick={handleOnReset}>
            Reset
          </Button>
        </Field>
      </FieldGroup>
    </>
  );
};
