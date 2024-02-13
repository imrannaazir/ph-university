import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  /* 
    1. check token was sent
    2. check token is validate
    3. check user is exist
    4. check user is not deleted
    5. check user is not blocked
    6. check role is authorized

    */
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check token is available
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Access token is not sent.');
    }

    // check token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    // check user is exist
    const isUserExist = await User.findOne({ id: decoded.id });
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

    // check if jwt issued before password changed
    if (
      isUserExist.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        isUserExist.passwordChangedAt,
        decoded.iat as number
      ))
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User has not access.');
    }

    // check user role is authorized
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not authorized.');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
