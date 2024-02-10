import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OfferedCourseService from './offeredCourse.service';

// create new offered course
const createOfferedCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await OfferedCourseService.createOfferedCourse(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'New offered course created successfully.',
    data: result,
  });
});

// get all offered course
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await OfferedCourseService.getAllOfferedCourse(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered courses retrieved successfully.',
    data: result,
  });
});

// get single offered course by ID
const getSingleCourseById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OfferedCourseService.getSingleOfferedCourse(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered course retrieved successfully.',
    data: result,
  });
});
const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleCourseById,
};
export default OfferedCourseController;
