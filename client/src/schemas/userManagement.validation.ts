import { z } from "zod";
import { Gender } from "../constant/userManagement.constant";

//validation schema for creating
export const studentNameValidationSchema = z.object({
  firstName: z.string().trim().max(20),
  lastName: z.string().trim().max(20),
  middleName: z.string().trim().max(20),
});

export const studentGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

export const studentLocalGuardianValidationSchema = z.object({
  name: z.string(),
  address: z.string(),
  contactNo: z.string(),
  occupation: z.string(),
});

export const createStudentValidationSchema = z.object({
  name: studentNameValidationSchema,
  email: z.string().email(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  image: z.any().optional(),

  contactNo: z.string(),
  emergencyContact: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),

  guardian: studentGuardianValidationSchema,
  localGuardian: studentLocalGuardianValidationSchema.optional(),
  admissionSemester: z.string(),
  academicDepartment: z.string(),
});