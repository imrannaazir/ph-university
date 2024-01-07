import { z } from 'zod';
import { BloodGroups, FacultyGender } from './faculty.constant';

const facultyNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      id: z.string(),
      name: facultyNameValidationSchema,
      contactNo: z.string(),
      academicDepartment: z.string(),
      designation: z.string(),
      isDeleted: z.boolean(),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      user: z.string(),
      dateOfBirth: z.string().optional(),
      profileImage: z.string().optional(),
      gender: z.enum([...FacultyGender] as [string, ...string[]]),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]),
    }),
  }),
});
