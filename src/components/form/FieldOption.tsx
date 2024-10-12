import type { FieldProps, OptionField } from "../../common/types";

import { FormItem } from "../form/FormItem";
import { InputOption } from "../inputs/InputOption";

export function FieldOption({ field }: FieldProps<OptionField>) {
  return (
    <FormItem field={field}>
      {(input) => (
        <InputOption
          multiple={field.multiple}
          options={field.options}
          value={input.value}
          onChange={input.onChange}
          valid={input.valid}
        />
      )}
    </FormItem>
  );
}
