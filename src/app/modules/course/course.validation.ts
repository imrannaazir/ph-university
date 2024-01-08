import { z } from 'zod';

const preRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    prefix: z.string().trim(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean(),
    preRequisites: z.array(preRequisiteValidationSchema).optional(),
  }),
});
