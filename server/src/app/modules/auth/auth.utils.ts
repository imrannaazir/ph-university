import jwt, { JwtPayload } from 'jsonwebtoken';

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
