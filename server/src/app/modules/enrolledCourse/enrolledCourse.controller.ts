import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import EnrolledCourseService from './enrolledCourse.service';

// create enrolled course
const createEnrolledCourse = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { offeredCourse } = req.body;

  const result = await EnrolledCourseService.createEnrolledCourse(
    userId,
    offeredCourse
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Enrolled course created successfully.',
    data: result,
  });
});

const EnrolledCourseController = {
  createEnrolledCourse,
};

export default EnrolledCourseController;
