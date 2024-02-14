/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { generateStudentId } from '../student/student.utils';
import { TStatus, TUser } from './user.interface';
import User from './user.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { generateFacultyId } from '../faculty/faculty.utils';
import Faculty from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import generateAdminId from '../admin/admin.utils';
import Admin from '../admin/admin.model';
import uploadImage from '../../utils/uploadImage';

// create student
const createStudent = async (
  file: any,
  password: string,
  payload: TStudent
) => {
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
    //upload image
    const imageName = `${payload.name.firstName}${user.id}`;
    const path = file.path;
    const { secure_url } = await uploadImage(imageName, path);
    //create student
    if (Object.keys(newUser).length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; // reference id
      payload.profileImage = secure_url;

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
const createFaculty = async (
  file: any,
  password: string,
  payload: TFaculty
) => {
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

    // upload image
    const imageName = `${payload.name.firstName}${user.id}`;
    const path = file.path;
    const { secure_url } = await uploadImage(imageName, path);
    // check user created
    if (!Object.keys(newUser[0]).length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = secure_url;

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
const createAdmin = async (file: any, password: string, payload: TAdmin) => {
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

    // image upload

    const imageName = `${payload.name.firstName}${user.id}`;
    const path = file.path;

    const { secure_url } = await uploadImage(imageName, path);
    //insert userId and Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = secure_url;

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

// get me
const getMe = async (userId: string, userRole: string) => {
  // check if user exist
  const isUserExist = await User.findOne({ id: userId, role: userRole });
  if (!isUserExist) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not founded.');
  }

  let result;

  if (isUserExist.role === 'student') {
    result = await Student.findOne({ id: isUserExist.id });
  } else if (isUserExist.role === 'admin') {
    result = await Admin.findOne({ id: isUserExist.id });
  } else if (isUserExist.role === 'faculty') {
    result = await Faculty.findOne({ id: isUserExist.id });
  }

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not founded.');
  }

  return result;
};

// change status
const changeStatus = async (userId: string, status: TStatus) => {
  // check is user exist
  const isUserExist = await User.findOne({ id: userId }, { _id: 1 });
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not founded.');
  }

  const result = await User.findByIdAndUpdate(
    isUserExist._id,
    {
      status,
    },
    {
      new: true,
    }
  );

  return result;
};
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
  changeStatus,
  getMe,
};
