import { z } from 'zod';

import { sportPraticed } from './group';

export const newEventSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Minimun 1 caractères',
  }),
  location: z.string().trim().min(1, {
    message: 'Vous devez renseigner le lieu',
  }),
  postalCode: z.coerce.number(),
  departureDate: z.date(),
  startAt: z.date(),
  description: z.string(),
  sportPraticed: z.array(sportPraticed),
});

export const sendResponseEventSchema = z.object({
  groupId: z.string().trim().min(1),
  response: z.enum(['PARTICIPANT', 'ABSENT']),
  groupEventId: z.string().trim().min(1),
});

export const deleteEventSchema = z.object({
  eventId: z.string().trim().min(1),
  groupId: z.string().trim().min(1),
});
