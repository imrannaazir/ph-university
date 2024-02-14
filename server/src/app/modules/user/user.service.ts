/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TFaculty } from '../faculty/faculty.interface';
import { generateFacultyId } from '../faculty/faculty.utils';
import Faculty from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import generateAdminId from '../admin/admin.utils';
import Admin from '../admin/admin.model';

const createStudent = async (password: string, payload: TStudent) => {
  const user: TUser = {
    id: '',
    password: '',
    role: 'student',
    email: payload.email,
  };

  user.password = password ? password : config.default_password;

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

// create faculty
const createFaculty = async (password: string, payload: TFaculty) => {
  const user: TUser = {
    id: '',
    role: 'faculty',
    password: password ? password : config.default_password,
    email: payload.email,
  };
  user.id = await generateFacultyId();

  const session = await mongoose.startSession();

  try {
    //start transaction
    session.startTransaction();

    // create user user : Transaction 1
    const newUser = await User.create([user], { session });

    // check user created
    if (!Object.keys(newUser[0]).length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //check if faculty already exit by email
    const isEmailExist = await Faculty.findOne({ email: payload?.email });

    if (isEmailExist) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `Faculty already exist by email ${payload.email}`
      );
    }

    // check academicDepartment exist
    const isAcademicDepartmentExist = await AcademicDepartment.findById(
      payload.academicDepartment
    );
    if (!isAcademicDepartmentExist?._id) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Academic not founded by Id : ${payload.academicDepartment}`
      );
    }

    // create faculty
    const newFaculty = await Faculty.create([payload], { session });
    //check faculty created
    if (!Object.keys(newFaculty).length) {
      throw new AppError(StatusCodes.BAD_GATEWAY, 'Failed to create faculty.');
    }

    await session.commitTransaction();
    session.endSession();
    return newFaculty[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

// create admin
const createAdmin = async (password: string, payload: TAdmin) => {
  const user: TUser = {
    id: '',
    role: 'admin',
    password: password ? password : config.default_password,
    email: payload.email,
  };

  // set user ID
  user.id = await generateAdminId();

  // check email exist
  const isEmailExist = await Admin.findOne({ email: payload.email });
  if (isEmailExist?._id)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Admin already exit with email : ${payload.email}`
    );

  // create session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // create admin :Transaction 1
    const newUser = await User.create([user], { session });

    //check if user created
    if (!newUser[0]._id)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user.');

    //insert userId and Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create admin :Transaction 2
    const newAdmin = await Admin.create([payload], { session });

    // check admin created
    if (!newAdmin[0]._id)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin.');

    await session.commitTransaction();
    session.endSession();
    return newAdmin[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
