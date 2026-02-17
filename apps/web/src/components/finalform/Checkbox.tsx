import type { ComponentPropsWithoutRef } from "react";
import { Checkbox } from "../ui/checkbox";
import type { FieldSubscription } from "final-form";
import { Field as ShadField, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Field } from "react-final-form";

interface CheckboxFFProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClassName?: string;
  className?: string;
  subscription?: FieldSubscription;
  orientation?: "horizontal" | "vertical" | "responsive";
  description?: string;
}

export function CheckboxFF({
  name,
  label,
  containerClassName,
  className,
  subscription,
  orientation = "horizontal",
  description,
  ...props
}: CheckboxFFProps) {
  return (
    <Field name={name} subscription={subscription}>
      {({ input, meta }) => {
        const isInvalid = meta.touched && meta.error;
        return (
          <FieldGroup className={containerClassName}>
            <ShadField orientation={orientation} data-invalid={isInvalid}>
              <Checkbox
                id={name}
                name={name}
                checked={input.checked}
                onCheckedChange={input.onChange}
                {...props}
                className={className}
              />
              <FieldContent>
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                {description && <FieldDescription>{description}</FieldDescription>}
              </FieldContent>
            </ShadField>
          </FieldGroup>
        );
      }}
    </Field>
  );
}
