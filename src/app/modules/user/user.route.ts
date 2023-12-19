import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

// middle ware
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

// create student route
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

export const UserRouters = router;
