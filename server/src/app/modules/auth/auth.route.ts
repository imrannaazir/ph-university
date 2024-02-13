import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  changePasswordValidationSchema,
  loginUserValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';
import AuthController from './auth.controller';
import auth from '../../middleware/auth';

const router = Router();

// user login : POST
router.post(
  '/login',
  validateRequest(loginUserValidationSchema),
  AuthController.loginUser
);

// change password : POST
router.post(
  '/change-password',
  auth('admin', 'faculty', 'student'),
  validateRequest(changePasswordValidationSchema),
  AuthController.changePassword
);

// refresh token : POST
router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken
);
const AuthRoutes = router;
export default AuthRoutes;
