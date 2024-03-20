export interface TName {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface TGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface TLocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
}

export interface TStudent {
  name: TName;
  email: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;

  contactNo: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;

  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: string;
  academicDepartment: string;
}

export type TFaculty = {
  id: string;
  name: TName;
  designation: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  contactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: boolean;
  academicDepartment: string;
  academicFaculty: string;
};
