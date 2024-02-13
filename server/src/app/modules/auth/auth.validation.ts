import { z } from 'zod';

export const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});
