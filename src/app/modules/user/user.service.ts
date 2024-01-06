import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { generateStudentId } from '../student/student.utils';
import { TUser } from './user.interface';
import User from './user.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import mongoose from 'mongoose';

const createStudent = async (password: string, payload: TStudent) => {
  const user: TUser = {
    id: '',
    password: '',
    role: 'student',
  };

  user.password = password ? password : config.default_password;

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  // check academic semester is exist
  if (!academicSemester?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic semester not founded by Id :${payload.admissionSemester}`
    );
  }

  //check academic department is exist
  const isAcademicDepartmentExist = await AcademicDepartment.findById(
    payload.academicDepartment
  );
  if (!isAcademicDepartmentExist?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic Department not founded by Id :${payload.academicDepartment}`
    );
  }

  // check email uniqueness
  const studentWithEmailExist = await Student.findOne({ email: payload.email });
  if (studentWithEmailExist?._id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `There is already a student exist with ${payload.email}`
    );
  }

  // generate id
  user.id = await generateStudentId(academicSemester);

  // create session
  const session = await mongoose.startSession();

  try {
    // ‍start transaction
    session.startTransaction();
    //create user: Transaction 1
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user.');
    }

    //create student
    if (Object.keys(newUser).length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // reference id

      //create student : transaction 2
      const student = await Student.create([payload], { session });
      if (!student.length) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'Failed to create student.'
        );
      }

      await session.commitTransaction();
      session.endSession();
      return student;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create student.'
    );
  }
};

export const UserService = {
  createStudent,
};
