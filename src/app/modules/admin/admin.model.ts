import { Schema, model } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';
import { BloodGroups, FacultyGender } from '../faculty/faculty.constant';
const adminNameSchema = new Schema<TAdminName>({
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
});

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    bloodGroup: {
      type: String,
      enum: BloodGroups,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: FacultyGender,
    },
    contactNo: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    emergencyContactNo: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    name: {
      type: adminNameSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = model<TAdmin>('admin', adminSchema);
export default Admin;
