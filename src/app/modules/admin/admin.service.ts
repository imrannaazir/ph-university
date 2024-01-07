/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AdminSearchableFields } from './admin.constant';
import Admin from './admin.model';
import { TAdmin } from './admin.interface';
import User from '../user/user.model';
import mongoose from 'mongoose';

// get all admins
const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filters()
    .sort()
    .fields()
    .paginate();

  const result = await adminQuery.modelQuery;
  if (!result.length)
    throw new AppError(StatusCodes.NOT_FOUND, 'No result founded for admins.');
  return result;
};

//get single admin by id
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findById(id);
  if (!result)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Admin not founded by Id : ${id}`
    );

  return result;
};

// update admin by Id
const updateAdminById = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  // check if admin exist
  const isAdminExit = await Admin.findById(id);
  if (!isAdminExit)
    throw new AppError(StatusCodes.NOT_FOUND, `Admin not found by Id ${id}`);

  const updatedAdmin = await Admin.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators: true,
  });

  return updatedAdmin;
};

//delete admin by Id
const deleteAdminById = async (id: string) => {
  // check is admin exit
  const isAdminExit = await Admin.findById(id);
  if (!isAdminExit)
    throw new AppError(StatusCodes.NOT_FOUND, `Admin not founded by Id :${id}`);

  //check is user exist
  const isUserExit = await User.findById(isAdminExit.user);
  if (!isUserExit)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `User not founded by Id :${isAdminExit.user}`
    );

  // start session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // delete admin : Transaction 1
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { session }
    );
    if (!deletedAdmin)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete Admin.');

    // delete user : Transaction 2
    const deletedUser = await User.findByIdAndUpdate(
      isAdminExit.user,
      { isDeleted: true },
      { session }
    );
    if (!deletedUser)
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user.');

    await session.commitTransaction();
    session.endSession();

    return {
      deletedAdminId: deletedAdmin._id,
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, error.message);
  }
};
const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdminById,
  deleteAdminById,
};
export default AdminService;
