/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLES } from './user.constant'

export type TUserRole = keyof typeof USER_ROLES
export type TStatus = 'active' | 'blocked'
export interface TUser {
  id: string
  password?: string
  // role: 'student' | 'faculty' | 'admin';
  role: TUserRole
  email: string
  status?: TStatus
  isDeleted?: boolean
  needsPasswordChange?: boolean
  passwordChangedAt?: Date
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    textPassword: string,
    hashedPassword: string
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number
  ): Promise<boolean>
}
