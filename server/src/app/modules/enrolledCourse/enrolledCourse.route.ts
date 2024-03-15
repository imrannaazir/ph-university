import { Router } from 'express'
import auth from '../../middleware/auth'
import validateRequest from '../../middleware/validateRequest'
import {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
} from './enrolledCourse.validation'
import EnrolledCourseController from './enrolledCourse.controller'

const router = Router()

// create enrolled course : POST
router.post(
  '/',
  auth('student'),
  validateRequest(createEnrolledCourseValidationSchema),
  EnrolledCourseController.createEnrolledCourse
)

// get all enrolled course : GET
router.get(
  '/get-all',
  auth('faculty'),
  EnrolledCourseController.getAllEnrolledCourses
)

// get all my enrolled course for student : GET
router.get(
  '/get-my',
  auth('student'),
  EnrolledCourseController.getAllMyEnrolledCourse
)
// update enrolled course : PATCH
router.patch(
  '/',
  auth('faculty'),
  validateRequest(updateEnrolledCourseValidationSchema),
  EnrolledCourseController.updateEnrolledCourse
)

const EnrolledCourseRoutes = router
export default EnrolledCourseRoutes
