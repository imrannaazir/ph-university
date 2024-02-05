import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  courseFacultiesValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import CourseController from './course.controller';

const router = Router();

//create course : POST
router.post(
  '/',
  validateRequest(createCourseValidationSchema),
  CourseController.createCourse
);

// get all courses : GET
router.get('/', CourseController.getAllCourses);

// get single course : GET
router.get('/:id', CourseController.getSingleCourse);

// update course : PATCH
router.patch(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  CourseController.updateCourseById
);

// delete course : DELETE
router.delete('/:id', CourseController.deleteCourseById);

// assign faculties: PUT
router.put(
  '/:id/assign-faculties',
  validateRequest(courseFacultiesValidationSchema),
  CourseController.assignFacultiesOnCourse
);

const CourseRoutes = router;
export default CourseRoutes;
