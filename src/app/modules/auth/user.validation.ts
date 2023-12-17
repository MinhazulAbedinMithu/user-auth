import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(25),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const userValidations = {
  registerValidationSchema,
  loginValidationSchema,
};
