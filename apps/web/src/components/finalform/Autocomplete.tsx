import { useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useField } from "react-final-form";
import { FieldLabel } from "../ui/field";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox";
import { cn } from "@/lib/utils";
import type { AutocompleteItemsFF } from "@/types/ui";

interface AutocompleteFFProps extends ComponentPropsWithoutRef<typeof Combobox> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  items: AutocompleteItemsFF[];
  isDisabled?: boolean;
  isRequired?: boolean;
  emptyContent?: ReactNode;
}

export function AutocompleteFF({
  name,
  label,
  containerClassName,
  placeholder,
  className,
  items,
  isRequired = false,
  isDisabled = false,
  emptyContent = <>No items</>,
  ...props
}: AutocompleteFFProps) {
  const { input, meta } = useField(name);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const selectedItem = items.find((item) => item.value === input.value);
    if (selectedItem) {
      setSearchValue(selectedItem.label);
    } else if (!input.value) {
      setSearchValue("");
    }
  }, [input.value, items]);

  const isInvalid = meta.touched && meta.error;

  const handleBlur = () => {
    input.onBlur();
    const currentSelectedItem = items.find((item) => item.value === input.value);
    setSearchValue(currentSelectedItem ? currentSelectedItem.label : searchValue);
  };

  return (
    <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
      <FieldLabel htmlFor={name} className={cn(isInvalid && "text-danger", props.disabled && "opacity-70")}>
        {label}
        {isRequired && <span className="text-danger">*</span>}
      </FieldLabel>
      <Combobox
        {...props}
        items={items}
        value={input.value}
        onValueChange={(v) => {
          console.log("onChange combobox =>", v);
          input.onChange(v);
        }}
        disabled={isDisabled}
      >
        <ComboboxInput
          id={name}
          value={searchValue}
          placeholder={placeholder}
          onChange={(e) => {
            const text = e.target.value;
            setSearchValue(text);
          }}
          className={cn(isInvalid && "border-danger", className)}
          onBlur={handleBlur}
          onFocus={() => input.onFocus()}
        />
        <ComboboxContent>
          <ComboboxEmpty>{emptyContent}</ComboboxEmpty>
          <ComboboxList>
            {(item: AutocompleteItemsFF) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {isInvalid && <p className="text-xs pl-1 font-thin text-danger">{meta.error}</p>}
    </div>
  );
}
