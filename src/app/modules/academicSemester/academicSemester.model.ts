import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterName,
      required: [true, 'Semester name is required'],
    },
    semesterCode: {
      type: String,
      enum: semesterCode,
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    startMonth: {
      type: String,
      enum: months,
      required: [true, 'Start month is required'],
    },
    endMonth: {
      type: String,
      enum: months,
      required: [true, 'End month is required'],
    },
  },
  { timestamps: true }
);

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
