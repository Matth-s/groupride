'use server';

import { auth } from '@/auth';
import { isEventCreator } from '@/data/event';
import { getUserInGroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { deleteEventSchema } from '@/schema/event';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteEvent = async (
  values: z.infer<typeof deleteEventSchema>
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const valitedFields = deleteEventSchema.safeParse(values);

  if (!valitedFields.success) {
    return {
      error: 'Requête invalide',
    };
  }

  const { eventId, groupId } = valitedFields.data;

  const currentUserId = session.user.id;

  const isUserInGroup = await getUserInGroup({
    userId: currentUserId,
    groupId,
  });

  if (!isUserInGroup) {
    return {
      error: 'Vous ne faites plus partie de ce groupe',
    };
  }

  const isCreator = await isEventCreator({
    eventId,
    moderatorId: currentUserId,
  });

  if (!isCreator) {
    return {
      error: 'Vous ne pouvez pas supprimer cette événement',
    };
  }

  try {
    await prisma.groupEvent.delete({
      where: {
        id: eventId,
      },
    });
  } catch {
    return {
      error: 'Une erreur est survenue',
    };
  }

  revalidatePath(`/groupes/${groupId}/evenements`, 'page');
  revalidateTag('events');

  redirect(`/groupes/${groupId}/evenements`);
};
