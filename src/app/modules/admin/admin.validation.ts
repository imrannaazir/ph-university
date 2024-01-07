import { z } from 'zod';
import { BloodGroups, FacultyGender } from '../faculty/faculty.constant';

const crateAdminNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      id: z.string().optional(),
      email: z.string().email(),
      name: crateAdminNameValidationSchema,
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]),
      contactNo: z.string(),
      gender: z.enum([...FacultyGender] as [string, ...string[]]),
      permanentAddress: z.string().optional(),
      presentAddress: z.string(),
      user: z.string().optional(),
      dateOfBirth: z.date().optional(),
      emergencyContactNo: z.string().optional(),
      isDeleted: z.boolean().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateAdminNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    email: z.string().email().optional(),
    name: updateAdminNameValidationSchema.optional(),
    bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    gender: z.enum([...FacultyGender] as [string, ...string[]]).optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    user: z.string().optional(),
    dateOfBirth: z.date().optional(),
    emergencyContactNo: z.string().optional(),
    isDeleted: z.boolean().optional(),
    profileImage: z.string().optional(),
  }),
});
