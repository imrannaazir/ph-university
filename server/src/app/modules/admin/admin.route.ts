import { Router } from 'express'
import AdminController from './admin.controller'
import validateRequest from '../../middleware/validateRequest'
import { updateAdminValidationSchema } from './admin.validation'
import auth from '../../middleware/auth'

const router = Router()
// get all admins : GET
router.get('/', auth('superAdmin'), AdminController.getAllAdmins)

//get single admin : GET
router.get('/:id', auth('superAdmin'), AdminController.getSingleAdmin)

// update admin by id : PATCH
router.patch(
  '/:id',
  auth('superAdmin'),
  validateRequest(updateAdminValidationSchema),
  AdminController.updateAdminById
)

// delete admin by id : DELETE
router.delete('/:id', auth('superAdmin'), AdminController.deleteAdminById)
const AdminRoutes = router
export default AdminRoutes
