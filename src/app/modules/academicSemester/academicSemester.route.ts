import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

// create academic semester
router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouters = router;
