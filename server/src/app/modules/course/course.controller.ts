import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import CourseService from './course.service'

// create course
const createCourse = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await CourseService.createCourse(payload)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Course created successfully.',
    data: result,
  })
})

// get all courses
const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query

  const result = await CourseService.getAllCourse(query)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Courses retrieved successfully.',
    data: result,
  })
})

// get single course by Id
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseService.getSingleCourse(id)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course retrieved successfully.',
    data: result,
  })
})

// update course by ID
const updateCourseById = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CourseService.updateCourseById(id, payload)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course updated successfully.',
    data: result,
  })
})

//delete course by Id
const deleteCourseById = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseService.deleteCourseById(id)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Course deleted successfully.',
    data: result,
  })
})

// assign faculties on course
const assignFacultiesOnCourse = catchAsync(async (req, res) => {
  const courseFaculties = await CourseService.assignFacultiesOnCourse(
    req.params.id,
    req.body.faculties
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Successfully assigned faculties on the course.`,
    data: courseFaculties,
  })
})

// remove faculties from course
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const result = await CourseService.removeFacultiesFromCourse(
    req.params.id,
    req.body.faculties
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties removed successfully from course.',
    data: result,
  })
})

// get all faculties of a course
const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const courseId = req.params.id
  const result = await CourseService.getFacultiesWithCourse(courseId)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All faculties of a course retrieved successfully.',
    data: result,
  })
})

const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourseById,
  deleteCourseById,
  assignFacultiesOnCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
}

export default CourseController
