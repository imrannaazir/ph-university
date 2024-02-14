import { Types } from 'mongoose';
import OfferedCourse from '../offeredCourse/offeredCourse.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import User from '../user/user.model';
import EnrolledCourse from './enrolledCourse.model';

const createEnrolledCourse = async (
  userId: string,
  offeredCourse: Types.ObjectId
) => {
  /* 
    1. check is offered course exist
    2. check is student exist
    3. check is student already enrolled
    4. check the max credit exceed
    5. create enrolled course
    6. decrease from max capacity
    */

  // check offered course exist
  const isOfferedCourseExist = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not founded.');
  }

  // check student exist
  const isStudentExist = await User.findOne({ id: userId }, { _id: 1 });
  if (!isStudentExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not founded.');
  }

  // check is already enrolled
  const isUserAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse,
    student: isStudentExist._id,
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
  });
  if (isUserAlreadyEnrolled) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User already enrolled on this offered course.'
    );
  }
};

const EnrolledCourseService = {
  createEnrolledCourse,
};

export default EnrolledCourseService;
