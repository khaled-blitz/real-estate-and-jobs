/* eslint-disable @typescript-eslint/no-explicit-any */
export const AllowedTypes = {
  varchar: "string",
  image: "file",
  text: "string",
  object: "string",
  date: "string",
  boolean: "boolean",
  currency: "number",
  enum: "enum",
  percentage: "number",
  tinyint: "number",
  int: "number",
  float: "number",
  double: "number",
  youtube: "string",
  phone: "string",
  url: "string",
  email: "string",
  "[image]": "file",
};

export interface InputType {
  key: string;
  label: string | React.ReactNode;
  description?: string;
  options?: any[];
  required?: boolean;
  multiple?: boolean;
  custom?: boolean;
  maxLength?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxSize?: number;
}

export interface Props {
  input: Record<string, any>;
  item: InputType;
  onChange: (value: any) => void;
  onSelect?: (value: any) => void;
  value?: any;
}
