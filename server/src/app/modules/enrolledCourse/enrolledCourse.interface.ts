import { Types } from 'mongoose';

export type TCourseMarks = {
  classTest1: string;
  midTerm: string;
  classTest2: string;
  finalTerm: string;
};

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'NA';

export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicRegistration: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  isEnrolled: boolean;
  courseMarks: TCourseMarks;
  grade: TGrade;
  gradePoint: number;
  isCompleted: boolean;
};
