import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import Faculty from './faculty.model';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import mongoose from 'mongoose';
import User from '../user/user.model';

// get all faculties
const getAllFaculties = async (query: Record<string, unknown>) => {
  const facultiesQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filters()
    .sort()
    .fields()
    .paginate();

  const result = await facultiesQuery.modelQuery;
  return result;
};

//get single faculty by Id
const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

// update faculty by Id
const updateFacultyById = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingPayload } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingPayload };

  // check if faculty exit
  const isFacultyExist = await Faculty.findById(id);
  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, `Faculty not found by Id:${id}`);
  }

  //check academic department exist
  if (payload.academicDepartment) {
    const isAcademicDepartmentExist = await AcademicDepartment.findById(
      payload.academicDepartment
    );
    if (!isAcademicDepartmentExist)
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Academic department not founded by Id ${payload.academicDepartment} `
      );
  }

  // if payload carry name
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  // update faculty
  const result = await Faculty.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete faculty by Id
const deleteFacultyById = async (id: string) => {
  // check if faculty is exist
  const isFacultyExist = await Faculty.findById(id);
  if (!isFacultyExist)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Faculty not founded by Id : ${id}`
    );

  // create session
  const session = await mongoose.startSession();

  try {
    // start transition
    session.startTransaction();

    // delete faculty : Transition 1
    const deleteFaulty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { session, new: true }
    );

    if (!deleteFaulty?._id)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete faculty.');

    // check if user is exist
    const isUserExit = await User.findById(deleteFaulty.user);
    if (!isUserExit)
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `User not founded by Id :${deleteFaulty.user}`
      );

    // delete user : Transition 2
    const deletedUser = await User.findByIdAndUpdate(
      deleteFaulty.user,
      { isDeleted: true },
      { session, new: true }
    );

    if (!deletedUser?._id)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user.');
    await session.commitTransaction();
    session.endSession();
    return {
      deletedFacultyId: deleteFaulty._id,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};
const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFacultyById,
  deleteFacultyById,
};

export default FacultyService;
