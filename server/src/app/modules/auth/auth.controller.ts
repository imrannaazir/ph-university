import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.service';
import { JwtPayload } from 'jsonwebtoken';

// login user
const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully.',
    data: result,
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

const AuthController = {
  loginUser,
  changePassword,
};

export default AuthController;
