import { Router } from 'express'
import validateRequest from '../../middleware/validateRequest'
import {
  semesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation'
import SemesterRegistrationController from './semesterRegistration.controller'
import auth from '../../middleware/auth'

const router = Router()

// create semester registration : POST
router.post(
  '/',
  auth('admin', 'superAdmin'),
  validateRequest(semesterRegistrationValidationSchema),
  SemesterRegistrationController.createSemesterRegistration
)

// get all semester registration : GET
router.get(
  '/',
  auth('student', 'faculty', 'admin', 'superAdmin'),
  SemesterRegistrationController.getAllSemesterRegistration
)

// get single semester registration by Id : GET
router.get(
  '/:id',
  auth('admin', 'faculty', 'student', 'superAdmin'),
  SemesterRegistrationController.getSingleSemesterRegistration
)

// update single semester registration by Id: PATCH
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateSemesterRegistrationValidationSchema),
  SemesterRegistrationController.updateSemesterRegistration
)

// delete semester registration by id :DELETE
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  SemesterRegistrationController.deleteSemesterRegistration
)
const SemesterRegistrationRoutes = router
export default SemesterRegistrationRoutes
