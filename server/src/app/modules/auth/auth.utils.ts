import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';

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
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

// hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, Number(config.salt_rounds));
};
