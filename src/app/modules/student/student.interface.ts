import { Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContact?: string;
  presentAddress: string;
  permanentAddress?: string;
  guardian: TGuardian;
  localGuardian?: TLocalGuardian;
  profileImage?: string;
  isDeleted?: boolean;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
};
