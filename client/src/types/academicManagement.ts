import React from "react";

export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemesterName = "Autumn" | "Summer" | "Fall";

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code?: string;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
  semesterCode?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TAcademicFaculty = {
  _id?: string;
  name: string;
  __v?: number;
};

export type TAcademicSemesterTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};
