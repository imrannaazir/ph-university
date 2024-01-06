import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGender = 'Male' | 'Female' | 'Other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';
export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TFacultyName;
  designation: string;
  gender: TGender;
  dateOfBirth?: Date;
  contactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted: boolean;
  academicDepartment: Types.ObjectId;
};
