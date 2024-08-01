'use server';

import { auth } from '@/auth';
import { getGroupById, getUserRole } from '@/data/group';
import prisma from '@/libs/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const leaveGroup = async (groupId: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: 'Vous devez être connecter pour effectuer cette action',
    };
  }

  if (!groupId || typeof groupId !== 'string') {
    return {
      error: 'Rêquete invalide',
    };
  }

  const existingGroup = await getGroupById(groupId);

  if (!existingGroup) {
    return {
      error: "Ce groupe n'existe pas",
    };
  }

  const role = await getUserRole({
    groupId,
    userId: session.user.id,
  });

  if (!role) {
    return {
      error: 'Une erreur est survenue',
    };
  }

  if (role === 'moderator') {
    return {
      error:
        'Vous ne pouvez pas quitter le groupe a moins de le dissoudre ou de nommer un nouveau moderateur',
    };
  }

  try {
    await prisma.groupUser.delete({
      where: {
        userId_groupId: {
          groupId,
          userId: session.user.id,
        },
      },
    });
  } catch {
    return {
      error:
        'Une erreur est survenue veuillez réessayer ultérieument',
    };
  }

  revalidatePath(`/groupes/${groupId}/`, 'layout');
  revalidateTag('groups');
  revalidateTag('members');

  redirect('/');
};
