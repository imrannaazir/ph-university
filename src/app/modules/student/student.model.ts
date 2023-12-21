import { Schema, Types, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from './student.interface';
import User from '../user/user.model';
import AcademicSemester from '../academicSemester/academicSemester.model';

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    max: [20, 'First name can not contain more than 20 chars'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    max: [20, 'Last name can not contain more than 20 chars'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact no is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact no is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name of local guardian is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Occupation of local guardian is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact no of local guardian is required'],
  },
  address: {
    type: String,
    required: [true, 'Address of local guardian is required'],
  },
});
const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: User,
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact no is required'],
    },
    emergencyContact: {
      type: String,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    academicSemester: {
      type: Types.ObjectId,
      ref: AcademicSemester,
    },
  },
  { timestamps: true }
);

const Student = model<TStudent>('student', studentSchema);
export default Student;
