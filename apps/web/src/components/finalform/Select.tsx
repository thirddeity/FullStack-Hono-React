import { cn } from "@/lib/utils";
import { Field } from "react-final-form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ComponentPropsWithoutRef } from "react";
import type { SelectItemFF } from "@/types/ui";

interface SelectFFProps extends ComponentPropsWithoutRef<typeof Select> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  items: SelectItemFF[];
  isRequired?: boolean;
}

export function SelectFF({ name, label, containerClassName, placeholder, className, items, isRequired, ...props }: SelectFFProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const isInvalid = meta.touched && meta.error;
        return (
          <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
            {label && (
              <Label htmlFor={name} className={cn(isInvalid && "text-danger", props.disabled && "opacity-70")}>
                {label} {isRequired && (<span className="text-danger">*</span>)}
              </Label>
            )}
            <Select
              id={name}
              {...props}
              {...input}
              items={items}
              defaultValue={input.value !== "" ? input.value : undefined}
              onValueChange={input.onChange}
              disabled={props.disabled}
            >
              <SelectTrigger id={name} className={cn("w-auto", className, isInvalid && "border-danger")}>
                <SelectValue>{input.value || placeholder}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {isInvalid && <p className="text-xs pl-1 font-thin text-danger">{meta.error}</p>}
          </div>
        );
      }}
    </Field>
  );
}
