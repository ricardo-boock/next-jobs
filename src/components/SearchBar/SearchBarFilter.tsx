"use client";

import { RefObject, useRef } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ResetButton } from "./ResetButton";
import { type SearchBarFilterProps } from "./SearchBar.types";

export const SearchBarFilter = ({
  id,
  className,
  label,
  value,
  onValueChange,
  placeholder,
  showReset = true,
}: SearchBarFilterProps) => {
  const inputRef: RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  return (
    <Field className={cn(className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className={cn("relative")}>
        <Input
          ref={inputRef}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
        />
        {showReset && value && (
          <ResetButton
            onClick={() => {
              onValueChange("");
              inputRef.current?.focus();
            }}
          />
        )}
      </div>
    </Field>
  );
};
