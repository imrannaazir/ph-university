import { z } from 'zod';
import { Days, StaticDate } from './offeredCourse.constant';

const timeStringSchema = z.string().refine((time) => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
  return regex.test(time);
});
export const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(Days as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`${StaticDate}${body.startTime}:00`);
        const end = new Date(`${StaticDate}${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before end time.',
      }
    ),
});

export const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum(Days as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`${StaticDate}${body.startTime}:00`);
        const end = new Date(`${StaticDate}${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'Start time should be before end time.',
      }
    ),
});
