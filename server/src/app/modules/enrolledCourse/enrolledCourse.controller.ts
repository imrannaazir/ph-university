import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import EnrolledCourseService from './enrolledCourse.service';

// create enrolled course
const createEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { offeredCourse } = req.body;

  const result = await EnrolledCourseService.createEnrolledCourse(
    id,
    offeredCourse
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Enrolled course created successfully.',
    data: result,
  });
});

// update enrolled course
const updateEnrolledCourse = catchAsync(async (req, res) => {
  const facultyId = req.user.id;
  const payload = req.body;
  const result = await EnrolledCourseService.updateEnrolledCourse(
    facultyId,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Enrolled course updated successfully.',
    data: result,
  });
});

const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
};

export default EnrolledCourseController;
