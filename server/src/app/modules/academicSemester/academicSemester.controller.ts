import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import AcademicSemesterService from './academicSemester.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

// create academic semester
const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semesterData = req.body
    const result = await AcademicSemesterService.createAcademicSemester(
      semesterData
    )

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic semester created successfully.',
      data: result,
    })
  }
)

// get all academic semester
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query
    const result = await AcademicSemesterService.getAllAcademicSemester(query)
    sendResponse(res, {
      success: true,
      message: 'All academic semester retrieved successfully',
      statusCode: StatusCodes.OK,
      data: result.result,
      meta: result.meta,
    })
  }
)

// get single academic semester
const getSingleAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AcademicSemesterService.getSingleAcademicSemester(id)

    sendResponse(res, {
      success: true,
      message: 'Single academic semester retrieved successfully',
      statusCode: StatusCodes.OK,
      data: result,
    })
  }
)

// update single academic semester
const updateSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const dataToUpdate = req.body

    const result = await AcademicSemesterService.updateSingleAcademicSemester(
      id,
      dataToUpdate
    )

    sendResponse(res, {
      success: true,
      message: 'Academic semester updated by id successfully',
      statusCode: StatusCodes.OK,
      data: result,
    })
  }
)

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemesterById,
  updateSingleAcademicSemester,
}
