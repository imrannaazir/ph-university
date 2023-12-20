import express from 'express';
import { UserController } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// create student route
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

export const UserRouters = router;
