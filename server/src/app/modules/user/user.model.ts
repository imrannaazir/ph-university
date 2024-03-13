/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../../config'
import { TUser, UserModel } from './user.interface'
import { UserRoles } from './user.constant'

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: UserRoles,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// encrypt password
userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.salt_rounds)
  )

  next()
})

// hide password
userSchema.post('save', async function (doc, next) {
  doc.set('password', undefined)
  next()
})

// static method for comparing password
userSchema.statics.isPasswordMatched = async function (
  textPassword,
  hashedPassword
) {
  return await bcrypt.compare(textPassword, hashedPassword)
}

// static method for checking is jwt issued before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  passwordChangedAt,
  jwtIssuedAt
) {
  const passwordChangedTime: number =
    new Date(passwordChangedAt).getTime() / 1000
  return passwordChangedTime > jwtIssuedAt
}

const User = model<TUser, UserModel>('user', userSchema)
export default User
