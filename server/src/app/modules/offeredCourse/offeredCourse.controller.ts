import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import OfferedCourseService from './offeredCourse.service';

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

const OfferedCourseController = { createOfferedCourse };
export default OfferedCourseController;
