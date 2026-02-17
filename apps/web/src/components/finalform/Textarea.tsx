import { Label } from "@/components/ui/label";
import type { ComponentPropsWithoutRef } from "react";
import { Field } from "react-final-form";
import { cn } from "@/lib/utils";
import type { FieldSubscription } from "final-form";
import { Textarea } from "../ui/textarea";

interface TextareaFFProps extends ComponentPropsWithoutRef<typeof Textarea> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  isRequired?: boolean;
  subscription?: FieldSubscription;
}

export function TextareaFF({
  name,
  label,
  containerClassName,
  className,
  isRequired = false,
  subscription,
  ...props
}: TextareaFFProps) {
  return (
    <Field name={name} subscription={subscription}>
      {({ input, meta }) => {
        const isInvalid = meta.touched && meta.error;
        return (
          <div className={cn("flex flex-col w-full gap-2", containerClassName)}>
            {label && (
              <Label htmlFor={name} className={cn(isInvalid && "text-danger", props.disabled && "opacity-70")}>
                {label}
                {isRequired && <span className="text-danger">*</span>}
              </Label>
            )}

            <Textarea id={name} {...input} {...props} className={cn(isInvalid && "border-danger", className)} />
            {isInvalid && <p className="text-xs pl-1 font-thin text-danger">{meta.error}</p>}
          </div>
        );
      }}
    </Field>
  );
}
