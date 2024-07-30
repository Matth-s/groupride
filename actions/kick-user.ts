'use server';

import { auth } from '@/auth';
import { getUserRole, isUserIngroup } from '@/data/group';
import prisma from '@/libs/prisma';
import { revalidateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { checkParamsUserGroupKick } from '@/schema/group';

export const kickUser = async ({
  groupId,
  userIdToKick,
}: z.infer<typeof checkParamsUserGroupKick>) => {
  const validatedFields = checkParamsUserGroupKick.safeParse({
    groupId,
    userIdToKick,
  });

  if (!validatedFields.success) {
    return {
      error: 'Champ du formulaire invalide',
    };
  }

  const session = await auth();

  if (!session?.user.id) {
    return {
      error: 'Vous devez être connecté pour effectuer cette action',
    };
  }

  const [
    currentUserIsInGroup,
    userToKickIsInGroup,
    currentUserRole,
    userToKickRole,
  ] = await Promise.all([
    isUserIngroup({ groupId, userId: session.user.id }),
    isUserIngroup({ groupId, userId: userIdToKick }),
    getUserRole({ groupId, userId: session.user.id }),
    getUserRole({ groupId, userId: userIdToKick }),
  ]);

  if (!currentUserIsInGroup) {
    return {
      error:
        "Vous n'avez pas l'autorisation d'effectuer cette action",
    };
  }

  if (!userToKickIsInGroup) {
    return {
      success: "L'utilisateur ne fait pas partie du groupe",
    };
  }

  if (!currentUserRole) {
    return {
      error: 'Une erreur est survenue',
    };
  }

  if (
    (userToKickRole === 'admin' && currentUserRole === 'admin') ||
    userToKickRole === 'moderator'
  ) {
    return {
      error: "Vous n'avez pas les droits d'effectuer cette action",
    };
  }

  try {
    await prisma.groupUser.delete({
      where: {
        userId_groupId: {
          groupId,
          userId: userIdToKick,
        },
      },
    });
  } catch {
    return {
      error: 'Une erreur est survenue veuillez réessayer plus tard',
    };
  }

  revalidateTag('members');
  revalidatePath(`/groupes/${groupId}/membres`);
  redirect(`/groupes/${groupId}/membres`);
};
