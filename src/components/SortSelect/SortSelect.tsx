import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SORT_OPTIONS = ["newest", "oldest", "title"] as const;
export type SortSelectOptions = (typeof SORT_OPTIONS)[number];

type SortSelectProps = {
  value: SortSelectOptions;
  onChange: (value: SortSelectOptions) => void;
};

function isSortOption(value: string): value is SortSelectOptions {
  return SORT_OPTIONS.includes(value as SortSelectOptions);
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => {
        if (isSortOption(v)) onChange(v);
      }}
    >
      <SelectTrigger aria-label="Sort jobs" className={cn("w-[15ch]")}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup defaultValue={"newest"}>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="title">Title (A-Z)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
