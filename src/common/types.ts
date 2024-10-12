import type { FC } from "react";

export type KeyValue<T = unknown> = Record<string, T>;

export type Template = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  form: TemplateField[];
};

export type TemplateField = TextField | OptionField;

export type TextField = BaseTemplateField<"text"> & {
  lines?: number;
};

export type SingleOptionField = BaseTemplateField<"option"> & {
  multiple?: false;
};

export type MultiOptionField = BaseTemplateField<"option", string[]> & {
  multiple: true;
};

export type OptionField = (SingleOptionField | MultiOptionField) & {
  options: string[];
  freeOption?: boolean;
};

export type BaseTemplateField<T extends string, V = string> = {
  type: T;
  key: string;
  title?: string;
  subtitle?: string;
  required?: boolean;
  placeholder?: string;

  __valueType: V;
};

export type FieldType = TemplateField["type"];

export type FieldProps<T extends TemplateField> = {
  field: T;
};

type ExtractByType<T, U> = T extends { type: unknown }
  ? U extends T["type"]
    ? T
    : never
  : never;

export type FieldComponent<T extends FieldType> = FC<
  FieldProps<ExtractByType<TemplateField, T>>
>;

export type FieldComponentMap = {
  [T in FieldType]: FieldComponent<T>;
};

export type InputProps<T> = {
  value?: T;
  onChange: (value?: T) => void;
};