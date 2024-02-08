import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  semesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';
import SemesterRegistrationController from './semesterRegistration.controller';

const router = Router();

// create semester registration : POST
router.post(
  '/',
  validateRequest(semesterRegistrationValidationSchema),
  SemesterRegistrationController.createSemesterRegistration
);

// get all semester registration : GET
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

// get single semester registration by Id : GET
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration
);

// update single semester registration by Id: PATCH
router.patch(
  '/:id',
  validateRequest(updateSemesterRegistrationValidationSchema),
  SemesterRegistrationController.updateSemesterRegistration
);
const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;
