import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'
import AcademicFaculty from '../academicFaculty/academicFaculty.model'
import QueryBuilder from '../../builder/QueryBuilder'

// create new academic department
const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const { academicFaculty } = payload

  const isAcademicFacultyExist = await AcademicFaculty.findById(academicFaculty)

  if (!isAcademicFacultyExist?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic faculty not founded by Id: ${academicFaculty}`
    )
  }
  const result = await AcademicDepartment.create(payload)
  return result
}

// get all academic department
const getAllAcademicDepartments = async (query: Record<string, unknown>) => {
  const departmentModelQuery = new QueryBuilder(
    AcademicDepartment.find({}).populate('academicFaculty'),
    query
  )
    .filters()
    .sort()
    .fields()
    .paginate()

  const result = await departmentModelQuery.modelQuery
  const meta = await departmentModelQuery.countTotal()
  return { result, meta }
}

// get single academic department
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  )

  if (!result?._id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic department not found by Id : ${id}`
    )
  }
  return result
}

// update academic department by id
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>
) => {
  const isAcademicDepartmentExist = await AcademicDepartment.findById(id)

  if (!isAcademicDepartmentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Academic department not found by Id: ${id}`
    )
  }

  if (payload.academicFaculty) {
    const isAcademicFacultyExist = await AcademicFaculty.findById(
      payload.academicFaculty
    )

    if (!isAcademicFacultyExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Academic faculty not found by ID : ${payload.academicFaculty}`
      )
    }
  }

  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
export default AcademicDepartmentService
