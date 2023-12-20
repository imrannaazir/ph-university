import { z } from 'zod';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constants';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    semesterCode: z.enum([...semesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});
