/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
  needsPasswordChange: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    textPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
