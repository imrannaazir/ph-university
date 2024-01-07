import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

//create student
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

// create faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserService.createFaculty(password, faculty);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Faculty created successfully.',
    data: result,
  });
});
export const UserController = {
  createStudent,
  createFaculty,
};
