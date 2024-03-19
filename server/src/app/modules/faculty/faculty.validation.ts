import { z } from 'zod'
import { BloodGroups, FacultyGender } from './faculty.constant'

const createFacultyNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
})

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: createFacultyNameValidationSchema,
      contactNo: z.string(),
      academicDepartment: z.string(),
      designation: z.string(),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      dateOfBirth: z.string().optional(),
      profileImage: z.string().optional(),
      gender: z.enum([...FacultyGender] as [string, ...string[]]),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]),
    }),
  }),
})

// update validation schema
const updateFacultyNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: updateFacultyNameValidationSchema.optional(),
    contactNo: z.string().optional(),
    academicDepartment: z.string().optional(),
    designation: z.string().optional(),
    email: z.string().optional(),
    isDeleted: z.boolean().optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    user: z.string().optional(),
    dateOfBirth: z.string().optional(),
    profileImage: z.string().optional(),
    gender: z.enum([...FacultyGender] as [string, ...string[]]).optional(),
    bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]).optional(),
  }),
})
