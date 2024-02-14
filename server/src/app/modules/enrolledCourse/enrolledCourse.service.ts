import mongoose, { Types } from 'mongoose';
import OfferedCourse from '../offeredCourse/offeredCourse.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import EnrolledCourse from './enrolledCourse.model';
import Student from '../student/student.model';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import Course from '../course/course.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import Faculty from '../faculty/faculty.model';
import { calculateGradesPoints } from './enrolledCourse.utils';

// create enrolled course
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
  const isStudentExist = await Student.findOne({ id: userId }, { _id: 1 });

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

  // max credits
  const semesterRegistration = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration
  ).select('maxCredit');

  const maxCredit = semesterRegistration?.maxCredit;

  const course = await Course.findById(isOfferedCourseExist.course);
  const currentCredit = course?.credits;
  // check max credits exceed
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: isStudentExist._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCourse: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCourse: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCourse : 0;

  if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You have exceeded maximum number of credits.'
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          academicDepartment: isOfferedCourseExist.academicDepartment,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          course: isOfferedCourseExist.course,
          faculty: isOfferedCourseExist.faculty,
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          offeredCourse: isOfferedCourseExist._id,
          student: isStudentExist._id,
          isEnrolled: true,
        },
      ],
      { session }
    );

    if (!result) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'Failed to create enrolled course.'
      );
    }

    // decrease from max capacity
    const maxCapacity = isOfferedCourseExist.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(isOfferedCourseExist._id, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

// update enrolled course
const updateEnrolledCourse = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>
) => {
  /* 
1. check is semester registration exist
2. check is offered course exist
3. check is student exist
3. check is faculty exist
4. check is course belong to faculty

*/
  // check is semester registration
  const isSemesterRegistration = await SemesterRegistration.findById(
    payload.semesterRegistration
  );
  if (!isSemesterRegistration) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester registration not founded.'
    );
  }

  // check is offeredCourse exist
  const isOfferedCourseExist = await OfferedCourse.findById(
    payload.offeredCourse
  );
  if (!isOfferedCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not founded.');
  }

  // check if student is exist
  const isStudentExist = await Student.findById(payload.student);
  if (!isStudentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not founded.');
  }

  // get faculty & check if course is belong to the faculty
  const isFacultyExist = await Faculty.findOne({ id: facultyId });

  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not founded.');
  }
  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration: isSemesterRegistration._id,
    student: isStudentExist._id,
    offeredCourse: isOfferedCourseExist._id,
    faculty: isFacultyExist._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your are forbidden for this course.'
    );
  }

  const modifiedData: Record<string, unknown> = {};

  if (payload.courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradesPoints(totalMarks);

    modifiedData.grade = result.grade;
    modifiedData.gradePoint = result.gradePoints;
    modifiedData.isCompleted = true;
  }

  if (payload.courseMarks && Object.keys(payload.courseMarks).length) {
    for (const [key, value] of Object.entries(payload.courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCourse.findOneAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    { new: true }
  );

  return result;
};
const EnrolledCourseService = {
  createEnrolledCourse,
  updateEnrolledCourse,
};

export default EnrolledCourseService;
