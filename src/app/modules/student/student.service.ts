import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import Student from './student.model';
import mongoose from 'mongoose';
import User from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { StudentSearchableFields } from './student.constant';

// get all students
const getAllStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query
  )
    .search(StudentSearchableFields)
    .filters()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

// get single student by Id
const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update student by Id
const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData };

  // check student exist
  const isStudentExist = await Student.findOne({ id });
  if (!isStudentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Student not founded by Id: ${id}`
    );
  }

  // if name value sent from client
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // if guardian sent from client
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  // if local guardian sent from client
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentById = async (id: string) => {
  const isStudentExist = await Student.findOne({ id });
  if (!isStudentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Student not found by Id : ${id}`
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // delete user : Transaction 1
    const user = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session }
    );

    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user.');
    }

    // delete student : Transaction 2
    const student = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session }
    );

    if (!student) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student.');
    }
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    );
  }
};

const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudentById,
};
export default StudentService;
