import type {
  FieldComponent,
  FieldComponentMap,
  FieldProps,
  FieldType,
  TemplateField,
} from "../common/types";

import { FieldText } from "./form/FieldText";
import { FieldOption } from "./form/FieldOption";

const FieldsMap: FieldComponentMap = {
  text: FieldText,
  option: FieldOption,
};

export function VTField({ field }: FieldProps<TemplateField>) {
  const Field = FieldsMap[field.type] as FieldComponent<FieldType>;

  if (!Field) return <div>Unknown field type</div>;

  return <Field field={field} />;
}
