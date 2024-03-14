import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
} from './offeredCourse.validation'
import OfferedCourseController from './offeredCourse.controller'
import auth from '../../middleware/auth'

const router = Router()

// create offered course : POST
router.post(
  '/',
  auth('admin', 'superAdmin'),
  validateRequest(createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
)

// get all offered course : GET
router.get(
  '/',
  auth('admin', 'faculty', 'student', 'superAdmin'),
  OfferedCourseController.getAllOfferedCourse
)

// get single offered course by Id : GET
router.get(
  '/:id',
  auth('admin', 'faculty', 'superAdmin', 'student'),
  OfferedCourseController.getSingleCourseById
)

// update single offered course by Id : PATCH
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourseById
)

// delete offered course by Id : DELETE
router.delete('/:id', OfferedCourseController.deleteOfferedCourseById)
const OfferedCourseRoutes = router
export default OfferedCourseRoutes
