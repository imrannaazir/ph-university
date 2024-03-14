import { Router } from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import validateRequest from '../../middleware/validateRequest'
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation'
import auth from '../../middleware/auth'

const router = Router()

// create academic semester
router.post(
  '/create-academic-semester',
  auth('admin', 'superAdmin'),
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
)

//get all academic semester
router.get(
  '/all',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  AcademicSemesterController.getAllAcademicSemester
)

// get academic semester by id
router.get(
  '/:id',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  AcademicSemesterController.getSingleAcademicSemesterById
)

// update academic semester by id
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterController.updateSingleAcademicSemester
)

export const AcademicSemesterRouters = router
