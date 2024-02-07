import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

export const semesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(SemesterRegistrationStatus as [string, ...string[]]),
    startDate: z.date(),
    endDate: z.date(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
