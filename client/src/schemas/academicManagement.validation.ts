import { z } from "zod";
import { months } from "../constant/academicManagement.constant";

export const academicSemesterValidationSchema = z.object({
  name: z.string({
    required_error: "Please select a name.",
  }),
  endMonth: z.enum(months as [string, ...string[]], {
    required_error: "Please select a month.",
  }),
  startMonth: z.enum(months as [string, ...string[]], {
    required_error: "Please select a month.",
  }),
  year: z.string({ required_error: "Please select a year." }),
});

export const academicFacultyValidationSchema = z.object({
  name: z.string({ required_error: "Please inter faculty name." }),
});
