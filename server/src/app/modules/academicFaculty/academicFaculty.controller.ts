import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyService } from './academicFaculty.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

// create academic faculty
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.createAcademicFaculty(req.body)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Academic faculty successfully created.',
      data: result,
    })
  }
)

// get all academic faculties
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query
    const result = await AcademicFacultyService.getAllAcademicFaculty(query)
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic faculties retrieved successfully.',
      data: result.result,
      meta: result.meta,
    })
  }
)

// get single academic faculty by ID
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getSingleAcademicFaculty(
      req.params.id
    )
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic faculty updated successfully.',
      data: result,
    })
  }
)

// update academic faculty by id
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.updateAcademicFaculty(
      req.params.id,
      req.body
    )
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic faculty updated successfully.',
      data: result,
    })
  }
)

const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
export default AcademicFacultyController
