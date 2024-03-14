import { Router } from 'express'
import FacultyController from './faculty.controller'
import validateRequest from '../../middleware/validateRequest'
import { updateFacultyValidationSchema } from './faculty.validation'
import auth from '../../middleware/auth'

const router = Router()

// get all faculties : GET
router.get('/', auth('admin', 'superAdmin'), FacultyController.getAllFaculties)

//get single faculty : GET
router.get(
  '/:id',
  auth('admin', 'superAdmin'),
  FacultyController.getSingleFaculty
)

// update faculty by Id : PATCH
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFacultyById
)

// delete faculty by Id : DELETE
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  FacultyController.deleteFacultyById
)

const FacultyRoutes = router

export default FacultyRoutes
