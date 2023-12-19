import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudent(password, studentData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully user created',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
