import { ChangeEvent, useCallback } from "react";
import { Cell, Checkbox, Radio } from "@telegram-apps/telegram-ui";

import { arrayToggleValue, toArray } from "../../common/utils";
import type { InputProps } from "../../common/types";

type InputOptionProps = InputProps<string | string[]> & {
  multiple?: boolean;
  options: string[];
};

export function InputOption({
  multiple,
  options,
  value,
  onChange,
}: InputOptionProps) {
  const onChecked = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      onChange(
        multiple
          ? arrayToggleValue(
              toArray(value),
              evt.target.value,
              evt.target.checked,
            )
          : evt.target.value,
      );
    },
    [multiple, value, onChange],
  );

  const Option = multiple ? Checkbox : Radio;

  return (
    <>
      {options.map((opt) => {
        const checked = value ? value.includes(opt) : false;
        return (
          <Cell
            key={opt}
            Component="label"
            before={
              <Option value={opt} checked={checked} onChange={onChecked} />
            }
          >
            {opt}
          </Cell>
        );
      })}
    </>
  );
}
