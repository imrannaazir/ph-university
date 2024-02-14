import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.service';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

// login user
const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const { accessToken, refreshToken, needsPasswordChanged } =
    await AuthService.loginUser(payload);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully.',
    data: { accessToken, needsPasswordChanged },
  });
});

// change password
const changePassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.changePassword(
    req.user as JwtPayload,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password has been changed successfully.',
    data: result,
  });
});

//  refresh token
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;

  const result = await AuthService.refreshToken(token as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'New access token retrieved successfully.',
    data: result,
  });
});

// forget password
const forgetPassword = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const result = await AuthService.forgetPassword(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Reset token sent to you email successfully.',
    data: result,
  });
});
const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};

export default AuthController;
