import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: {
    type: String,
    unique: true,
    trim: true,
  },
});

const AcademicFaculty = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema
);
export default AcademicFaculty;
