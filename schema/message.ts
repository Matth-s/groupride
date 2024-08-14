import { z } from 'zod';

export const messageGroupSchema = z.object({
  message: z.string().trim().min(1),
});

export const deleteMessageSchema = z.object({
  messageId: z.string().min(1),
  conversationId: z.string().min(1),
  ownerIdMessage: z.string().min(1),
});
