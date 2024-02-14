import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser, TPasswordData } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { generateToken, hashPassword, verifyToken } from './auth.utils';
import { TEmailPayload } from '../../interface/interface';
import sendEmail from '../../utils/sendEmail';

// login user
const loginUser = async (payload: TLoginUser) => {
  /* 
 1. check user is exist
 2. check user is deleted
 3. check user is blocked
 4. check password is matched
 5. generate access token & refresh token
 6. send response
 */

  const { id, password } = payload;

  // check user is exist
  const isUserExist = await User.findOne({
    id,
  }).select('+password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not founded.');
  }

  // check user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user has been deleted.');
  }

  // check user is blocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked.');
  }

  // compare password

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match.');
  }

  // generate JWT token
  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };

  // access token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string
  );

  // refresh token
  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChanged: isUserExist.needsPasswordChange,
  };
};

// change password
const changePassword = async (userData: JwtPayload, payload: TPasswordData) => {
  /* 
 1. check user is exist
 2. check user is deleted
 3. check user is blocked
 4. check password is matched
 5. check password matched
 6. hash password
 7. send response
 */

  // check user is exist
  const isUserExist = await User.findOne({ id: userData.id }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found.');
  }

  // check user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is deleted.');
  }

  //check user is blocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is blocked');
  }

  // check password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not match.');
  }

  // hash password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_rounds)
  );

  await User.findOneAndUpdate(
    { id: isUserExist.id },
    {
      password: hashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

// generate refresh token
const refreshToken = async (token: string) => {
  /* 
  1. verify token;
  2. check if the user exist
  3. check if user is blocked
  4. check if user is deleted
  5. check jwt token issued before password change
  6. generate access token
  */

  // verify refresh token
  const decoded = verifyToken(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  // check is user exist
  const isUserExist = await User.findOne({ id: decoded.id });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found.');
  }

  // check user is blocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User has been blocked.');
  }

  //  check is user deleted
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User has been deleted.');
  }

  // check is jwt issued before password changed
  if (
    isUserExist.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChanged(
      isUserExist.passwordChangedAt,
      decoded.iat as number
    ))
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not authorized.');
  }

  // generate access token
  const jwtPayload = { id: isUserExist.id, role: isUserExist.role };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string
  );

  return { accessToken };
};

// forget password
const forgetPassword = async (userId: string) => {
  /* 
  1. check user is exist
  2. check user is deleted
  3. check user is blocked
  4. 
  */

  // check user is exist
  const isUserExist = await User.findOne({ id: userId });
  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not founded.');
  }

  // check user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted.');
  }

  // check user is blocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked.');
  }

  // generate reset token
  const jwtPayload: JwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };
  const resetToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );

  // resent link
  const resetLink = `${config.client_url}?userId:${isUserExist.id}&token=${resetToken}`;
  const emailPayload: TEmailPayload = {
    html: resetLink,
    receiver: isUserExist.email,
    subject: 'Reset your password.',
  };

  sendEmail(emailPayload);

  return null;
};

// reset password
const resetPassword = async (payload: {
  userId: string;
  token: string;
  newPassword: string;
}) => {
  const { userId, token, newPassword } = payload;
  // check user is exist
  const isUserExist = await User.findOne({
    id: userId,
  });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not founded.');
  }

  // check if user is deleted
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is deleted.');
  }

  // check is user is blocked
  if (isUserExist.status === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked.');
  }

  // verify token
  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string
  ) as JwtPayload;

  // check is decoded user id and db user id is same
  if (decoded.id !== isUserExist.id) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Your are forbidden.');
  }

  // hash password
  const hashedPassword = await hashPassword(newPassword);
  await User.findByIdAndUpdate(isUserExist._id, {
    password: hashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  });

  return null;
};
const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};

export default AuthService;
