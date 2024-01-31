import { z } from 'zod';

export const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});
