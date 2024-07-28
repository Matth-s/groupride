import { z } from 'zod';

const requiredField = 'Champs requis';

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: requiredField,
    }),
    lastName: z.string().trim().min(1, {
      message: requiredField,
    }),
    username: z.string().trim().min(1, {
      message: requiredField,
    }),
    email: z
      .string()
      .trim()
      .min(1, {
        message: requiredField,
      })
      .email('Email invalide'),
    password: z.string().min(1, {
      message: requiredField,
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });
