import { z } from 'zod';

export const sportPraticed = z.enum([
  'road_running',
  'trail_running',
  'walking',
  'road_cycling',
  'gravel_cycling',
  'mountain_biking',
]);

export const groupType = z.enum(['close', 'open', 'invitation']);

export const newGroupSchema = z
  .object({
    name: z.string().trim().min(2, {
      message: '2 caractères minimun',
    }),
    description: z.string().optional(),
    location: z.string().optional(),
    postalCode: z.array(z.coerce.number()).optional(),
    image: z.string().optional(),
    sportPraticed: z.array(sportPraticed).optional(),
    groupType: groupType,
  })
  .refine(
    (data) => {
      if (data.location && !data.postalCode) {
        return false;
      }
      return true;
    },
    {
      message: 'Localisation non valide',
      path: ['location'],
    }
  );
