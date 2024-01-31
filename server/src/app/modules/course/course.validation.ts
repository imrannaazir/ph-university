import { z } from 'zod';

const preRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim(),
    prefix: z.string().trim(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisites: z.array(preRequisiteValidationSchema).optional(),
  }),
});

export const updateCourseValidationSchema = z.object({
  title: z.string().trim().optional(),
  prefix: z.string().trim().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  isDeleted: z.boolean().optional(),
  preRequisites: z.array(preRequisiteValidationSchema).optional(),
});
