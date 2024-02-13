import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { loginUserValidationSchema } from './auth.validation';
import AuthController from './auth.controller';

const router = Router();

// user login : POST
router.post(
  '/login',
  validateRequest(loginUserValidationSchema),
  AuthController.loginUser
);
const AuthRoutes = router;
export default AuthRoutes;
