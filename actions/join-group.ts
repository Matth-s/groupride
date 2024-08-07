'use server';

import { auth } from '@/auth';
import {
  getGroupById,
  getGroupEventFuturIds,
  getUserInGroup,
} from '@/data/group';
import prisma from '@/libs/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const joinGroup = async (groupId: string) => {
  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  if (!groupId || typeof groupId !== 'string') {
    return {
      error: 'Requête invalide',
    };
  }

  const existingGroup = await getGroupById(groupId);

  if (!existingGroup) {
    return {
      error: "Ce groupe n'exsite pas",
    };
  }

  const userId = session.user.id;

  const isUserAlreadyInGroup = await getUserInGroup({
    userId,
    groupId,
  });

  if (isUserAlreadyInGroup) {
    redirect(`/groupes/${groupId}`);
  }

  const eventsIds = (await getGroupEventFuturIds(groupId)) || [];

  try {
    await prisma.$transaction([
      prisma.groupUser.create({
        data: {
          groupId,
          userId,
          role: 'member',
        },
      }),

      ...eventsIds?.map((event) => {
        return prisma.userResponseEvent.create({
          data: {
            userId,
            groupEventId: event.id,
          },
        });
      }),
    ]);
  } catch {
    return {
      error: 'Une erreur est survenue veuillez réessayer plus tard',
    };
  }

  revalidatePath(`/groupes/${groupId}/members`);
  revalidatePath(`/groupes/${groupId}/evenements`);

  redirect(`/groupes/${groupId}`);
};
