'use server';

import { auth } from '@/auth';
import { isUserAdminGroup } from '@/data/group';
import { z } from 'zod';
import { newEventSchema } from '@/schema/event';
import { createId } from '@paralleldrive/cuid2';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

import prisma from '@/libs/prisma';

export const createEvent = async ({
  groupId,
  values,
}: {
  groupId: string;
  values: z.infer<typeof newEventSchema>;
}) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connecté pour effectuer cette action',
    };
  }

  const validatedFields = newEventSchema.safeParse(values);

  console.log(validatedFields.data?.city);
  console.log(validatedFields.data?.lon);
  console.log(validatedFields.data?.lat);

  console.log(groupId, 'groupId');

  if (
    !validatedFields.success ||
    !groupId ||
    typeof groupId !== 'string' ||
    validatedFields.data.city === undefined ||
    validatedFields.data.lon === undefined ||
    validatedFields.data.lat === undefined
  ) {
    return {
      error: 'Champ du formulaire invalide',
    };
  }

  const isAdmin = await isUserAdminGroup({
    groupId,
    userId: session.user.id,
  });

  if (!isAdmin) {
    return {
      error: "Vous n'avez pas les droits pour créer un événement",
    };
  }

  let newId = createId();

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      users: {
        select: {
          userId: true,
        },
      },
      moderator: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!group) {
    return {
      error: 'Groupe introuvable',
    };
  }

  // Construction de l'objet `gpxFile` si fourni
  const gpxFileData = values.gpxFile
    ? {
        create: {
          elevation: {
            create: values.gpxFile.elevation,
          },
          points: {
            create: values.gpxFile.points,
          },
          slopes: values.gpxFile.slopes,
          distance: {
            create: values.gpxFile.distance,
          },
        },
      }
    : undefined;

  try {
    await prisma.$transaction([
      prisma.groupEvent.create({
        data: {
          id: newId,
          creatorId: session.user.id,
          groupId,
          name: validatedFields.data.name,
          city: validatedFields.data.city,
          lat: validatedFields.data.lat,
          lon: validatedFields.data.lon,
          departureDate: validatedFields.data.departureDate,
          startAt: validatedFields.data.startAt,
          description: validatedFields.data.description,
          sportPraticed: validatedFields.data.sportPraticed,
          gpxFile: gpxFileData,
        },
      }),
      ...group.users.map((user) => {
        return prisma.userResponseEvent.create({
          data: {
            groupEventId: newId,
            userId: user.userId,
          },
        });
      }),
      prisma.userResponseEvent.create({
        data: {
          groupEventId: newId,
          userId: group.moderator.id,
        },
      }),
    ]);
  } catch (error) {
    return {
      error:
        'Une erreur est survenue. Veuillez réessayer ultérieurement',
    };
  }

  revalidateTag('events');
  redirect(`/groupes/${groupId}/evenements`);
};
