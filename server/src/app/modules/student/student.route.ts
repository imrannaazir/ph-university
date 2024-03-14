import { Router } from 'express'
import StudentController from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { updateStudentValidationSchema } from './student.validation'
import auth from '../../middleware/auth'

const router = Router()

// get all students
router.get('/', auth('admin', 'faculty'), StudentController.getAllStudents)

// get single student by Id
router.get(
  '/:id',
  auth('admin', 'superAdmin', 'faculty'),
  StudentController.getSingleStudent
)

// update student by id
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent
)

// delete student by Id
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  StudentController.deleteStudentById
)

const StudentRoutes = router
export default StudentRoutes
