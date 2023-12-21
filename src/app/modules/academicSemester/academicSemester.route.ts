import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';

const router = Router();

// create academic semester
router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester
);

//get all academic semester
router.get('/all', AcademicSemesterController.getAllAcademicSemester);

// get academic semester by id
router.get('/:id', AcademicSemesterController.getSingleAcademicSemesterById);

// update academic semester by id
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterController.updateSingleAcademicSemester
);

export const AcademicSemesterRouters = router;
