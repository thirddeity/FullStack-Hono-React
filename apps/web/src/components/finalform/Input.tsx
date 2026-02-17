import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import type { ComponentPropsWithoutRef } from "react";
import { Field } from "react-final-form";
import { cn } from "@/lib/utils";
import type { FieldSubscription } from "final-form";

interface InputFFProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  isRequired?: boolean;
  subscription?: FieldSubscription;
}

export function InputFF({
  name,
  label,
  containerClassName,
  className,
  isRequired = false,
  subscription,
  ...props
}: InputFFProps) {
  return (
    <Field name={name} subscription={subscription}>
      {({ input, meta }) => {
        const isInvalid = meta.touched && meta.error;
        return (
          <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
            {label && (
              <Label
                htmlFor={name}
                className={cn(isInvalid && "text-danger", props.disabled && "opacity-70",)}
              >
                {label}
                {isRequired && <span className="text-danger">*</span>}
              </Label>
            )}

            <Input id={name} {...input} {...props} className={cn(isInvalid && "border-danger", className)} />
            {isInvalid && <p className="text-xs pl-1 font-thin text-danger">{meta.error}</p>}
          </div>
        );
      }}
    </Field>
  );
}
