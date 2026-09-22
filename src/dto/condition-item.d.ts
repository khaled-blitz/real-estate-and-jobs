import { TAdItem, TFeaturesList } from "./ad-item";

export type ComparisonOperator =
  | "="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "IN"
  | "CONTAINS";

export type TCondition = [
  keyof TAdItem | TFeaturesList,
  ComparisonOperator,
  unknown
];
