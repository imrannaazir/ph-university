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

export const AllFacultyDesignations = [
  "Professor",
  "Associate_Professor",
  "Assistant_Professor",
  "Lecturer",
  "Adjunct_Professor",
  "Visiting_Professor",
  "Research_Professor",
  "Instructor",
  "Dean",
  "Chairperson",
  "Emeritus_Professor",
  "Clinical_Professor",
  "Distinguished_Professor",
  "Endowed_Chair",
  "Research_Scientist",
  "Postdoctoral_Fellow",
  "Graduate_Assistant",
  "Teaching_Assistant",
  "Lab_Manager",
  "Research_Assistant",
  "Visiting_Scholar",
];

export const designationOptions: TSelectOptions = AllFacultyDesignations.map(
  (item) => ({
    label: item.split("_").join(" "),
    value: item,
  })
);
