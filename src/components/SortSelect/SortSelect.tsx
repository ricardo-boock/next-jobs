import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortSelectOptions = "newest" | "oldest" | "title";

type SortSelectProps = {
  value: SortSelectOptions;
  onChange: (value: SortSelectOptions) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as never)}>
      <SelectTrigger className={cn("w-[15ch]")}>
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
