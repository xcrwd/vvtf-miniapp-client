import type { FieldProps, TextField } from "../../common/types";

import { FormItem } from "../form/FormItem";
import { InputText } from "../inputs/InputText";

export function FieldText({ field }: FieldProps<TextField>) {
  return (
    <FormItem field={field}>
      {(input) => (
        <InputText
          header={field.key}
          placeholder={field.placeholder || "Your answer"}
          multiline={field.multiline}
          value={input.value}
          onChange={input.onChange}
          valid={input.valid}
        />
      )}
    </FormItem>
  );
}
