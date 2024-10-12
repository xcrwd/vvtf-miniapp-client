import type { FieldProps, TextField } from "../../common/types";

import { FormItem } from "../form/FormItem";
import { InputText } from "../inputs/InputText";

export function FieldText({ field }: FieldProps<TextField>) {
  return (
    <FormItem field={field}>
      {(input) => <InputText value={input.value} onChange={input.onChange} />}
    </FormItem>
  );
}
