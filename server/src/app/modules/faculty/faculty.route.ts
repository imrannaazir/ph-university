import { Router } from 'express';
import FacultyController from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = Router();

// get all faculties : GET
router.get('/', FacultyController.getAllFaculties);

//get single faculty : GET
router.get('/:id', FacultyController.getSingleFaculty);

// update faculty by Id : PATCH
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFacultyById
);

// delete faculty by Id : DELETE
router.delete('/:id', FacultyController.deleteFacultyById);

const FacultyRoutes = router;

export default FacultyRoutes;
