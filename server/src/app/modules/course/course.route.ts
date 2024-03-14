import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import {
  courseFacultiesValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation'
import CourseController from './course.controller'
import auth from '../../middleware/auth'

const router = Router()

//create course : POST
router.post(
  '/',
  auth('admin', 'superAdmin'),
  validateRequest(createCourseValidationSchema),
  CourseController.createCourse
)

// get all courses : GET
router.get(
  '/',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  CourseController.getAllCourses
)

// get single course : GET
router.get(
  '/:id',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  CourseController.getSingleCourse
)

// update course : PATCH
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateCourseValidationSchema),
  CourseController.updateCourseById
)

// delete course : DELETE
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  CourseController.deleteCourseById
)

// assign faculties: PUT
router.put(
  '/:id/assign-faculties',
  auth('superAdmin', 'admin'),
  validateRequest(courseFacultiesValidationSchema),
  CourseController.assignFacultiesOnCourse
)

//remove faculties
router.delete(
  '/:id/remove-faculties',
  auth('admin', 'superAdmin'),
  validateRequest(courseFacultiesValidationSchema),
  CourseController.removeFacultiesFromCourse
)

const CourseRoutes = router
export default CourseRoutes
