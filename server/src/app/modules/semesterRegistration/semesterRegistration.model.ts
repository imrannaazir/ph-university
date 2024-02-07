import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'academicSemester',
    required: true,
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit: {
    type: Number,
    default: 3,
  },
  maxCredit: {
    type: Number,
    default: 15,
  },
});

const SemesterRegistration = model<TSemesterRegistration>(
  'semesterRegistration',
  semesterRegistrationSchema
);
export default SemesterRegistration;
