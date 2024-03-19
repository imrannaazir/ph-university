import { TSelectOptions } from "../types";

export const Gender = ["Male", "Female", "Other"] as const;

export const genderOptions: TSelectOptions = Gender.map((item) => ({
  label: item,
  value: item,
}));
