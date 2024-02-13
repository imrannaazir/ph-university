import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  courseFacultiesValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import CourseController from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../user/user.constant';

const router = Router();

//create course : POST
router.post(
  '/',
  validateRequest(createCourseValidationSchema),
  CourseController.createCourse
);

// get all courses : GET
router.get('/', auth(USER_ROLES.admin), CourseController.getAllCourses);

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

//remove faculties
router.delete(
  '/:id/remove-faculties',
  validateRequest(courseFacultiesValidationSchema),
  CourseController.removeFacultiesFromCourse
);

const CourseRoutes = router;
export default CourseRoutes;
