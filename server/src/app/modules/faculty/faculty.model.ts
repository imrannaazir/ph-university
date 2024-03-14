import { Schema, model } from 'mongoose'
import { TFaculty, TFacultyName } from './faculty.interface'
import { BloodGroups, FacultyGender } from './faculty.constant'

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
})

const facultySchema = new Schema<TFaculty>(
  {
    name: {
      type: facultyNameSchema,
      required: true,
    },
    id: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
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
    contactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: FacultyGender,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroups,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    designation: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Faculty = model<TFaculty>('faculty', facultySchema)

export default Faculty
