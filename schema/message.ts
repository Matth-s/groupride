import { z } from 'zod';

export const messageGroupSchema = z.object({
  message: z.string().trim().min(1),
});
