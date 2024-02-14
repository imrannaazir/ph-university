import { z } from 'zod';
import { Status } from './user.constant';

export const userValidationSchema = z.object({
  id: z.string({
    required_error: 'id is required!',
    invalid_type_error: 'id must be string',
  }),
  password: z
    .string()
    .max(20, 'Password can not be more than 20 Characters!')
    .min(6, 'Password must be more than 6 Characters!'),
  role: z.enum(['student', 'faculty', 'admin']),
  status: z.enum(['active', 'blocked']),
});

export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Status as [string, ...string[]]),
  }),
});
