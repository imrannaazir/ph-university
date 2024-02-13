import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

// login user
const loginUser = async (payload: TLoginUser) => {
  /* 
 1. check user is exist
 2. check user is deleted
 3. check user is blocked
 4. check password is matched
 5. generate access token 
 6. send response
 */

  const { id, password } = payload;

  // check user is exist
  const isUserExist = await User.findOne({
    id,
  });

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
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password does not match.');
  }

  // generate JWT token

  const jwtPayload = {
    id: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_expires_in as string,
  });
  return {
    accessToken,
    needsPasswordChanged: isUserExist.needsPasswordChange,
  };
};

const AuthService = {
  loginUser,
};

export default AuthService;
