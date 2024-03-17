import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { academicSemesterCodeNameMapper } from './academicSemester.constants'
import { TAcademicSemester } from './academicSemester.interface'
import AcademicSemester from './academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'

// create academic semester
const createAcademicSemester = async (payload: TAcademicSemester) => {
  const newAcademicSemester = await AcademicSemester.create(payload)

  if (
    !(academicSemesterCodeNameMapper[payload.name] === payload.semesterCode)
  ) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid semester code.')
  }

  return newAcademicSemester
}

//get all academic semester
const getAllAcademicSemester = async (query: Record<string, unknown>) => {
  const academicSemesterModelQuery = new QueryBuilder(
    AcademicSemester.find({}),
    query
  )
    .filters()
    .sort()
    .fields()
    .paginate()
  const result = await academicSemesterModelQuery.modelQuery
  const meta = await academicSemesterModelQuery.countTotal()
  return { result, meta }
}

//get single academic semester by id
const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

// update single academic semester by id
const updateSingleAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.semesterCode &&
    academicSemesterCodeNameMapper[payload.name] !== payload.semesterCode
  ) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid semester code.')
  } else {
    const result = await AcademicSemester.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    )

    return result
  }
}

const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
}

export default AcademicSemesterService
