import { createContext, useCallback, useContext, useState } from "react";

import type { KeyValue } from "../../common/types";

export type FormInstance<T extends KeyValue = KeyValue> = {
  values: T;
  getFieldValue: <K extends keyof T>(field: K) => T[K] | undefined;
  setFieldValue: <K extends keyof T>(field: K, value?: T[K]) => void;
};

export function useForm<T extends KeyValue>(
  defaultValues: T = {} as T,
): FormInstance<T> {
  const [values, setValues] = useState(defaultValues);

  const getFieldValue = useCallback(
    <K extends keyof T>(field: K) => values[field],
    [values],
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value?: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    values,
    getFieldValue,
    setFieldValue,
  };
}

export const FormContext = createContext<FormInstance | undefined>(undefined);

export function useFormInstance<T extends KeyValue>() {
  const ctx = useContext(FormContext);

  if (!ctx) throw new Error("No context provided");

  return ctx as FormInstance<T>;
}
