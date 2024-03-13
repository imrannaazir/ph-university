import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyValidationSchema } from './academicFaculty.validation'
import AcademicFacultyController from './academicFaculty.controller'
import auth from '../../middleware/auth'

const router = Router()

// create academic faculty
router.post(
  '/',
  auth('superAdmin', 'admin'),
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty
)

// get all academic faculties
router.get('/', AcademicFacultyController.getAllAcademicFaculty)

// get single academic faculty
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty)

//update academic faculty
router.patch(
  '/:id',
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty
)

const AcademicFacultyRoutes = router
export default AcademicFacultyRoutes
