import { ChangeEvent, useCallback } from "react";

import type { InputProps } from "../../common/types";
import { Input } from "@telegram-apps/telegram-ui";

type InputTextProps = InputProps<string> & {
  header?: string;
  placeholder?: string;
};

export function InputText({
  header,
  placeholder,
  valid,
  value,
  onChange,
}: InputTextProps) {
  const onInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => onChange(evt.target.value),
    [onChange],
  );

  return (
    <Input
      status={valid ? undefined : "error"}
      header={header}
      placeholder={placeholder}
      value={value || ""}
      onChange={onInputChange}
    />
  );
}
