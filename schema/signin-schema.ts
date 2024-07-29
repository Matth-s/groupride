import { signinInterface } from '@/interfaces/auth';
import { z } from 'zod';

export const signinSchema: z.ZodType<signinInterface> = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email requis',
    })
    .email({
      message: 'Email invalide',
    }),
  password: z.string().trim().min(1, {
    message: 'Mot de passe requis',
  }),
});
