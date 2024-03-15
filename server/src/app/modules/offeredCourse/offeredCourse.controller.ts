import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import OfferedCourseService from './offeredCourse.service'

// create new offered course
const createOfferedCourse = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await OfferedCourseService.createOfferedCourse(payload)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'New offered course created successfully.',
    data: result,
  })
})

// get all offered course
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const query = req.query
  const result = await OfferedCourseService.getAllOfferedCourse(query)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered courses retrieved successfully.',
    data: result,
  })
})

// get my offered course for student
const getMyOfferedCourse = catchAsync(async (req, res) => {
  const studentId = req.user.id
  const query = req.query
  const { result, meta } = await OfferedCourseService.getMyOfferedCourse(
    studentId,
    query
  )

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'My offered course retrieved successfully.',
    data: result,
    meta,
  })
})
// get single offered course by ID
const getSingleCourseById = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await OfferedCourseService.getSingleOfferedCourse(id)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered course retrieved successfully.',
    data: result,
  })
})

// update offered course by Id
const updateOfferedCourseById = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body
  const result = await OfferedCourseService.updateOfferedCourseById(id, payload)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered course updated successfully.',
    data: result,
  })
})

// delete offered course
const deleteOfferedCourseById = catchAsync(async (req, res) => {
  const id = req.params.id
  await OfferedCourseService.deleteOfferedCourseById(id)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Offered course deleted successfully.',
    data: `Deleted id :${id}`,
  })
})
const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleCourseById,
  updateOfferedCourseById,
  deleteOfferedCourseById,
  getMyOfferedCourse,
}
export default OfferedCourseController
