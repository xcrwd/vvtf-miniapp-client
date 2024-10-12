import { ReactNode, useCallback } from "react";

import { Title } from "@telegram-apps/telegram-ui";

import type { InputProps, TemplateField } from "../../common/types";
import { useFormInstance } from "./useForm";

type FormItemProps<T extends TemplateField> = {
  field: T;
  children: (input: InputProps<T["__valueType"]>) => ReactNode;
};

export function FormItem<T extends TemplateField>({
  field,
  children,
}: FormItemProps<T>) {
  const form = useFormInstance();

  const itemValue = form.getFieldValue(field.key) as T["__valueType"];

  const onItemChange = useCallback(
    (value?: T["__valueType"]) => {
      form.setFieldValue(field.key, value);
    },
    [field, form],
  );

  return (
    <div>
      <Title level="3">{field.title}</Title>
      {children({ value: itemValue, onChange: onItemChange })}
    </div>
  );
}
