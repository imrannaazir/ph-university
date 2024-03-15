import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import EnrolledCourseService from './enrolledCourse.service'

// create enrolled course
const createEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.user
  const { offeredCourse } = req.body

  const result = await EnrolledCourseService.createEnrolledCourse(
    id,
    offeredCourse
  )

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Enrolled course created successfully.',
    data: result,
  })
})

// get all enrolled course
const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const facultyId = req.user.id
  const query = req.query

  const result = await EnrolledCourseService.getAllEnrolledCourses(
    facultyId,
    query
  )
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All enrolled courses retrieved successfully.',
    data: result.result,
    meta: result.meta,
  })
})

// get all my enrolled course for student
const getAllMyEnrolledCourse = catchAsync(async (req, res) => {
  const studentId = req.user.id
  const query = req.query
  const result = await EnrolledCourseService.getAllMyEnrolledCourse(
    studentId,
    query
  )
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All my enrolled course retrieved successfully.',
    data: result.result,
    meta: result.meta,
  })
})
// update enrolled course
const updateEnrolledCourse = catchAsync(async (req, res) => {
  const facultyId = req.user.id
  const payload = req.body
  const result = await EnrolledCourseService.updateEnrolledCourse(
    facultyId,
    payload
  )

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Enrolled course updated successfully.',
    data: result,
  })
})

const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
  getAllEnrolledCourses,
  getAllMyEnrolledCourse,
}

export default EnrolledCourseController
