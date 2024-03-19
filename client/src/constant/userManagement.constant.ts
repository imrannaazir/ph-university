import { TSelectOptions } from "../types";

export const Gender = ["Male", "Female", "Other"] as const;

export const genderOptions: TSelectOptions = Gender.map((item) => ({
  label: item,
  value: item,
}));

export const BloodGroups: string[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const bloodGroupOptions: TSelectOptions = BloodGroups.map((item) => ({
  label: item,
  value: item,
}));
