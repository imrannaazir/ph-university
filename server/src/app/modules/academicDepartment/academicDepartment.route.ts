import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation'
import AcademicDepartmentController from './academicDepartment.controller'
import auth from '../../middleware/auth'

const router = Router()

// create academic department
router.post(
  '/',
  auth('admin', 'superAdmin'),
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment
)

// get all academic departments
router.get(
  '/',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  AcademicDepartmentController.getAllAcademicDepartments
)

// get single academic department by ID
router.get(
  '/:id',
  auth('admin', 'faculty', 'student', 'superAdmin'),
  AcademicDepartmentController.getSingleAcademicDepartment
)

// update academic department by Id
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentController.updateAcademicDepartment
)

const AcademicDepartmentRoutes = router
export default AcademicDepartmentRoutes
