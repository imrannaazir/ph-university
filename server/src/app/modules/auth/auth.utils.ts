import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

// generate token
export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });

  return token;
};

// verify token
export const verifyToken = async (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not authorized.');
  }
};

// hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.salt_rounds));
};
