import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import StudentService from './student.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// get all students
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getAllStudents();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Students retrieved successfully.',
    data: result,
  });
});

// get single student by id
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student retrieved successfully.',
    data: result,
  });
});

// update student by Id
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await StudentService.updateStudent(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student updated successfully.',
    data: result,
  });
});

// delete student by Id
const deleteStudentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await StudentService.deleteStudentById(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student deleted successfully.',
    data: result,
  });
});

const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudentById,
};

export default StudentController;
