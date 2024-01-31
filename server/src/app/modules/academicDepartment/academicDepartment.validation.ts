import { z } from 'zod';
export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().trim(),
    academicFaculty: z.string(),
  }),
});

export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    academicFaculty: z.string().optional(),
  }),
});
