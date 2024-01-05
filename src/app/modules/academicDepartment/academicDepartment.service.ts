import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

// create new academic department
const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// get all academic department
const getAllAcademicDepartments = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

// get single academic department
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

// update academic department by id
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const isAcademicDepartmentExist = await AcademicDepartment.findById(id);

  if (!isAcademicDepartmentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic department not found by Id: ${id}`
    );
  }

  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
export default AcademicDepartmentService;
