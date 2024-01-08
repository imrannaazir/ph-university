import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisite } from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisite>({
  course: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisites: {
    type: preRequisiteCourseSchema,
  },
});

const Course = model<TCourse>('Course', courseSchema);
export default Course;
