import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema
);
export default AcademicDepartment;
