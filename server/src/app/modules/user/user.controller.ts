import { UserService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { JwtPayload } from 'jsonwebtoken'

//create student
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserService.createStudent(
    req.file,
    password,
    studentData
  )

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully user created',
    data: result,
  })
})

// create faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body
  const result = await UserService.createFaculty(req.file, password, faculty)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Faculty created successfully.',
    data: result,
  })
})

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body

  const result = await UserService.createAdmin(req.file, password, admin)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Admin created successfully.',
    data: result,
  })
})

// get me
const getMe = catchAsync(async (req, res) => {
  const { id, role } = req.user as JwtPayload

  const result = await UserService.getMe(id, role)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'LoggedIn user data retrieved successfully.',
    data: result,
  })
})

// change status
const changeStatus = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const { status } = req.body

  const result = await UserService.changeStatus(userId, status)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User status updated successfully',
    data: result,
  })
})
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}
