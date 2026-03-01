import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortOptions = "newest" | "oldest" | "title";

export function Sort({
  value,
  onChange,
}: {
  value: SortOptions;
  onChange: (value: SortOptions) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as never)}>
      <SelectTrigger className={cn("w-full")}>
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
