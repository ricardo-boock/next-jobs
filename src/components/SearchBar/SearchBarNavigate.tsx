"use client";

import { useRouter } from "next/navigation";
import { FormEvent, RefObject, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResetButton } from "./ResetButton";
import { type SearchBarNavigateProps } from "./SearchBar.types";

export const SearchBarNavigate = ({
  className,
  searchParam = "keywords",
  placeholder = "Search keywords...",
  targetUrl,
  showReset = true,
}: SearchBarNavigateProps) => {
  const inputRef: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const next: string = value.trim();
    const params = new URLSearchParams();
    if (next) params.set(searchParam, next);

    const url: string = params.toString()
      ? `${targetUrl}?${params.toString()}`
      : targetUrl;
    router.push(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field
        className={cn("mt-7 max-w-[70ch] mx-auto", className)}
        orientation={"horizontal"}
      >
        <div className={cn("relative flex-1")}>
          <Input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
          />
          {showReset && value && (
            <ResetButton
              onClick={() => {
                setValue("");
                inputRef.current?.focus();
              }}
            />
          )}
        </div>

        <Button type="submit">Search</Button>
      </Field>
    </form>
  );
};
