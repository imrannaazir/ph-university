import { Types } from 'mongoose';

export type TAdminName = {
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

export type TAdmin = {
  id?: string;
  user: Types.ObjectId;
  name: TAdminName;
  gender: TGender;
  email: string;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo?: string;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: boolean;
};
