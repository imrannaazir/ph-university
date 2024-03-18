import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import AcademicDepartmentService from './academicDepartment.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

// create academic department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.createAcademicDepartment(
      req.body
    )

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Academic department created successfully.',
      data: result,
    })
  }
)

// get all academic department
const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query
    const result = await AcademicDepartmentService.getAllAcademicDepartments(
      query
    )

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic departments retrieved successfully.',
      data: result.result,
      meta: result.meta,
    })
  }
)

// get single academic department by Id
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.getSingleAcademicDepartment(
      req.params.id
    )

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic department retrieved successfully',
      data: result,
    })
  }
)

//update academic department by ID
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      req.params.id,
      req.body
    )

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic department updated successfully.',
      data: result,
    })
  }
)
const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}

export default AcademicDepartmentController
