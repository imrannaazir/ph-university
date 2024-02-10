import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import Course from '../course/course.model';
import Faculty from '../faculty/faculty.model';
import OfferedCourse from './offeredCourse.model';
import { hasTimeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

// create offered course
const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    days,
    startTime,
    endTime,
    section,
  } = payload;
  /* 
1. check semester registration is exist
2. check academic faculty is exist
3. check academic department is exist
4. check academic semester is exist
5. check course is exist
6. check faculty is exist
7. check department belong to faculty
8. check already created offered course with section, course and semester registration
9. get schedules of the faculties
10. check time conflict
11. create the offered course
*/

  const isSemesterRegistrationExist = await SemesterRegistration.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExist?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Semester registration not founded.`
    );
  }

  // got from registered semester that means academic semester exist
  const academicSemester = isSemesterRegistrationExist.academicSemester;

  // check academic department existence
  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExist?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Academic department not founded.'
    );
  }

  // check academic faculty existence
  const isAcademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExist?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not founded');
  }

  // check course existence
  const isCourseExist = await Course.findById(course);
  if (!isCourseExist?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Course not founded.');
  }

  // check faculty existence
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not founded.');
  }

  // check if the academic department is belong to the academic faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty?._id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `This ${isAcademicDepartmentExist.name} department is not belong to this ${isAcademicFacultyExist.name} faculty.`
    );
  }

  //check if already offered course exist with same course , section and semester registration
  const isExistOfferedCourseWithSemesterRegistrationCourseSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isExistOfferedCourseWithSemesterRegistrationCourseSection?._id) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Offered course with same section or course or semester registration is already exist.'
    );
  }

  // get time schedules
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'This faculty is not available at this time. Choose another time or days.'
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// get all offered course
const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filters()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  return result;
};

//get single offered course
const getSingleOfferedCourse = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  if (!result?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not founded.');
  }

  return result;
};

const OfferedCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
};

export default OfferedCourseService;
