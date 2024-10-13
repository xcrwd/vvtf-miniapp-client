import { ChangeEvent, useCallback } from "react";

import type { InputProps } from "../../common/types";
import { Input, Textarea } from "@telegram-apps/telegram-ui";

type InputTextProps = InputProps<string> & {
  header?: string;
  placeholder?: string;
  multiline?: boolean;
};

export function InputText({
  header,
  placeholder,
  multiline,
  valid,
  value,
  onChange,
}: InputTextProps) {
  const onInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => onChange(evt.target.value),
    [onChange],
  );

  const Ctrl = multiline ? Textarea : Input;

  return (
    <Ctrl
      status={valid ? undefined : "error"}
      header={header}
      placeholder={placeholder}
      value={value || ""}
      onChange={onInputChange}
    />
  );
}
