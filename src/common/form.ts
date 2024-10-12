import { isEmpty } from "./utils";
import type { KeyValue, TemplateField } from "./types";

export function validateForm(values: KeyValue, scheme: TemplateField[]) {
  return scheme.reduce((acc, field) => {
    return field.required && isEmpty(values[field.key]) ? false : acc;
  }, true);
}
