import { ChangeEvent, useCallback, useState } from "react";
import { List, Cell, Checkbox, Radio, Input } from "@telegram-apps/telegram-ui";

import { arrayToggleValue, toArray } from "../../common/utils";
import type { InputProps } from "../../common/types";

type InputOptionProps = InputProps<string | string[]> & {
  placeholder?: string;
  multiple?: boolean;
  options: string[];
  freeOption?: boolean | string;
};

export function InputOption({
  placeholder,
  multiple,
  options,
  freeOption,
  value,
  onChange,
}: InputOptionProps) {
  const [otherValue, setOtherValue] = useState("");

  const normValue = toArray(value);

  const otherLabel = freeOption
    ? typeof freeOption === "string"
      ? freeOption
      : "Other"
    : "";

  const otherPrefix = otherLabel + ": ";

  const otherOption = otherPrefix + otherValue;

  const onChecked = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const next = multiple
        ? arrayToggleValue(normValue, evt.target.value, evt.target.checked)
        : evt.target.value;
      onChange(next);
    },
    [multiple, normValue, onChange],
  );

  const onOtherChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setOtherValue(evt.target.value);

      const otherOption = otherPrefix + evt.target.value;

      if (multiple) {
        const idx = normValue.findIndex((opt) => opt.startsWith(otherPrefix));
        if (idx < 0) normValue.push(otherOption);
        else normValue[idx] = otherOption;
        onChange(normValue);
      } else {
        onChange(otherOption);
      }
    },
    [multiple, otherPrefix, normValue, onChange],
  );

  const Ctrl = multiple ? Checkbox : Radio;

  return (
    <List>
      {options.map((option) => (
        <Cell
          key={option}
          Component="label"
          after={
            <Ctrl
              value={option}
              checked={normValue.includes(option)}
              onChange={onChecked}
            />
          }
        >
          {option}
        </Cell>
      ))}
      {otherLabel && (
        <>
          <Cell
            Component="label"
            after={
              <Ctrl
                value={otherOption}
                checked={normValue.includes(otherOption)}
                onChange={onChecked}
              />
            }
          >
            {otherLabel}
          </Cell>
          <Input
            header={otherLabel}
            placeholder={placeholder}
            value={otherValue}
            onChange={onOtherChange}
          />
        </>
      )}
    </List>
  );
}
