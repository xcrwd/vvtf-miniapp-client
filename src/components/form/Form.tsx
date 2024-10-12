import { PropsWithChildren } from "react";

import type { KeyValue } from "../../common/types";

import { FormContext, type FormInstance } from "./useForm";

type FormProps<T extends KeyValue> = PropsWithChildren<{
  instance: FormInstance<T>;
}>;

export function Form<T extends KeyValue>({ instance, children }: FormProps<T>) {
  return (
    <FormContext.Provider value={instance as FormInstance}>
      {children}
    </FormContext.Provider>
  );
}
