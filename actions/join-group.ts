'use server';

import { auth } from '@/auth';
import { getUserInGroup } from '@/data/group';
import prisma from '@/libs/prisma';
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

  const userId = session.user.id;

  const userIsAlreadyInGroup = await getUserInGroup({
    userId,
    groupId,
  });

  if (userIsAlreadyInGroup) {
    redirect(`/groupes/${groupId}`);
  }

  try {
    await prisma.groupUser.create({
      data: {
        groupId,
        userId,
        role: 'member',
      },
    });
  } catch {
    return {
      error: 'Une erreur est survenue veuillez réessayer plus tard',
    };
  }

  redirect(`/groupes/${groupId}`);
};
