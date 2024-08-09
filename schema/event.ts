import { z } from 'zod';

import { sportPraticed } from './group';

export const sendResponseEventSchema = z.object({
  groupId: z.string().trim().min(1),
  response: z.enum(['PARTICIPANT', 'ABSENT']),
  groupEventId: z.string().trim().min(1),
});

export const deleteEventSchema = z.object({
  eventId: z.string().trim().min(1),
  groupId: z.string().trim().min(1),
});

export const pointSchema = z.object({
  ele: z.number(),
  lat: z.number(),
  lon: z.number(),
  time: z.date().nullable(),
});

export const elevationSchema = z.object({
  avg: z.number(),
  max: z.number(),
  min: z.number(),
  neg: z.number(),
  pos: z.number(),
});

export const distanceSchema = z.object({
  cumul: z.array(z.number()),
  total: z.number(),
});

export const gpxFileSchema = z.object({
  elevation: elevationSchema,
  points: z.array(pointSchema),
  slopes: z.array(z.number()),
  distance: distanceSchema,
});

export const newEventSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Minimun 1 caractères',
  }),
  city: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
  departureDate: z.date(),
  startAt: z.date(),
  description: z.string(),
  sportPraticed: z.array(sportPraticed),
  gpxFile: gpxFileSchema.optional(),
});
