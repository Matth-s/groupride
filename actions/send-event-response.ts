'use server';

import { auth } from '@/auth';
import { z } from 'zod';
import { sendResponseEventSchema } from '@/schema/event';
import { getUserInGroup } from '@/data/group';
import { getEventById } from '@/data/event';
import { revalidatePath, revalidateTag } from 'next/cache';
import prisma from '@/libs/prisma';
import { redirect } from 'next/navigation';

export const sendEventResponse = async (
  values: z.infer<typeof sendResponseEventSchema>
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const currentUserId = session.user.id;

  const validatedFields = sendResponseEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Formulaire invalide',
    };
  }

  const { groupId, response, groupEventId } = validatedFields.data;

  const isUserInGroup = await getUserInGroup({
    groupId,
    userId: currentUserId,
  });

  if (!isUserInGroup) {
    return {
      error: 'Vous ne faites pas partie de ce groupe',
    };
  }

  const existingEvent = await getEventById(groupEventId);

  if (!existingEvent) {
    revalidateTag('events');
    revalidatePath(`/groupes/${groupId}/evenements`);

    return {
      error: "Cet événement n'existe pas",
    };
  }

  try {
    await prisma.userResponseEvent.update({
      where: {
        groupEventId_userId: {
          groupEventId,
          userId: currentUserId,
        },
      },
      data: {
        response,
      },
    });
  } catch {
    return {
      error: 'Une erreur est survenue',
    };
  }

  revalidateTag('events');
  revalidatePath(`/groupes/${groupId}/evenements`);
  redirect(`/groupes/${groupId}/evenements`);
};
