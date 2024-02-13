import { Router } from 'express';
import StudentController from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';

const router = Router();

// get all students
router.get('/', auth('admin', 'faculty'), StudentController.getAllStudents);

// get single student by Id
router.get('/:id', StudentController.getSingleStudent);

// update student by id
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentController.updateStudent
);

// delete student by Id
router.delete('/:id', StudentController.deleteStudentById);

const StudentRoutes = router;
export default StudentRoutes;
