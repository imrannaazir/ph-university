import { Router } from 'express';
import AdminController from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = Router();
// get all admins : GET
router.get('/', AdminController.getAllAdmins);

//get single admin : GET
router.get('/:id', AdminController.getSingleAdmin);

// update admin by id : PATCH
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminController.updateAdminById
);

// delete admin by id : DELETE
router.delete('/:id', AdminController.deleteAdminById);
const AdminRoutes = router;
export default AdminRoutes;
