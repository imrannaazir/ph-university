import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';
import AcademicDepartmentController from './academicDepartment.controller';

const router = Router();

// create academic department
router.post(
  '/',
  validateRequest(createAcademicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment
);

// get all academic departments
router.get('/', AcademicDepartmentController.getAllAcademicDepartments);

// get single academic department by ID
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

// update academic department by Id
router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentValidationSchema),
  AcademicDepartmentController.updateAcademicDepartment
);

const AcademicDepartmentRoutes = router;
export default AcademicDepartmentRoutes;
