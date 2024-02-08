import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidationSchema } from './semesterRegistration.validation';
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
const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;
