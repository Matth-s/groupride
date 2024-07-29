'use server';

import { auth } from '@/auth';
import { getUserInInvitationList } from '@/data/group';
import { redirect } from 'next/navigation';

import prisma from '@/libs/prisma';

export const askToJoinGroup = async (groupId: string) => {
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

  if (isAlreadyInInvitationList) {
    return {
      error: 'Vous êtes déjà en attente pour rejoindre ce groupe',
    };
  }

  try {
    await prisma.invitationList.create({
      data: {
        userId,
        groupId,
      },
    });
  } catch (error) {
    return {
      error: 'Une erreur est survenue veuillez réessayer plus tard',
    };
  }

  redirect('/');
};
