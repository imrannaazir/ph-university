import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createOfferedCourseValidationSchema } from './offeredCourse.validation';
import OfferedCourseController from './offeredCourse.controller';

const router = Router();

// create offered course : POST
router.post(
  '/',
  validateRequest(createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
);

// get all offered course : GET
router.get('/', OfferedCourseController.getAllOfferedCourse);

// get single offered course by Id : GET
router.get('/:id', OfferedCourseController.getSingleCourseById);
const OfferedCourseRoutes = router;
export default OfferedCourseRoutes;
