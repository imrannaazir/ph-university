import { z } from 'zod'

//validation schema for creating
export const studentNameValidationSchema = z.object({
  firstName: z.string().trim().max(20),
  lastName: z.string().trim().max(20),
  middleName: z.string().trim().max(20),
})

export const studentGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

export const studentLocalGuardianValidationSchema = z.object({
  name: z.string(),
  address: z.string(),
  contactNo: z.string(),
  occupation: z.string(),
})

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: studentNameValidationSchema,
      email: z.string().email(),
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string(),
      contactNo: z.string(),
      emergencyContact: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: studentGuardianValidationSchema,
      localGuardian: studentLocalGuardianValidationSchema.optional(),
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
})

// validation schema for updating

export const updateStudentNameValidationSchema = z.object({
  firstName: z.string().trim().max(20).optional(),
  lastName: z.string().trim().max(20).optional(),
  middleName: z.string().trim().max(20).optional(),
})

export const updateStudentGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
})

export const updateStudentLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contactNo: z.string().optional(),
  occupation: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    name: updateStudentNameValidationSchema.optional(),
    email: z.string().email().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContact: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: updateStudentGuardianValidationSchema.optional(),
    localGuardian: updateStudentLocalGuardianValidationSchema
      .optional()
      .optional(),
    profileImage: z.string().optional(),
    admissionSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
})
