import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// create student route
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

// create faculty route
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty
);

//create admin route
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin
);

// get me
router.get(
  '/get-me',
  auth('admin', 'faculty', 'student'),
  UserController.getMe
);

export const UserRouters = router;
