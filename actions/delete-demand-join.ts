'use server';

import { auth } from '@/auth';
import { getUserInInvitationList } from '@/data/group';
import prisma from '@/libs/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const deleteDemandGroup = async (groupId: string) => {
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

  const isAlreadyInInvitationList = await getUserInInvitationList({
    groupId,
    userId,
  });

  if (!isAlreadyInInvitationList) {
    return {
      error: 'Votre demande à été retiré',
    };
  }

  try {
    await prisma.invitationList.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  } catch (error) {
    return {
      error: 'Une erreur est survenue veuillez réessayer plus tard',
    };
  }

  revalidatePath(`/groupes/${groupId}/demandes`);
  revalidateTag('join-demand');
  redirect('/');
};
