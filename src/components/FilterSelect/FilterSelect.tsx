import { Field, FieldLabel } from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

type FilterSelectProps = {
  id: string;
  className?: string;
  label: string;
  options: string[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  emptyValue?: string;
};

export const FilterSelect = ({
  id,
  className,
  label,
  options,
  value,
  onValueChange,
  placeholder,
  emptyValue,
}: FilterSelectProps) => {
  return (
    <Field className={cn(className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Combobox
        id={id}
        items={options}
        value={value}
        onValueChange={onValueChange}
        autoHighlight
      >
        <ComboboxInput placeholder={placeholder} showClear />
        <ComboboxContent>
          <ComboboxEmpty>{emptyValue}</ComboboxEmpty>
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
  );
};
