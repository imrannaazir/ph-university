import { Schema, model } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { Grades } from './enrolledCourse.constant';

const courseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      default: 0,
      min: 0,
      max: 30,
    },
    classTest2: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    finalTerm: {
      type: Number,
      default: 0,
      min: 0,
      max: 50,
    },
  },
  { _id: false }
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'course',
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'faculty',
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'offeredCourse',
    },
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'semesterRegistration',
    },
    courseMarks: {
      type: courseMarksSchema,
      default: {},
    },
    grade: {
      type: String,
      enum: Grades,
      default: 'NA',
    },
    gradePoint: {
      type: Number,
      default: 0,
      min: 0,
      max: 4,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EnrolledCourse = model<TEnrolledCourse>(
  'enrolledCourse',
  enrolledCourseSchema
);
export default EnrolledCourse;
