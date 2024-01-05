import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

// create academic faculty
const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all academic faculty
const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// get single academic faculty
const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  if (!result?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic faculty not founded by id : ${id}`
    );
  }
  return result;
};

// update academic faculty by id
const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const academicFacultyExist = await AcademicFaculty.findById(id);

  if (!academicFacultyExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic faculty not found by id : ${id}`
    );
  }

  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
