import { z } from 'zod';

export const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    newPassword: z.string(),
  }),
});
