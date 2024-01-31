import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  months,
  semesterCode,
  semesterName,
} from './academicSemester.constants';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

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

academicSemesterSchema.pre('save', async function (next) {
  const existingAcademicSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (existingAcademicSemester) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Academic semester already exist!'
    );
  }

  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema
);

export default AcademicSemester;
