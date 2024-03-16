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
};
