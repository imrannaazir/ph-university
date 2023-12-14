import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// create student route
router.post('/create-student', UserController.createStudent);

export const UserRouters = router;
