import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

export const semesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(SemesterRegistrationStatus as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});
