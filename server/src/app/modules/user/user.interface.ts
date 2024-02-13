/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLES } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
  needsPasswordChange: boolean;
}

export type TUserRole = keyof typeof USER_ROLES;

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    textPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
